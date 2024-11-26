import { LoadingContent } from '../LoadingContent';
import { Picture } from '@/app/types/picture';

import {
  GalleryContainer,
  GalleryItem,
  Thumbnail,
  ImageTitle,
  ImageTitleContainer,
} from './styles';

export const Gallery = ({
  images,
  selectedImageId,
  onSelectImage,
  isLoading,
}: {
  images: Picture[];
  selectedImageId: string | null;
  onSelectImage: (image: Picture) => void;
  isLoading: boolean;
}) => (
  <GalleryContainer role="list" aria-label="Image gallery">
    {isLoading
      ? Array.from({ length: 4 }).map((_, index) => (
          <GalleryItem key={index}>
            <LoadingContent width={145} height={133} />
          </GalleryItem>
        ))
      : images.map((image) => (
          <GalleryItem key={image.id} role="listitem">
            <Thumbnail
              src={image.pictureFile.thumbnailPath}
              alt={`Thumbnail of ${image.title}`}
              width={145}
              height={133}
              onClick={() => onSelectImage(image)}
              $selected={selectedImageId === image.id}
              aria-label={`Select image: ${image.title}`}
            />
            <ImageTitleContainer $selected={selectedImageId === image.id}>
              <ImageTitle $selected={selectedImageId === image.id}>
                {image.pictureFile.thumbnailName}
              </ImageTitle>
            </ImageTitleContainer>
          </GalleryItem>
        ))}
  </GalleryContainer>
);
