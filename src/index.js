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
    let length = 1;
    const [x, y] = shift;
    for(let step = 1; step < WIN_LEN; step++) {
      if(squares[i + x*step][j + y*step] != squares[i][j] || length === WIN_LEN) {
        break;
      }
      length += 1;
    }
    return length === WIN_LEN;
  }

  for(let i = 0; i < squares.length; i++) {
    for(let j = 0; j < squares[0].length; j++) {
      if(squares[i][j]) {
        if(j + 4 < squares[0].length && isWinner(i, j, [0, 1]))
          return squares[i][j];
        if(i + 4 < squares.length && isWinner(i, j, [1, 0]))
          return squares[i][j];
        if(j + 4 < squares[0].length && i + 4 < squares.length && isWinner(i, j, [1, 1]))
          return squares[i][j];
        if(j - 4 >= 0 && i + 4 < squares.length && isWinner(i, j, [1, -1])) 
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

