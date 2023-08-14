import React, { useState, useEffect } from 'react';
import './index.css'; 

const GRID_SIZE = 6;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

const generateRandomNumbers = () => {
  const numbers = Array.from({ length: TOTAL_TILES / 2 }, (_, index) => index + 1);
  return [...numbers, ...numbers].sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [tiles, setTiles] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);

  useEffect(() => {
    const randomNumbers = generateRandomNumbers();
    const initialTiles = randomNumbers.map((number, index) => ({
      id: index,
      number,
      flipped: false,
      matched: false,
    }));
    setTiles(initialTiles);
  }, []);

  const handleTileClick = (id) => {
    if (selectedTiles.length < 2) {
      const tileIndex = tiles.findIndex(tile => tile.id === id);
      const updatedTiles = [...tiles];
      updatedTiles[tileIndex].flipped = true;
      setTiles(updatedTiles);
      setSelectedTiles([...selectedTiles, tiles[tileIndex]]);
    }
  };

  useEffect(() => {
    if (selectedTiles.length === 2) {
      if (selectedTiles[0].number === selectedTiles[1].number) {
        const updatedTiles = tiles.map(tile => {
          if (tile.id === selectedTiles[0].id || tile.id === selectedTiles[1].id) {
            return {
              ...tile,
              matched: true,
            };
          }
          return tile;
        });
        setTiles(updatedTiles);
        setSelectedTiles([]);
      } else {
        setTimeout(() => {
          const updatedTiles = tiles.map(tile => ({
            ...tile,
            flipped: false,
          }));
          setTiles(updatedTiles);
          setSelectedTiles([]);
        }, 1000);
      }
    }
  }, [selectedTiles, tiles]);

  return (
    <div className="memory-game">
      <div className="grid">
        {tiles.map(tile => (
          <div
            key={tile.id}
            className={`tile ${tile.flipped || tile.matched ? 'flipped' : ''}`}
            onClick={() => (!tile.flipped && !tile.matched) && handleTileClick(tile.id)}
          >
            {tile.flipped || tile.matched ? tile.number : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;