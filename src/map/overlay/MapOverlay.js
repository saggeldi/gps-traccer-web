import { useId, useEffect } from 'react';
import { useAttributePreference } from '../../common/util/preferences';
import { map } from '../core/MapView';
import useMapOverlays from './useMapOverlays';

const MapOverlay = () => {
  const id = useId();

  const mapOverlays = useMapOverlays();
  const selectedMapOverlay = useAttributePreference('selectedMapOverlay');

  const activeOverlay = mapOverlays.filter((overlay) => overlay.available).find((overlay) => overlay.id === selectedMapOverlay);

  useEffect(() => {
    const addOverlayToMap = () => {
      if (activeOverlay) {
        // Remove existing layer and source if they exist
        if (map.getLayer(id)) {
          map.removeLayer(id);
        }
        if (map.getSource(id)) {
          map.removeSource(id);
        }

        // Add overlay source and layer
        map.addSource(id, activeOverlay.source);
        map.addLayer({
          id,
          type: 'raster',
          source: id,
          layout: {
            visibility: 'visible',
          },
        });
      }
    };

    // Add overlay initially
    addOverlayToMap();

    // Re-add overlay when style changes (important for vector styles)
    const onStyleLoad = () => {
      setTimeout(() => {
        if (activeOverlay && !map.getSource(id)) {
          addOverlayToMap();
        }
      }, 100);
    };

    if (activeOverlay) {
      map.on('styledata', onStyleLoad);
    }

    return () => {
      map.off('styledata', onStyleLoad);
      if (map.getLayer(id)) {
        map.removeLayer(id);
      }
      if (map.getSource(id)) {
        map.removeSource(id);
      }
    };
  }, [id, activeOverlay]);

  return null;
};

export default MapOverlay;
