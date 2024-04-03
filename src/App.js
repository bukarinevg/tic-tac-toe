import { useState, useEffect } from 'react';
import { StrictMode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



const calculateWinner = (squares) => {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(a, b, c, squares[a], squares[b], squares[c]); 
      return squares[a];
    }
  }
  return null;
};

const emptyFields = Array.from({ length: 9 }, (_, i) => ({ id: i, value: '' }));

function Field(props){
  return (
      <input id={props.id} onClick={() => props.manageTurn(props.id)} value={props.value} className='field' maxLength={1} readOnly={true} />
  )
}
function Board() {
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
          <Field
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
function Game() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <Board />
        
      </header>
    </div>
  );  
}

function App() {
  return (
    <StrictMode>
      <Game />
    </StrictMode>
  );
}


export default App;
