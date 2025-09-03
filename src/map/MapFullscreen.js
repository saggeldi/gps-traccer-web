import { useEffect, useMemo } from 'react';
import { useTheme } from '@mui/material';
import { map } from './core/MapView';
import './fullscreen.css';

class FullscreenControl {
  constructor(onToggle) {
    this.onToggle = onToggle;
    this.isFullscreen = false;
  }

  onAdd() {
    this.button = document.createElement('button');
    this.button.className = 'maplibregl-ctrl-icon maplibre-ctrl-fullscreen';
    this.button.type = 'button';
    this.button.title = 'Toggle fullscreen';
    this.button.onclick = () => {
      this.isFullscreen = !this.isFullscreen;
      this.updateIcon();
      this.onToggle(this.isFullscreen);
    };

    this.container = document.createElement('div');
    this.container.className = 'maplibregl-ctrl-group maplibregl-ctrl';
    this.container.appendChild(this.button);

    return this.container;
  }

  onRemove() {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  updateIcon() {
    this.button.className = this.isFullscreen 
      ? 'maplibregl-ctrl-icon maplibre-ctrl-fullscreen maplibre-ctrl-fullscreen-exit'
      : 'maplibregl-ctrl-icon maplibre-ctrl-fullscreen';
    this.button.title = this.isFullscreen ? 'Exit fullscreen' : 'Toggle fullscreen';
  }

  setFullscreen(fullscreen) {
    this.isFullscreen = fullscreen;
    this.updateIcon();
  }
}

const MapFullscreen = ({ onToggle, fullscreen }) => {
  const theme = useTheme();
  const control = useMemo(() => new FullscreenControl(onToggle), [onToggle]);

  useEffect(() => {
    map.addControl(control, theme.direction === 'rtl' ? 'top-left' : 'top-right');
    return () => map.removeControl(control);
  }, [control, theme.direction]);

  useEffect(() => {
    control.setFullscreen(fullscreen);
  }, [control, fullscreen]);

  return null;
};

export default MapFullscreen;