import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'flowbite-react';
import { useParams } from 'react-router-dom';

const debates = [
  // This should be fetched from a backend or a database
  { id: 1, title: 'Debate 1', description: 'Description of Debate 1' },
  { id: 2, title: 'Debate 2', description: 'Description of Debate 2' },
];

const DebateSpace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedDebates, setDisplayedDebates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchDebates = (page) => {
    // Fetch debates from backend, here & simulate it with a timeout
    setLoading(true);
    setTimeout(() => {
      const newDebates = debates.slice((page - 1) * 10, page * 10);
      setDisplayedDebates((prev) => [...prev, ...newDebates]);
      setLoading(false);
      if (newDebates.length < 10) setHasMore(false);
    }, 1000);
  };

  useEffect(() => {
    fetchDebates(currentPage);
  }, [currentPage]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  const filteredDebates = displayedDebates.filter((debate) =>
    debate.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search debates..."
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => setIsModalOpen(true)}>Add Debate</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredDebates.map((debate) => (
          <Link to={`/room/${debate.id}`} key={debate.id} className="card">
            <div className="card-body">
              <h2 className="card-title">{debate.title}</h2>
              <p>{debate.description}</p>
            </div>
          </Link>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Add New Debate</Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-4">
              <label className="block text-rose-500 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Debate Title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-rose-500 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-rose-500 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Debate Description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-rose-500 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit" onClick={() => setIsModalOpen(false)}>
                Add
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DebateSpace;
