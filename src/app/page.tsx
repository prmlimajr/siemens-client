'use client';

import { useCallback, useEffect, useState } from 'react';
import { getPictures } from './services/getPictures';
import { Picture } from './types/picture';
import Image from 'next/image';

import {
  ActionContainer,
  Container,
  GalleryContainer,
  GalleryItem,
  ImageTitle,
  ActionButton,
  Viewer,
  Thumbnail,
  ImageTitleContainer,
} from './styles';

export default function Home() {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [images, setImages] = useState<Picture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Picture>({} as Picture);

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
        setPage(newPage); // Set the page internally here
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const handleSelectImage = useCallback(
    (action: 'previous' | 'next') => {
      const currentIndex = images.indexOf(selectedImage);
      const isAtStart = currentIndex === 0;
      const isAtEnd = currentIndex === images.length - 1;

      if (action === 'previous') {
        if (isAtStart && page > 1) {
          loadPictures(page - 1, true); // Only call loadPictures, no external setPage
        } else if (!isAtStart) {
          setSelectedImage(images[currentIndex - 1]);
        }
      }

      if (action === 'next') {
        if (isAtEnd && page < lastPage) {
          loadPictures(page + 1); // Only call loadPictures, no external setPage
        } else if (!isAtEnd) {
          setSelectedImage(images[currentIndex + 1]);
        }
      }
    },
    [images, selectedImage, page, lastPage, loadPictures],
  );

  useEffect(() => {
    loadPictures(page); // This ensures initial load but avoids external interference
  }, []); // Removed dependency on `page`

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Viewer>
        {selectedImage && (
          <Image
            src={selectedImage.pictureFile.imagePath}
            alt={selectedImage.title}
            width={430}
            height={393}
          />
        )}

        <ActionContainer>
          <ActionButton
            src="/images/previous.png"
            alt="Previous"
            $clickable={page > 1 || images.indexOf(selectedImage) > 0}
            width={20}
            height={20}
            onClick={() => handleSelectImage('previous')}
          />

          <ActionButton
            src="/images/next.png"
            alt="Next"
            $clickable={
              page < lastPage ||
              images.indexOf(selectedImage) < images.length - 1
            }
            width={20}
            height={20}
            onClick={() => handleSelectImage('next')}
          />
        </ActionContainer>
      </Viewer>

      <GalleryContainer>
        {images.map((image) => (
          <GalleryItem key={image.id}>
            <Thumbnail
              src={image.pictureFile.thumbnailPath}
              alt={image.title}
              width={145}
              height={133}
              onClick={() => setSelectedImage(image)}
              $selected={selectedImage?.id === image.id}
            />

            <ImageTitleContainer $selected={selectedImage?.id === image.id}>
              <ImageTitle $selected={selectedImage?.id === image.id}>
                {image.pictureFile.thumbnailName}
              </ImageTitle>
            </ImageTitleContainer>
          </GalleryItem>
        ))}
      </GalleryContainer>
    </Container>
  );
}
