import React from 'react'
import styles from './SearchForm.module.css'
import Button from '../../../../shared/UI/Button'

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
          className={styles.form_input}
          type="text"
          value={query}
          onChange={onInputChange}
          placeholder="Enter keyword"
        />
        <Button className={styles.form_btn} type="submit">
          Search
        </Button>
        <Button className={styles.form_btn} onClick={onToggleFavorites}>
          {showFavorites ? 'Show Search Results' : 'Show Favorites'}
        </Button>
      </form>
    </div>
  )
}

export default SearchForm
