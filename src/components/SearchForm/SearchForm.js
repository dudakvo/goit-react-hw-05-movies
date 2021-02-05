import { useState } from 'react';
import styles from './SearchForm.module.css';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

//const queryString = require('query-string');

export default function SearchForm() {
  const [searchString, setSearchString] = useState('');
  const history = useHistory();
  const location = useLocation();

  const handleChange = e => {
    setSearchString(e.currentTarget.value);
  };

  const formSubmit = e => {
    e.preventDefault();
    if (!searchString.trim()) {
      return;
    }

    const searchQuery = queryString.stringify({
      [`search-movies`]: `${searchString.trim()}`,
      page: 1,
    });

    history.push({
      ...location,
      search: searchQuery,
    });
    setSearchString('');
  };

  return (
    <form className={styles.SearchForm} onSubmit={formSubmit}>
      <button type="submit" className={styles.SearchForm_button}>
        <span className={styles.SearchForm_button_label}>Search</span>
      </button>

      <input
        className={styles.SearchForm_input}
        type="text"
        autocomplete="off"
        autofocus
        placeholder="Search movie"
        onChange={handleChange}
        value={searchString}
      />
    </form>
  );
}
