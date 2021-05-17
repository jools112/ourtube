import './VideoSearch.css'

import React from 'react'
import { TextField } from '../../../components/TextField'
import { SearchResults } from './SearchResults/SearchResults'

export const VideoSearch = (props) => {
  const [query, setQuery] = React.useState(null)
  let debounceTimer
  const debounceSearch = (text) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
      debounceTimer = null
      setQuery(text)
    }, 750)
  }

  return (
    <>
      <TextField
        label="Search for video"
        onInput={(e) => debounceSearch(e.target.value)}
      />
      <SearchResults query={query} />
    </>
  )
}
