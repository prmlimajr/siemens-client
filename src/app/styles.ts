import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: red;
`;

export const Viewer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
  background-color: blue;
`;

export const ActionContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActionButton = styled(Image)<{ $clickable: boolean }>`
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'not-allowed')};
  margin: 0 1rem;
`;

export const GalleryContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 20vh;
  width: 100%;
  background-color: yellow;
`;

export const GalleryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
`;
