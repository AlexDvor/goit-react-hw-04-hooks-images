function ImageGalleryItem({ webImage, onSelect, largeUrl }) {
  return (
    <li className="ImageGalleryItem">
      <img
        onClick={() => onSelect(largeUrl)}
        src={webImage}
        alt=""
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

export default ImageGalleryItem;
