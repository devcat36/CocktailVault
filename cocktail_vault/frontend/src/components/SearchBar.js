import React from 'react'
import './SearchBar.css'

function SearchBar({placeholder}){
    return (
        <input className="SearchBar" placeholder={placeholder} />
    )
}

export default SearchBar;