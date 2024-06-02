import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const DebateSpace = () => {
  const [debates, setDebates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newDebate, setNewDebate] = useState({
    title: '',
    creatorUsername: '',
    opponentUsername: '',
    startTime: '',
    endTime: '',
    questions: ['', '', '']
  });

  const history = useHistory();

  useEffect(() => {
    fetchDebates();
  }, [currentPage]);

  const fetchDebates = () => {
    axios.get(`/api/v1/debates?page=${currentPage}&limit=10`)
      .then(response => {
        setDebates(prevDebates => [...prevDebates, ...response.data]);
        if (response.data.length === 0) {
          setHasMore(false);
        }
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDebate(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleQuestionsChange = (index, value) => {
    const questions = [...newDebate.questions];
    questions[index] = value;
    setNewDebate(prevState => ({
      ...prevState,
      questions
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/v1/debates', newDebate)
      .then(response => {
        setDebates(prevDebates => [response.data, ...prevDebates]);
        setShowForm(false);
        setNewDebate({
          title: '',
          creatorUsername: '',
          opponentUsername: '',
          startTime: '',
          endTime: '',
          questions: ['', '', '']
        });
      })
      .catch(error => console.error(error));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setDebates([]);
    setHasMore(true);
    fetchDebates();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Debate Space</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search debates"
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 w-1/2"
        />
        <button
          className="bg-rose-500 text-white p-4 rounded-full flex items-center justify-center"
          onClick={() => setShowForm(true)}
        >
          <span className="text-white text-2xl">+</span>
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">Title:</label>
              <input type="text" name="title" value={newDebate.title} onChange={handleInputChange} required className="border p-2 mb-4 w-full" />
              <label className="block mb-2">Creator Username:</label>
              <input type="text" name="creatorUsername" value={newDebate.creatorUsername} onChange={handleInputChange} required className="border p-2 mb-4 w-full" />
              <label className="block mb-2">Opponent Username:</label>
              <input type="text" name="opponentUsername" value={newDebate.opponentUsername} onChange={handleInputChange} required className="border p-2 mb-4 w-full" />
              <label className="block mb-2">Start Time:</label>
              <input type="text" name="startTime" value={newDebate.startTime} onChange={handleInputChange} required className="border p-2 mb-4 w-full" />
              <label className="block mb-2">End Time:</label>
              <input type="text" name="endTime" value={newDebate.endTime} onChange={handleInputChange} required className="border p-2 mb-4 w-full" />
              <label className="block mb-2">Questions:</label>
              {newDebate.questions.map((question, index) => (
                <input
                  key={index}
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionsChange(index, e.target.value)}
                  required
                  className="border p-2 mb-4 w-full"
                />
              ))}
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
            </form>
          </div>
        </div>
      )}
      <InfiniteScroll
        dataLength={debates.length}
        next={() => setCurrentPage(prevPage => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p className="text-center">No more debates to show</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {debates.filter(debate =>
            debate.title.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(debate => (
            <div key={debate._id} className="border p-4 m-2 cursor-pointer" onClick={() => history.push(`/room/${debate._id}`)}>
              <h3 className="text-xl font-bold">{debate.title}</h3>
              <p>By {debate.creatorUsername}</p>
              <p>Against {debate.opponentUsername}</p>
              <p>Starts at {debate.startTime}</p>
              <p>Ends at {debate.endTime}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default DebateSpace;
