import calculateWinner from './../services/calculateWinner';
import StandartField from './fields/StandartField';
import { useState, useEffect } from 'react';

const emptyFields = Array.from({ length: 9 }, (_, i) => ({ id: i, value: '' }));

function TicTacToe() {
    const [turn, setTurn] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [fields, setFields] = useState(emptyFields);
    const [gameOver, setGameOver] = useState(false);
  
    useEffect(() => {
      const winner = calculateWinner(fields.map(field => field.value));
      if (winner) {
        setTimeout(() =>{
          alert(`Game Over. Player ${winner} wins!`);
          setGameOver(true);
        }, 500);
      } else if (turn === 9) {
        alert('Game Over. It is a draw!');
        setGameOver(true);
      }
    }, [fields, turn]);
    
    /*
    immideatly change after the games finish
      useEffect(() => {
      const winner = calculateWinner(fields.map(field => field.value));
      if (winner || turn === 8) {
        setTimeout(() => {
          const message = winner ? `Player ${winner} wins!` : 'Game Over. It is a draw!';
          alert(message);
          resetGame();
        }, 500); // Delay for 500ms or half a second
      }
    }, [fields, turn]); // Dependency array ensures this effect runs any time these values change
  
    */
  
    const manageTurn = (id) => {
      if (gameOver || fields[id].value !== '') return;
  
      const newFields = fields.map(field =>
        field.id === id ? { ...field, value: currentPlayer } : field
      );
  
      setFields(newFields);
      setTurn(prevTurn => prevTurn + 1);
      setCurrentPlayer(turn % 2 === 0 ? 'O' : 'X');
    };
  
    const resetGame = () => {
      setFields(emptyFields);
      setTurn(0);
      setCurrentPlayer('X');
      setGameOver(false);
    };
  
    return (
      <>
        <div className='container board-grid'>
          {fields.map(field => (
            <StandartField
              key={field.id}
              id={field.id}
              value={field.value}
              manageTurn={() => manageTurn(field.id)}
            />
          ))}
          
        </div>
        {
          gameOver && (
            <button onClick={resetGame} className="reset-button">
              Start New Game
            </button>
          )
        }
      </>
    );
  }
  

export default TicTacToe;