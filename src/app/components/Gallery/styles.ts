import styled from 'styled-components';
import Image from 'next/image';

export const GalleryContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 20vh;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    height: auto;
  }
`;

export const GalleryItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 45%;
    margin-bottom: 16px;
  }
`;

export const Thumbnail = styled(Image)<{ $selected: boolean }>`
  cursor: pointer;
  border: ${({ $selected }) => ($selected ? '3px solid blue' : 'none')};
`;

export const ImageTitleContainer = styled.div<{ $selected: boolean }>`
  background-color: ${({ $selected }) => ($selected ? 'blue' : 'none')};
  padding: 0.1rem 0.5rem;
  margin-top: 0.2rem;
`;

export const ImageTitle = styled.span<{ $selected: boolean }>`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  color: ${({ $selected }) => ($selected ? 'white' : 'black')};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
