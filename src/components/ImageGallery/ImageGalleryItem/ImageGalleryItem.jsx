function ImageGalleryItem({ webImage, onSelect, largeUrl }) {
  return (
    <li className="ImageGalleryItem" onClick={() => onSelect(largeUrl)}>
      <img src={webImage} alt="" className="ImageGalleryItem-image" />
    </li>
  );
}

export default ImageGalleryItem;
