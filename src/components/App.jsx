import React from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { Loader } from './Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';

export class App extends React.Component {
  state = {
    images: [],
    showModal: false,
    loading: false,
  };

  async fetchGallery() {
    const axiosOptions = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '35072085-a0b1b3afc3e4ed85b172a35ba',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: `${this.PER_PAGE}`,
      },
    };
    try {
      const response = await axios(axiosOptions);

      this.incrementPage();
      return response.data;
    } catch {
      console.log('Помилка!');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      // refs.loadMoreEl.classList.add('is-hidden');
    }
  }
  handleFormSubmit = imageName => {
    console.log(imageName);
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.loading && <Loader />}
        {this.state.images.lenght && this.state.images}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src="" alt="" />
            <button type="buton" onClick={this.toggleModal}>
              close modal
            </button>
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
