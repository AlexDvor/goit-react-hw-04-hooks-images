import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  handleChange = e => {
    const value = e.target.value;

    this.setState({
      name: value,
    });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    if (this.state.name !== '') {
      const queryValue = this.state.name;
      this.props.onSubmit(queryValue);
    }
  };

  render() {
    const { handleChange, handleSubmitForm } = this;
    return (
      <>
        <header className="Searchbar">
          <form onSubmit={handleSubmitForm} className="SearchForm">
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              value={this.state.name}
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
}
