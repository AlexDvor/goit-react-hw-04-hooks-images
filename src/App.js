import { useState, useEffect } from 'react';
// Components
import ImageGallery from './components/ImageGallery/ImageGallery';
import { Searchbar } from './components/Searchbar/Searchbar';
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

  // state = {
  //   queryName: '',
  //   images: [],
  //   page: 1,
  //   loading: false,
  //   selectImage: null,
  // };

  useEffect(() => {
    if (queryName === '') {
      return;
    }

    setLoading(true);

    Api.fetchImages(queryName, 1)
      .then(res => setImages(res.hits))
      .finally(() => setLoading(false));
  }, [queryName]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    setLoading(true);

    Api.fetchImages(queryName, page)
      .then(res => setImages(prevState => [...prevState, ...res.hits]))
      .then(() => scroll())
      .finally(() => setLoading(false));
  }, [page, queryName]);

  //  componentDidUpdate(prevProps, prevState) {
  //   const DEFAULT_PAGE = 1;
  //   const { queryName, page } = this.state;

  //   if (prevState.queryName !== queryName) {
  //     this.setState({ loading: true });

  //     Api.fetchImages(queryName, DEFAULT_PAGE)
  //       .then(res => this.setState({ images: res.hits }))
  //       .finally(() => this.setState({ loading: false }));
  //   }

  //   if (prevState.page !== page) {
  //     if (page !== DEFAULT_PAGE) {
  //       this.setState({ loading: true });

  //       Api.fetchImages(queryName, page)
  //         .then(res => this.setState(prevState => ({ images: [...prevState.images, ...res.hits] })))
  //         .then(() => scroll())
  //         .finally(() => this.setState({ loading: false }));
  //     }
  //   }

  //   if (prevState.queryName !== queryName) {
  //     this.resetPage();
  //   }
  // }

  function getQueryValue(name) {
    // this.setState({
    //   queryName: name,
    // });
    setQueryName(name);
  }

  const resetPage = () => {
    // this.setState({
    //   images: [],
    //   page: 1,
    // });

    setImages([]);
    setPage(1);
  };

  const clickMoreBtn = () => {
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));

    setPage(prevState => prevState + 1);
  };

  const closeModal = () => {
    // this.setState({
    //   selectImage: null,
    // });

    setImages(null);
  };

  const handleSelectImg = url => {
    // this.setState({
    //   selectImage: url,
    // });

    setSelectImage(url);
  };

  // const { loading, images, selectImage, queryName } = this.state;
  // const { clickMoreBtn, getQueryValue, handleSelectImg } = this;
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
