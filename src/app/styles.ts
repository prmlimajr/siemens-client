import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

export const Viewer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
  background-color: aliceblue;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const SelectedImage = styled(Image)<{ $rotate: number }>`
  transform: rotate(${({ $rotate }) => $rotate}deg);
  width: 100%;
  max-width: 430px;
  height: auto;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
