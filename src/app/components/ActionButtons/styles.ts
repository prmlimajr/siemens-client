import styled from 'styled-components';
import Image from 'next/image';

export const ActionContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
`;

export const ActionButton = styled(Image)<{ $clickable: boolean }>`
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'not-allowed')};
  margin: 0 8px;
  width: 24px;
  height: 24px;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 20px;
  background-color: #ddd;
  margin: 0 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;
