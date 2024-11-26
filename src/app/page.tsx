'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import { getPictures } from './services/getPictures';
import { Picture } from './types/picture';
import { LoadingContent } from './components/LoadingContent';

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
        setPage(newPage);
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
          loadPictures(page - 1, true);
        } else if (!isAtStart) {
          setSelectedImage(images[currentIndex - 1]);
        }
      }

      if (action === 'next') {
        if (isAtEnd && page < lastPage) {
          loadPictures(page + 1);
        } else if (!isAtEnd) {
          setSelectedImage(images[currentIndex + 1]);
        }
      }
    },
    [images, selectedImage, page, lastPage, loadPictures],
  );

  useEffect(() => {
    loadPictures(page);
  }, []);

  return (
    <Container>
      <Viewer>
        {isLoading ? (
          <LoadingContent width={430} height={393} />
        ) : (
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
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <GalleryItem key={index}>
                <LoadingContent width={145} height={133} />

                <ImageTitleContainer $selected={false}>
                  <LoadingContent width="100%" height={20} />
                </ImageTitleContainer>
              </GalleryItem>
            ))
          : images.map((image) => (
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
