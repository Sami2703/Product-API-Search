function SearchBar({ search, setSearch }) {
  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={handleChange}
    />
  );
}

export default SearchBar;