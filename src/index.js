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
  function rightWin(i, j) {
    let length = 1;
    if(j + 4 >= squares[0].length)
      return false 
    for(let step = 1; step < 5; step++) {
      if(squares[i][j+step] != squares[i][j] || length === 5){
        break;
      }
      length += 1;
    }
    return length === 5
  }
  function downWin(i, j) {
    let length = 1;
    if(i + 4 >= squares.length)
      return false 
    for(let step = 1; step < 5; step++) {
      if(squares[i+step][j] != squares[i][j] || length === 5){
        break;
      }
      length += 1;
    }
    return length === 5
  }
  function slashWin1(i, j) {
    let length = 1;
    if(j + 4 >= squares[0].length || i + 4 >= squares.length)
      return false 
    for(let step = 1; step < 5; step++) {
      if(squares[i+step][j+step] != squares[i][j] || length === 5){
        break;
      }
      length += 1;
    }
    return length === 5
  }
  function slashWin2(i, j) {
    let length = 1;
    if(j - 4 < 0 || i + 4 >= squares.length)
      return false 
    for(let step = 1; step < 5; step++) {
      if(squares[i+step][j-step] != squares[i][j] || length === 5){
        break;
      }
      length += 1;
    }
    return length === 5
  }
  for(let i = 0; i < squares.length; i++) {
    for(let j = 0; j < squares[0].length; j++) {
      if(squares[i][j] && (rightWin(i, j) || downWin(i, j) || slashWin1(i, j) || slashWin2(i, j))) {
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
      squares: Array.from({length:7}, () => Array(7).fill(null)),
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
        {Array(7).fill(null).map((_, row) => (
          <div key={row} className="board-row">
            {Array(7).fill(null).map((_, col) => this.renderSquare(row, col))}
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

