import Skeleton from 'react-loading-skeleton';

interface LoadingContentProps {
  width: number | '100%';
  height: number;
}

export function LoadingContent({ width, height }: LoadingContentProps) {
  return (
    <Skeleton
      width={width}
      height={height}
      baseColor="#f8f8f8"
      highlightColor="#d8d8d8"
    />
  );
}
