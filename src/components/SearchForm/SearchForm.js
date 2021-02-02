import { useState } from 'react';
import styles from './SearchForm.module.css';
import { useLocation, useHistory } from 'react-router-dom';

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

    history.push({
      ...location,
      search: `search-movies=${searchString.trim()}`,
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
