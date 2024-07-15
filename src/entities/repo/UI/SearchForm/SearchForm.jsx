import React from 'react'
import styles from './SearchForm.module.css'

const SearchForm = ({
  query,
  onInputChange,
  onSearch,
  showFavorites,
  onToggleFavorites,
}) => {
  return (
    <div>
      <form className={styles.form} onSubmit={onSearch}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={onInputChange}
          placeholder="Enter keyword"
        />
        <button className={styles.btn} type="submit">
          Search
        </button>
        <button className={styles.btn} onClick={onToggleFavorites}>
          {showFavorites ? 'Show Search Results' : 'Show Favorites'}
        </button>
      </form>
    </div>
  )
}

export default SearchForm
