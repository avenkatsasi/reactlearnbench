import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={()=>this.props.onClick()}>
                {this.props.name}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null)
        }
    }

    squareClicked(index) {
        alert('Successfully passed click event to Board from square ' + index)
    }

    renderSquare(i) {
        return <Square name={this.state.squares[i]} onClick={()=>this.squareClicked(i)}/>
    }
    render() {
        const status = 'Next Player: X'
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusText: "Game under development. Status will come here",
            steps: Array(9).fill(null)
        }
    }
    render() {
        return(
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* Status will come here */this.state.statusText}</div>
                    <ol>{/* WIP steps taken till now */}</ol>
                </div>
            </div>
        );
    }
}

// ReactDOM.render(what(UI element), where(UI element), callback)
ReactDOM.render(<Game />, document.getElementById('root'));