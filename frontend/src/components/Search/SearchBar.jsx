import React from "react";
import { HiSearch } from "react-icons/hi";
function SearchBar({ value, onChange, placeholder = "Search menu..." }) {
  return (<div className="search-bar"><HiSearch className="search-bar-icon" /><input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} /></div>);
}
export default SearchBar;
