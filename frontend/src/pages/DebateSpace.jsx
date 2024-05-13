import React, { useState, useEffect } from 'react';

function DebatePage() {
  const [debates, setDebates] = useState([]);
  const [filter, setFilter] = useState('newest');

  useEffect(() => {
    // Fetch debates based on filter
    fetchDebates();
  }, [filter]);

  const fetchDebates = () => {
    // Placeholder for fetching debates based on filter
    // This should be replaced with actual API call
    setDebates([
    ]);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="debate-page">
      <DebateFilter onFilterChange={handleFilterChange} />
      <DebateFields debates={debates} />
    </div>
  );
}

export default DebatePage;
