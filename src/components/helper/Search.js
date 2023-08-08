import React, { useState } from 'react'
import Searchbox from './Searchbox'
import Results from './Results'

const Search = (props) => {
    const [query, setQuery] = useState(null)

    return (
        <>
            {!query && <Searchbox setQuery={setQuery} />}
            {query && <Results setProgress={props.setProgress} setLink={props.setLink} query={query} API_URL={props.API_URL} />}
        </>
    )
}

export default Search
