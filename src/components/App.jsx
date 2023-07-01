import React from 'react';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { LoadMoreBtn } from 'components/Button/Button';
import { ToastContainer } from 'react-toastify';
import { Loader } from './Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';

export class App extends React.Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    showModal: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchQuery, currentPage } = this.state;
    const apiKey = '35072085-a0b1b3afc3e4ed85b172a35ba';

    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        status: 'resolved',
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
      }),
      () => {
        this.fetchImages();
      }
    );
  };

  // прокидуємо введені дані з форми:
  handleInputChange = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { showModal, status } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleInputChange} />
        {status === 'pending' && <Loader />}
        <div>
          {this.state.images.map(image => (
            <img key={image.id} src={image.webformatURL} alt={image.tags} />
          ))}
        </div>
        {this.state.images.length > 0 && (
          <LoadMoreBtn type="button" onClick={this.loadMore}></LoadMoreBtn>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src="" alt="" />
            <button type="button" onClick={this.toggleModal}>
              close modal
            </button>
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
