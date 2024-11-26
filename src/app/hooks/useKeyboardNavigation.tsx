/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { useEffect } from 'react';
import { KeyboardMap } from '../constants/keyboard_map';

export function useKeyboardNavigation(handleSelectImage: Function) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KeyboardMap.RIGHT) {
        handleSelectImage('next');
      } else if (event.key === KeyboardMap.LEFT) {
        handleSelectImage('previous');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectImage]);
}
