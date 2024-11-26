'use client';

import { useEffect, useCallback } from 'react';

import { LoadingContent } from './components/LoadingContent';
import { ActionButtons } from './components/ActionButtons';
import { Gallery } from './components/Gallery';
import { usePictures } from './hooks/usePictures';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

import { Container, Viewer, SelectedImage } from './styles';

export default function Home() {
  const {
    page,
    lastPage,
    images,
    isLoading,
    selectedImage,
    selectedDegree,
    setSelectedImage,
    setSelectedDegree,
    loadPictures,
  } = usePictures();

  const handleSelectImage = useCallback(
    (action: 'previous' | 'next') => {
      const currentIndex = images.indexOf(selectedImage);

      const targetIndex =
        action === 'previous' ? currentIndex - 1 : currentIndex + 1;

      if (action === 'previous' && currentIndex === 0 && page > 1) {
        return loadPictures(page - 1, true);
      }

      if (
        action === 'next' &&
        currentIndex === images.length - 1 &&
        page < lastPage
      ) {
        return loadPictures(page + 1);
      }

      if (targetIndex >= 0 && targetIndex < images.length) {
        setSelectedImage(images[targetIndex]);
      }
    },
    [images, selectedImage, page, lastPage, loadPictures, setSelectedImage],
  );

  const handleRotateImage = useCallback(
    (direction: 'left' | 'right') => {
      const newDegree =
        direction === 'left' ? selectedDegree - 90 : selectedDegree + 90;
      setSelectedDegree(newDegree);
    },
    [selectedDegree, setSelectedDegree],
  );

  useKeyboardNavigation(handleSelectImage);

  useEffect(() => {
    loadPictures(page);
  }, []);

  useEffect(() => {
    setSelectedDegree(0);
  }, [selectedImage, setSelectedDegree]);

  return (
    <Container>
      <Viewer>
        {isLoading ? (
          <LoadingContent width={430} height={393} />
        ) : (
          <SelectedImage
            unoptimized={true}
            src={selectedImage.pictureFile.imagePath}
            alt={`Image of ${selectedImage.title}`}
            width={430}
            height={393}
            $rotate={selectedDegree}
          />
        )}

        <ActionButtons
          onPrevious={() => handleSelectImage('previous')}
          onNext={() => handleSelectImage('next')}
          onRotateLeft={() => handleRotateImage('left')}
          onRotateRight={() => handleRotateImage('right')}
          canGoPrevious={images.indexOf(selectedImage) > 0 || page > 1}
          canGoNext={
            images.indexOf(selectedImage) < images.length - 1 || page < lastPage
          }
        />
      </Viewer>

      <Gallery
        images={images}
        selectedImageId={selectedImage.id}
        onSelectImage={setSelectedImage}
        isLoading={isLoading}
      />
    </Container>
  );
}
