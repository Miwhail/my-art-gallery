import React from 'react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import FilterButton from './FilterButton';

function Header({ searchTerm, onSearchChange, isDarkTheme, onThemeToggle, onFilterClick }) {
  return (
    <header>
      <div className="container">
        <div className="top-bar">
          <div className="left-placeholder"></div>
          <div className="right-group">
            <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
            <div className="theme-burger-stack">
              <ThemeToggle isDarkTheme={isDarkTheme} onToggle={onThemeToggle} />
              <FilterButton onClick={onFilterClick} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;