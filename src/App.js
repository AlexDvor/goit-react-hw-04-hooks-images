import { useState, useEffect } from 'react';
// Components
import ImageGallery from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/Searchbar';
import LoadMoreButton from './components/Button/Button';
import Spinner from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
// utils
import Api from './utils/fetchImage';
import { scroll } from './utils/scroll';

export default function App() {
  const [queryName, setQueryName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectImage, setSelectImage] = useState(null);

  useEffect(() => {
    if (queryName === '') return;
    setLoading(true);
    Api.fetchImages(queryName, page)
      .then(res => setImages(prevState => [...prevState, ...res.hits]))
      .then(() => {
        if (page > 1) {
          scroll();
        }
      })
      .finally(() => setLoading(false));
  }, [page, queryName]);

  function getQueryValue(name) {
    setImages([]);
    setPage(1);
    setQueryName(name);
  }

  const clickMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };

  const closeModal = () => {
    setSelectImage(null);
  };

  const handleSelectImg = url => {
    setSelectImage(url);
  };

  return (
    <>
      <Searchbar onSubmit={getQueryValue}></Searchbar>

      {loading && <Spinner />}

      <ImageGallery images={images} selectImg={handleSelectImg} />

      {images.length > 0 && !loading && <LoadMoreButton onClick={clickMoreBtn} />}

      {selectImage && (
        <Modal onClose={closeModal}>
          <img src={selectImage} alt={queryName} />
        </Modal>
      )}
    </>
  );
}
