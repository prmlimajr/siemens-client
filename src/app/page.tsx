'use client';

import { useCallback, useEffect, useState } from 'react';
import { getPictures } from './services/getPictures';
import { Picture } from './types/picture';
import Image from 'next/image';

import {
  ActionContainer,
  Container,
  GalleryContainer,
  StyledImage,
  Viewer,
} from './styles';

export default function Home() {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [images, setImages] = useState<Picture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Picture | null>(null);

  const loadPictures = useCallback(async () => {
    try {
      const { pictures, lastPage } = await getPictures(page, 4);

      setImages(pictures);
      setLastPage(lastPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadPictures();
  }, [page, loadPictures]);

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
          <StyledImage
            src="/images/previous.png"
            alt="Previous"
            $clickable={page > 1}
            width={20}
            height={20}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />

          <StyledImage
            src="/images/next.png"
            alt="Next"
            $clickable={page < lastPage}
            width={20}
            height={20}
            onClick={() => {
              if (page < lastPage) {
                setPage(page + 1);
              }
            }}
          />
        </ActionContainer>
      </Viewer>

      <GalleryContainer>
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.pictureFile.thumbnailPath}
            alt={image.title}
            width={145}
            height={133}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </GalleryContainer>
    </Container>
  );
}
