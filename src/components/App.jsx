import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import { LoadMoreBtn } from 'components/Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from './Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { animateScroll as scroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';

export class App extends React.Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    showModal: false,
    status: 'idle',
    shouldHideLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ images: [] });
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchQuery, currentPage } = this.state;
    const apiKey = '35072085-a0b1b3afc3e4ed85b172a35ba';
    this.setState({ status: 'pending' });
    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      this.setState(
        prevState => ({
          images: [...prevState.images, ...data.hits],
          status: 'resolved',
        }),
        () => {
          const { totalHits, images } = this.state;
          const shouldHideLoadMore =
            totalHits === images.length || images.length < 12;

          this.setState({
            shouldHideLoadMore: shouldHideLoadMore,
          });
        }
      );

      if (data.hits.length === 0) {
        return toast.info(
          'Sorry images not found...',
          this.setState({ status: 'rejected' })
        );
      }
    } catch (error) {
      toast.error('Error fetching images:', error);
    }
  };
  loadMore = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
      }),
      () => {
        this.fetchImages();
        this.scrollToBottom();
      }
    );
  };

  handleInputChange = searchQuery => {
    this.setState({ searchQuery });
  };

  scrollToBottom() {
    scroll.scrollToBottom();
  }

  render() {
    const { status, shouldHideLoadMore } = this.state;
    return (
      <div className="container">
        <Searchbar onSubmit={this.handleInputChange} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <>
            <ImageGallery images={this.state.images} />
            {!shouldHideLoadMore && <LoadMoreBtn onClick={this.loadMore} />}
          </>
        )}
        {status === 'rejected' && <ToastContainer autoClose={3000} />}
      </div>
    );
  }
}
