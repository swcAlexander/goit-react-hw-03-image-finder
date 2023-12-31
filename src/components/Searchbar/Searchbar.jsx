import React from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import styles from 'components/Searchbar/Searchbar.module.css';

export default class Searchbar extends React.Component {
  state = {
    imageName: '',
  };
  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };
  hundleSumbit = event => {
    event.preventDefault();
    if (this.state.imageName.trim() === '') {
      toast.error('Please, input image name');
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };
  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.hundleSumbit}>
          <button type="submit" className={styles.button}>
            <ImSearch />
          </button>

          <input
            onChange={this.handleNameChange}
            value={this.state.imageName}
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.prpoTpes = {
  onSubmit: PropTypes.func.isRequired,
};
