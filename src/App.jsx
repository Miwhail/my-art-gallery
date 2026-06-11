import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { fetchPaintings } from './api';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Pagination from './components/Pagination';
import FilterSidebar from './components/FilterSidebar';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    artist: '',
    location: '',
    yearFrom: '',
    yearTo: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allPaintings, setAllPaintings] = useState([]); 
  const [filteredPaintings, setFilteredPaintings] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadPaintings = async () => {
      setIsLoading(true);
      const paintings = await fetchPaintings();
      setAllPaintings(paintings);
      setFilteredPaintings(paintings);
      setIsLoading(false);
    };
    loadPaintings();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme === 'enabled') {
      setIsDarkTheme(true);
      document.body.classList.add('darkTheme');
    }
  }, []);


  useEffect(() => {
    if (allPaintings.length === 0) return;

    let filtered = [...allPaintings];
    

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
  
    if (filters.artist) {
      filtered = filtered.filter(p => p.artist === filters.artist);
    }
    
   
    if (filters.location) {
      filtered = filtered.filter(p => p.location === filters.location);
    }
    

    if (filters.yearFrom) {
      filtered = filtered.filter(p => p.year >= parseInt(filters.yearFrom));
    }
    if (filters.yearTo) {
      filtered = filtered.filter(p => p.year <= parseInt(filters.yearTo));
    }
    
    setFilteredPaintings(filtered);
    setCurrentPage(1); 
  }, [searchTerm, filters, allPaintings]);


  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    if (newTheme) {
      document.body.classList.add('darkTheme');
      localStorage.setItem('site-theme', 'enabled');
    } else {
      document.body.classList.remove('darkTheme');
      localStorage.setItem('site-theme', 'disabled');
    }
  };


  const uniqueArtists = [...new Set(allPaintings.map(p => p.artist))];
  const uniqueLocations = [...new Set(allPaintings.map(p => p.location))];


  const totalPages = Math.ceil(filteredPaintings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPaintings = filteredPaintings.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="App">
        <Header 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isDarkTheme={isDarkTheme}
          onThemeToggle={toggleTheme}
          onFilterClick={() => setIsFilterOpen(true)}
        />
        <main>
          <div className="container">
            <div className="no-results-msg">Загрузка картин...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Header 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isDarkTheme={isDarkTheme}
        onThemeToggle={toggleTheme}
        onFilterClick={() => setIsFilterOpen(true)}
      />
      
      <main>
        <div className="container">
          <Gallery paintings={paginatedPaintings} />
        </div>
        
        {}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
      
      <FilterSidebar 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        artists={uniqueArtists}
        locations={uniqueLocations}
        filters={filters}
        onFilterChange={setFilters}
        onApply={() => setIsFilterOpen(false)}
        onClear={() => {
          setFilters({ artist: '', location: '', yearFrom: '', yearTo: '' });
          setSearchTerm('');
        }}
      />
    </div>
  );
}

export default App;