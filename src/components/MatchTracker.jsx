import React, { useState } from 'react';
import './MatchTracker.css';

const initialDecks = ['Red Aggro', 'Blue Control', 'Green Ramp', 'White Weenie', 'Black Midrange'];

function MatchTracker({ user }) {
  const [matches, setMatches] = useState([]);
  const [decks, setDecks] = useState(initialDecks);
  const [newDeck, setNewDeck] = useState('');
  const [currentMatch, setCurrentMatch] = useState({
    playerDeck: '',
    opponentDeck: '',
    opponentName: '',
    games: [
      { result: '' },
      { result: '' },
      { result: '' }
    ]
  });

  const handleDeckChange = (e, field) => {
    setCurrentMatch(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleGameResult = (gameIndex, result) => {
    setCurrentMatch(prev => ({
      ...prev,
      games: prev.games.map((game, index) =>
        index === gameIndex ? { result } : game
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMatches(prev => [...prev, currentMatch]);
    setCurrentMatch({
      playerDeck: '',
      opponentDeck: '',
      opponentName: '',
      games: [
        { result: '' },
        { result: '' },
        { result: '' }
      ]
    });
  };

  const handleAddDeck = (e) => {
    e.preventDefault();
    if (newDeck && !decks.includes(newDeck)) {
      setDecks(prev => [...prev, newDeck]);
      setNewDeck('');
    }
  };

  return (
    <div>
      <h2>Add Custom Deck</h2>
      <form onSubmit={handleAddDeck}>
        <input
          type="text"
          value={newDeck}
          onChange={(e) => setNewDeck(e.target.value)}
          placeholder="Enter new deck name"
        />
        <button type="submit">Add Deck</button>
      </form>

      <h2>Record Match</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={currentMatch.playerDeck}
          onChange={(e) => handleDeckChange(e, 'playerDeck')}
          required
        >
          <option value="">Select Your Deck</option>
          {decks.map(deck => (
            <option key={deck} value={deck}>{deck}</option>
          ))}
        </select>
        <select
          value={currentMatch.opponentDeck}
          onChange={(e) => handleDeckChange(e, 'opponentDeck')}
          required
        >
          <option value="">Select Opponent's Deck</option>
          {decks.map(deck => (
            <option key={deck} value={deck}>{deck}</option>
          ))}
        </select>
        <input
          type="text"
          value={currentMatch.opponentName}
          onChange={(e) => handleDeckChange(e, 'opponentName')}
          placeholder="Opponent's Name"
          required
        />
        {currentMatch.games.map((game, index) => (
          <div key={index} className="game-result">
            <span>Game {index + 1}: </span>
            <button
              type="button"
              onClick={() => handleGameResult(index, 'Win')}
              className={`${game.result === 'Win' ? 'selected win' : ''}`}
            >
              Win
            </button>
            <button
              type="button"
              onClick={() => handleGameResult(index, 'Loss')}
              className={`${game.result === 'Loss' ? 'selected loss' : ''}`}
            >
              Loss
            </button>
          </div>
        ))}
        <button type="submit">Record Match</button>
      </form>

      <h2>Match History</h2>
      {matches.map((match, index) => (
        <div key={index}>
          <p>Match {index + 1}: {match.playerDeck} vs {match.opponentDeck} (Opponent: {match.opponentName})</p>
          <p>Results: {match.games.map(game => game.result).join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default MatchTracker;