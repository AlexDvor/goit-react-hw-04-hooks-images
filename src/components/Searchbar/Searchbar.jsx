import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [name, setName] = useState('');

  const handleChange = e => {
    const value = e.target.value;
    setName(value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    if (name !== '') {
      onSubmit(name);
    }
  };

  return (
    <>
      <header className="Searchbar">
        <form onSubmit={handleSubmitForm} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={name}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
}
