import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../common/components/LocalizationProvider';
import styleLight from './light.json';

const styleCustom = ({ tiles, minZoom, maxZoom, attribution, sourceType = 'raster' }) => {
  const source = {
    type: sourceType,
    tiles,
    attribution,
    tileSize: sourceType === 'vector' ? 512 : 256,
    minzoom: minZoom,
    maxzoom: maxZoom,
  };
  Object.keys(source).forEach((key) => source[key] === undefined && delete source[key]);
  
  if (sourceType === 'vector') {
    return styleLight;
  }
  
  return {
    version: 8,
    sources: {
      custom: source,
    },
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    layers: [{
      id: 'custom',
      type: 'raster',
      source: 'custom',
    }],
  };
};

const isVectorTileUrl = (url) => {
  if (!url) return false;
  
  // Check for vector tile file extensions
  const vectorTileFormats = ['turkmenistan/{z}/{x}/{y}','.pbf', '.mvt'];
  
  // Check for direct tile URL patterns (contains {z}/{x}/{y} and vector format)
  const hasTilePattern = url.includes('{z}') && url.includes('{x}') && url.includes('{y}');
  const hasVectorFormat = vectorTileFormats.some(format => url.includes(format));
  
  // If it's a tile URL with vector format, it's vector tiles
  if (hasTilePattern && hasVectorFormat) {
    return true;
  }
  
  // If it contains style.json or vector.json, it's likely a style JSON (not tiles)
  if (url.includes('style.json') || url.includes('vector.json')) {
    return false;
  }
  
  // Check for known vector tile endpoint patterns (but not style URLs)
  const vectorTileIndicators = [
    '/vector/',
    'vector-tiles',
    '/tiles/',
    '/mvt/'
  ];
  
  return hasTilePattern && vectorTileIndicators.some(indicator => url.includes(indicator));
};

export default () => {
  const t = useTranslation();

  const customMapUrl = useSelector((state) => state.session.user?.attributes?.mapUrl || state.session.server.mapUrl) || import.meta.env.VITE_CUSTOM_MAP_URL;

  return useMemo(() => [
    {
      id: 'custom',
      title: t('mapCustom'),
      style: (() => {
        if (!customMapUrl) return null;
        
        // If URL doesn't contain tile placeholders, treat as style JSON URL
        if (!customMapUrl.includes('{z}') && !customMapUrl.includes('{quadkey}')) {
          return customMapUrl;
        }
        
        // Detect if it's a vector tile URL
        const isVector = isVectorTileUrl(customMapUrl);
        
        return styleCustom({
          tiles: [customMapUrl],
          sourceType: isVector ? 'vector' : 'raster'
        });
      })(),
      available: Boolean(customMapUrl),
    },
  ], [t, customMapUrl]);
};
