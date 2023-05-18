import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let BOARD_W = 10;
let BOARD_H = 10;
let WIN_LEN = 5;

function Square(props) {
    return (
      <button className="square" onClick={ props.onClick }> 
        {props.value}
      </button>
    );
}

function calculateWinner(squares) {
  function isWinner(i, j, shift) {
    let step = 1;
    const [x, y] = shift;
    if(0 <= i + x*(WIN_LEN-1) < BOARD_H && 0 <= j + y*(WIN_LEN-1) < BOARD_W) {
      for(step; step < WIN_LEN; step++) {
        if(squares[i + x*step][j + y*step] != squares[i][j]) {
          break;
        }
      }
    }
    return step === WIN_LEN;
  }

  for(let i = 0; i < squares.length; i++) {
    for(let j = 0; j < squares[0].length; j++) {
      if(squares[i][j]) {
        if(isWinner(i, j, [0, 1]) || 
            isWinner(i, j, [1, 0]) || 
            isWinner(i, j, [1, 1]) || 
            isWinner(i, j, [1, -1]))
          return squares[i][j];
      }
    }
  }
  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array.from({length:BOARD_H}, () => Array(BOARD_W).fill(null)),
      xIsNext: true,
    };
  }

  handleClick(i, j) {
    if(!calculateWinner(this.state.squares) && !this.state.squares[i][j]) {
      const squares = this.state.squares.slice();
      squares[i][j] = 'X';
      if(!this.state.xIsNext) {
        squares[i][j] = 'O';
      }
      this.setState({
        squares: squares, 
        xIsNext: !this.state.xIsNext
      });
    }
  }

  renderSquare(i, j) {
    return <Square value={this.state.squares[i][j]} onClick={() => this.handleClick(i, j) } />;
  }

  render() {
    let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    const winner = calculateWinner(this.state.squares)
    if(winner) {
      status = 'Winner is ' + winner;
    }

    return (
      <div>
        <div className="status">{status}</div>
        {Array(BOARD_H).fill(null).map((_, row) => (
          <div key={row} className="board-row">
            {Array(BOARD_W).fill(null).map((_, col) => this.renderSquare(row, col))}
          </div>
        ))}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

