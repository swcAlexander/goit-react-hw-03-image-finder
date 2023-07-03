import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import fetchGallery from '../Api/ApiServise';
import { LoadMoreBtn } from 'components/Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from './Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';

export class App extends React.Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    error: false,
    total: 0,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchQuery, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });
      const data = await fetchGallery({ searchQuery, currentPage });
      if (data.hits.length === 0) {
        return toast.info('Sorry images not found...');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        total: data.totalHits,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error });
    }
  };
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleInputChange = searchQuery => {
    this.setState({ searchQuery, currentPage: 1, images: [] });
  };

  render() {
    const { isLoading, error, total, images } = this.state;
    const totalPages = total / images.length;
    return (
      <div className="container">
        <Searchbar onSubmit={this.handleInputChange} />
        {isLoading && <Loader />}
        {error && toast.error('Something went wrong...')}
        {images.length > 0 && <ImageGallery images={this.state.images} />}
        {totalPages > 1 && !isLoading && images.length >= 12 && (
          <LoadMoreBtn onClick={this.loadMore} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
