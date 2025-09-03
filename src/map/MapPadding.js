import { useEffect } from 'react';

import { map } from './core/MapView';
import { useTheme } from '@mui/material';

const MapPadding = ({ start, end, top }) => {
  const theme = useTheme();

  useEffect(() => {
    const padding = {};
    
    if (start) {
      const startKey = theme.direction === 'rtl' ? 'right' : 'left';
      const topStart = document.querySelector(`.maplibregl-ctrl-top-${startKey}`);
      const bottomStart = document.querySelector(`.maplibregl-ctrl-bottom-${startKey}`);
      if (topStart) topStart.style.insetInlineStart = `${start}px`;
      if (bottomStart) bottomStart.style.insetInlineStart = `${start}px`;
      padding[theme.direction === 'rtl' ? 'right' : 'left'] = start;
    }
    
    if (end) {
      const endKey = theme.direction === 'rtl' ? 'left' : 'right';
      const topEnd = document.querySelector(`.maplibregl-ctrl-top-${endKey}`);
      const bottomEnd = document.querySelector(`.maplibregl-ctrl-bottom-${endKey}`);
      if (topEnd) topEnd.style.insetInlineEnd = `${end}px`;
      if (bottomEnd) bottomEnd.style.insetInlineEnd = `${end}px`;
      padding[theme.direction === 'rtl' ? 'left' : 'right'] = end;
    }
    
    if (top) {
      const topLeft = document.querySelector('.maplibregl-ctrl-top-left');
      const topRight = document.querySelector('.maplibregl-ctrl-top-right');
      if (topLeft) topLeft.style.top = `${top}px`;
      if (topRight) topRight.style.top = `${top}px`;
      padding.top = top;
    }
    
    map.setPadding(padding);
    
    return () => {
      if (start) {
        const startKey = theme.direction === 'rtl' ? 'right' : 'left';
        const topStart = document.querySelector(`.maplibregl-ctrl-top-${startKey}`);
        const bottomStart = document.querySelector(`.maplibregl-ctrl-bottom-${startKey}`);
        if (topStart) topStart.style.insetInlineStart = 0;
        if (bottomStart) bottomStart.style.insetInlineStart = 0;
      }
      if (end) {
        const endKey = theme.direction === 'rtl' ? 'left' : 'right';
        const topEnd = document.querySelector(`.maplibregl-ctrl-top-${endKey}`);
        const bottomEnd = document.querySelector(`.maplibregl-ctrl-bottom-${endKey}`);
        if (topEnd) topEnd.style.insetInlineEnd = 0;
        if (bottomEnd) bottomEnd.style.insetInlineEnd = 0;
      }
      if (top) {
        const topLeft = document.querySelector('.maplibregl-ctrl-top-left');
        const topRight = document.querySelector('.maplibregl-ctrl-top-right');
        if (topLeft) topLeft.style.top = '0px';
        if (topRight) topRight.style.top = '0px';
      }
      map.setPadding({ top: 0, right: 0, bottom: 0, left: 0 });
    };
  }, [start, end, top]);

  return null;
};

export default MapPadding;
