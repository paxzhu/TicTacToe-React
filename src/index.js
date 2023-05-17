import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={ props.onClick }> 
        {props.value}
      </button>
    );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c] && squares[a] == squares[d] && squares[a] == squares[e]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(25).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    if(!calculateWinner(this.state.squares) && !this.state.squares[i]) {
      const squares = this.state.squares.slice();
      squares[i] = 'X';
      if(!this.state.xIsNext) {
        squares[i] = 'O';
      }
      this.setState({
        squares: squares, 
        xIsNext: !this.state.xIsNext
      });
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i) } />;
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
        {Array(5).fill(null).map((_, row) => (
          <div key={row} className="board-row">
            {Array(5).fill(null).map((_, col) => this.renderSquare(row*5 + col))}
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

