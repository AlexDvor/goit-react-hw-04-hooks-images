import { Component } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Api from './utils/fetchImage';
// Components
import { Searchbar } from './components/Searchbar/Searchbar';
import LoadMoreButton from './components/Button/Button';
// utils
import Spinner from './components/Loader/Loader';
import { scroll } from './utils/scroll';
import Modal from './components/Modal/Modal';

class App extends Component {
  state = {
    queryName: '',
    images: [],
    page: 1,
    loading: false,
    selectImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const DEFAULT_PAGE = 1;
    const { queryName, page } = this.state;

    if (prevState.queryName !== queryName) {
      this.setState({ loading: true });

      Api.fetchImages(queryName, DEFAULT_PAGE)
        .then(res => this.setState({ images: res.hits }))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.page !== page) {
      if (page !== DEFAULT_PAGE) {
        this.setState({ loading: true });

        Api.fetchImages(queryName, page)
          .then(res => this.setState(prevState => ({ images: [...prevState.images, ...res.hits] })))
          .then(() => scroll())
          .finally(() => this.setState({ loading: false }));
      }
    }

    if (prevState.queryName !== queryName) {
      this.resetPage();
    }
  }

  getQueryValue = name => {
    this.setState({
      queryName: name,
    });
  };

  resetPage() {
    this.setState({
      images: [],
      page: 1,
    });
  }

  clickMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState({
      selectImage: null,
    });
  };

  handleSelectImg = url => {
    this.setState({
      selectImage: url,
    });
  };

  render() {
    const { loading, images, selectImage, queryName } = this.state;
    const { clickMoreBtn, getQueryValue, handleSelectImg } = this;
    return (
      <>
        <Searchbar onSubmit={getQueryValue}></Searchbar>

        {loading && <Spinner />}

        <ImageGallery images={images} selectImg={handleSelectImg} />

        {images.length > 0 && !loading && <LoadMoreButton onClick={clickMoreBtn} />}

        {selectImage && (
          <Modal onClose={this.closeModal}>
            <img src={selectImage} alt={queryName} />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
