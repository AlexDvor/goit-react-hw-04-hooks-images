import { Button } from './Button.styled';

function LoadMoreButton({ onClick }) {
  return (
    <>
      <Button onClick={onClick}>Load More</Button>
    </>
  );
}

export default LoadMoreButton;
