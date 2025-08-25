import { useId, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { map } from './core/MapView';
import { useAttributePreference } from '../common/util/preferences';
import { findFonts } from './core/mapUtil';

const MapMarkers = ({ markers, showTitles }) => {
  const id = useId();

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const iconScale = useAttributePreference('iconScale', desktop ? 0.75 : 1);

  useEffect(() => {
    const addMarkersToMap = () => {
      // Remove existing layer and source if they exist
      if (map.getLayer(id)) {
        map.removeLayer(id);
      }
      if (map.getSource(id)) {
        map.removeSource(id);
      }

      // Add the source
      map.addSource(id, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      // Add the layer
      if (showTitles) {
        map.addLayer({
          id,
          type: 'symbol',
          source: id,
          filter: ['!has', 'point_count'],
          layout: {
            'icon-image': '{image}',
            'icon-size': iconScale,
            'icon-allow-overlap': true,
            'text-field': '{title}',
            'text-allow-overlap': true,
            'text-anchor': 'bottom',
            'text-offset': [0, -2 * iconScale],
            'text-font': findFonts(map),
            'text-size': 12,
          },
          paint: {
            'text-halo-color': 'white',
            'text-halo-width': 1,
          },
        });
      } else {
        map.addLayer({
          id,
          type: 'symbol',
          source: id,
          layout: {
            'icon-image': '{image}',
            'icon-size': iconScale,
            'icon-allow-overlap': true,
          },
        });
      }
    };

    // Add markers initially
    addMarkersToMap();

    // Re-add markers when style changes (important for vector styles)
    const onStyleLoad = () => {
      setTimeout(() => {
        if (!map.getSource(id)) {
          addMarkersToMap();
        }
      }, 100);
    };

    map.on('styledata', onStyleLoad);

    return () => {
      map.off('styledata', onStyleLoad);
      if (map.getLayer(id)) {
        map.removeLayer(id);
      }
      if (map.getSource(id)) {
        map.removeSource(id);
      }
    };
  }, [showTitles, iconScale]);

  useEffect(() => {
    map.getSource(id)?.setData({
      type: 'FeatureCollection',
      features: markers.map(({ latitude, longitude, image, title }) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        properties: {
          image: image || 'default-neutral',
          title: title || '',
        },
      })),
    });
  }, [showTitles, markers]);

  return null;
};

export default MapMarkers;
