import React from 'react';
import Modal from './Modal/Modal';

export class App extends React.Component {
  state = {
    showModal: false,
  };
  // searchQuery = '';
  // page = 1;
  // PER_PAGE = 40;

  // const fetchGallery = () => {
  //   const axiosOptions = {
  //     method: 'get',
  //     url: 'https://pixabay.com/api/',
  //     params: {
  //       key: '35072085-a0b1b3afc3e4ed85b172a35ba',
  //       q: `${this.searchQuery}`,
  //       image_type: 'photo',
  //       orientation: 'horizontal',
  //       safesearch: true,
  //       page: `${this.page}`,
  //       per_page: `${this.PER_PAGE}`,
  //     },
  //   };
  //   try {
  //     const response = axios(axiosOptions);

  //     this.incrementPage();
  //     return response.data;
  //   } catch {
  //     console.log('Помилка!');
  //   }
  // };

  // incrementPage = () => {
  //   this.page += 1;
  // };

  // resetPage = () => {
  //   this.page = 1;
  // };

  // resetEndOfHits = () => {
  //   this.endOfHits = false;
  // };
  // hasMoreImages = () => {
  //   return this.page === Math.ceil(this.totalPages / this.per_page);
  // };

  // getquery = () => {
  //   return this.searchQuery;
  // };

  // setquery = newQuery => {
  //   this.searchQuery = newQuery;
  // };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <button type="buton" onClick={this.toggleModal}>
          open modal
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src="" alt="" />
            <button type="buton" onClick={this.toggleModal}>
              close modal
            </button>
          </Modal>
        )}
      </div>
    );
  }
}
