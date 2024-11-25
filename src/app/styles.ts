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
  height: 85vh;
  width: 100%;
  background-color: blue;
`;

export const ActionContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImage = styled(Image)<{ $clickable: boolean }>`
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'not-allowed')};
  margin: 0 1rem;
`;

export const GalleryContainer = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  height: 15vh;
  width: 100%;
  background-color: yellow;
`;
