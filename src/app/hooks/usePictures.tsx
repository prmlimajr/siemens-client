import { useState, useCallback } from 'react';

import { Picture } from '../types/picture';
import { getPictures } from '../services/getPictures';

export function usePictures(initialPage: number = 1) {
  const [page, setPage] = useState(initialPage);
  const [lastPage, setLastPage] = useState(1);
  const [images, setImages] = useState<Picture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Picture>({} as Picture);
  const [selectedDegree, setSelectedDegree] = useState(0);

  const loadPictures = useCallback(
    async (newPage: number, selectLastImage: boolean = false) => {
      try {
        setIsLoading(true);
        const { pictures, lastPage } = await getPictures(newPage, 4);
        setImages(pictures);
        setSelectedImage(
          selectLastImage ? pictures[pictures.length - 1] : pictures[0],
        );
        setLastPage(lastPage);
        setPage(newPage);
      } catch (error) {
        console.error(`Failed to load pictures: ${error}`);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    page,
    lastPage,
    images,
    isLoading,
    selectedImage,
    selectedDegree,
    setSelectedImage,
    setSelectedDegree,
    loadPictures,
  };
}
