import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import styles from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export default class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };
  render() {
    const { showModal } = this.state;
    const { largeImageURL, imgUrl, alt } = this.props;
    return (
      <>
        <li className={styles.gallery_item} onClick={this.toggleModal}>
          <img src={imgUrl} alt={alt} className={styles.gallery_images} />
        </li>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={largeImageURL}
              alt={alt}
              className={styles.modal_gallery_images}
            />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
