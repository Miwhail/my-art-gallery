import React, { useState } from 'react';

function FilterSidebar({ 
  isOpen, 
  onClose, 
  artists, 
  locations,
  filters,
  onFilterChange,
  onApply,
  onClear 
}) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [openGroups, setOpenGroups] = useState({
    artist: true,
    location: true,
    years: true
  });

  const toggleGroup = (group) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const handleChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    onApply();
  };

  const handleClear = () => {
    const emptyFilters = { artist: '', location: '', yearFrom: '', yearTo: '' };
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
    onClear();
  };


  const ToggleIcon = ({ isOpen }) => (
    <svg viewBox="0 0 24 24" width="20" height="20">
      {!isOpen ? (

        <>
          <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" fill="none"/>
          <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" fill="none"/>
        </>
      ) : (
  
        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" fill="none"/>
      )}
    </svg>
  );

  return (
    <div className={`filter-overlay ${isOpen ? 'active' : ''}`}>
      <div className="filter-header">
        <button className="close-btn" onClick={onClose} aria-label="Close filters">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M0.386207 14.8252C0.165517 15.049 0.165517 15.3846 0.386207 15.6084C0.606897 15.8322 0.937931 15.8322 1.15862 15.6084L7.88966 8.8951L14.731 15.8322C14.9517 16.0559 15.2828 16.0559 15.5034 15.8322C15.7241 15.6084 15.7241 15.2727 15.5034 15.049L8.66207 8.11189L15.8345 0.951049C16.0552 0.727273 16.0552 0.391608 15.8345 0.167832C15.6138 -0.0559441 15.2828 -0.0559441 15.0621 0.167832L7.88966 7.32867L0.937931 0.27972C0.717241 0.0559441 0.386207 0.0559441 0.165517 0.27972C-0.0551724 0.503497 -0.0551724 0.839161 0.165517 1.06294L7.22759 8.11189L0.386207 14.8252Z"/>
          </svg>
        </button>
      </div>
      
      <div className="filter-content">
        {/* Artist Filter */}
        <div className={`filter-group ${openGroups.artist ? 'active' : ''}`}>
          <div className="filter-group-header" onClick={() => toggleGroup('artist')}>
            <span>artist</span>
            <span className="toggle-icon">
              <ToggleIcon isOpen={openGroups.artist} />
            </span>
          </div>
          <div className="filter-group-body">
            <div className="select-container">
              <select 
                value={localFilters.artist}
                onChange={(e) => handleChange('artist', e.target.value)}
              >
                <option value="">All artists</option>
                {artists.map(artist => (
                  <option key={artist} value={artist}>{artist}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div className={`filter-group ${openGroups.location ? 'active' : ''}`}>
          <div className="filter-group-header" onClick={() => toggleGroup('location')}>
            <span>location</span>
            <span className="toggle-icon">
              <ToggleIcon isOpen={openGroups.location} />
            </span>
          </div>
          <div className="filter-group-body">
            <div className="select-container">
              <select 
                value={localFilters.location}
                onChange={(e) => handleChange('location', e.target.value)}
              >
                <option value="">All locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Years Filter */}
        <div className={`filter-group ${openGroups.years ? 'active' : ''}`}>
          <div className="filter-group-header" onClick={() => toggleGroup('years')}>
            <span>years</span>
            <span className="toggle-icon">
              <ToggleIcon isOpen={openGroups.years} />
            </span>
          </div>
          <div className="filter-group-body">
            <div className="inputs-years">
              <input 
                type="number" 
                placeholder="From"
                value={localFilters.yearFrom}
                onChange={(e) => handleChange('yearFrom', e.target.value)}
              />
              <span className="dash">
                <svg width="16" height="2" viewBox="0 0 16 2">
                  <path d="M8.7 1.4H15.4C15.6 1.4 15.7 1.3 15.9 1.2C15.9 1 16 0.9 16 0.7C16 0.5 15.9 0.4 15.8 0.2C15.7 0.0999998 15.5 0 15.3 0H8.7H7.3H0.7C0.5 0 0.4 0.0999998 0.2 0.2C0.1 0.4 0 0.5 0 0.7C0 0.9 0.1 1 0.2 1.2C0.3 1.3 0.5 1.4 0.7 1.4H7.4H8.7Z"/>
                </svg>
              </span>
              <input 
                type="number" 
                placeholder="To"
                value={localFilters.yearTo}
                onChange={(e) => handleChange('yearTo', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="filter-footer">
        <span className="result-span" onClick={handleApply}>show the results</span>
        <span className="clear-span" onClick={handleClear}>clear</span>
      </div>
    </div>
  );
}

export default FilterSidebar;