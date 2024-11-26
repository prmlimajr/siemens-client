import { ActionContainer, ActionButton, Divider } from './styles';

export const ActionButtons = ({
  onPrevious,
  onNext,
  onRotateLeft,
  onRotateRight,
  canGoPrevious,
  canGoNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}) => (
  <ActionContainer>
    <ActionButton
      src="/images/previous.png"
      alt="Previous button"
      $clickable={canGoPrevious}
      width={20}
      height={20}
      onClick={onPrevious}
      aria-label="Previous image"
    />

    <ActionButton
      src="/images/next.png"
      alt="Next button"
      $clickable={canGoNext}
      width={20}
      height={20}
      onClick={onNext}
      aria-label="Next image"
    />

    <Divider />

    <ActionButton
      src="/images/rotate_left.png"
      alt="Rotate left button"
      width={20}
      height={20}
      onClick={onRotateLeft}
      aria-label="Rotate image left"
      $clickable
    />

    <ActionButton
      src="/images/rotate_right.png"
      alt="Rotate right button"
      width={20}
      height={20}
      onClick={onRotateRight}
      aria-label="Rotate image right"
      $clickable
    />
  </ActionContainer>
);
