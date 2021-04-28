import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const xTitle = 'X'
const oTitle = 'O'
/*
class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={()=>this.props.onClick()}>
                {this.props.name}
            </button>
        );
    }
}
*/
// Class componenet converted to function component 
// as it does not have any state
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.name}
        </button>
    );
}

class Board extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            matchWonBy: null,
            matchDrawn: false
        }
    }

    valueIsNull(value) {
        return value === null
    }

    squareClicked(index) {
        if (this.isActionAllowedOnSquare(index) == false) {
            return
        }
        //alert('Successfully passed click event to Board from square ' + index)
        // .slice() gives an immutable copy of the object called on
        const squares = this.state.squares.slice()
        squares[index] = this.nextPlayer()//'X'
        const winner = this.winner(squares)
        let matchDrawn = this.state.matchDrawn
        if (winner === null) {
            let nullIndex = squares.findIndex(this.valueIsNull)
            //console.log('NullIndex = '+nullIndex)
            if (nullIndex === -1) {
                matchDrawn = true
            }
        }
        // Setting state of a React component makes its render() method to be called automatically
        this.setState({squares: squares, xIsNext: !this.state.xIsNext, matchWonBy: winner, matchDrawn: matchDrawn})
    }

    nextPlayer() {
        return this.state.xIsNext ? xTitle.slice() : oTitle.slice()
    }

    isActionAllowedOnSquare(squareNumber) {
        return this.state.matchWonBy === null && this.state.squares[squareNumber] === null
    }

    winner(squares) {
        const winningSteps = [
                                [0,1,2],
                                [3,4,5],
                                [6,7,8],
                                [0,3,6],
                                [1,4,7],
                                [2,5,8],
                                [0,4,8],
                                [2,4,6]
                            ]
        let winner = null
        for (let index = 0; index < winningSteps.length; index++) {
            const sequenceArray = winningSteps[index];
            const probableWinner = squares[sequenceArray[0]]
            if (probableWinner != null 
                && probableWinner === squares[sequenceArray[1]]
                && probableWinner === squares[sequenceArray[2]] ) {
                winner = probableWinner.slice();
                break;
            }
        }
        return winner                    
    }

    renderSquare(i) {
        return <Square name={this.state.squares[i]} index={i} onClick={()=>this.squareClicked(i)}/>
    }
    
    render() {
        //console.log(this.state)
        let status = 'Next Player: ' + this.nextPlayer()
        if (this.state.matchWonBy !== null) {
            status = 'Match won by ' + this.state.matchWonBy
        } else if (this.state.matchDrawn === true) {
            status = 'Match is DRAWN'
        }
         
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