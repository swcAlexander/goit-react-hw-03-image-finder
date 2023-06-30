import React from 'react';
import styles from 'components/Searchbar/Searchbar.module.css';

export const Searchbar = onSumbit => {
  return (
    <header className={styles.searchbar}>
      <form className="form">
        <button type="submit" class="button">
          <span className="button-label">Search</span>
        </button>

        <input
          clasName="input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
