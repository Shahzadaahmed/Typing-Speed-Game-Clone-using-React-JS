/***** Typing Speed Game in React JS *****/

import React, { Component } from "react";
import randomWords from "random-words";

// Importing components from MATERIAL UI...!
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// TypingSpeedGame Component...!
class TypingSpeedGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allWords: randomWords(100000),
            randomWord: undefined,
            userInput: "",
            message: undefined,
            seconds: undefined,
            minutes: undefined,
            wordsCount: 0,
            isPlaying: false,
            selectLevel: "Select Level",
            hasGameOver: true,
            typingLevel: undefined
        }
    }

    // Gliobal variables...!
    timeIntervalOfStartTimer;

    // Note (Function # 01): Function to show words...!
    showWords = (allWords) => {
        let randomIndex = Math.floor(Math.random() * allWords.length);
        // console.log(allWords[randomIndex]);
        this.setState({
            randomWord: allWords[randomIndex]
        });
    }

    // Note (Function # 02): Function of game timer...!
    startTimer = () => {
        let sceondsClone = this.state.seconds;
        let minutesClone = this.state.minutes;

        if (sceondsClone < 1) {
            if (minutesClone < 1) {
                clearInterval(this.timeIntervalOfStartTimer);
                this.speedTest();
                // console.log(this.state.typingLevel);
                this.setState({
                    isPlaying: false,
                    hasGameOver: false,
                    message: "Game Over!!!",
                    userInput: ""
                });
            }

            else {
                minutesClone--;
                this.setState({
                    minutes: minutesClone,
                    seconds: 59
                });
            }
        }

        else {
            sceondsClone--;
            this.setState({
                seconds: sceondsClone
            });
        }
    }

    // Note (Function # 03): Function to initialize the game...!
    initializeGame = () => {
        this.showWords(this.state.allWords);
        this.timeIntervalOfStartTimer = setInterval(this.startTimer, 1000);
    }

    // When this component rendered successfully then this event will run...!
    // componentDidMount() {
    //     this.initializeGame();
    // }

    // Note (Function # 04): Function to handle drop down...!
    selectHandler = (event) => {
        let selectedChallenge = event.target.value;
        // console.log(selectedChallenge);
        this.setState({
            selectLevel: selectedChallenge
        });
        let dropDown = document.getElementById("dropdown");

        if (selectedChallenge === "One") {
            this.setState({
                seconds: 59,
                minutes: 0
            });
            this.initializeGame();
            dropDown.disabled = true;
        }

        else if (selectedChallenge === "Two") {
            this.setState({
                seconds: 59,
                minutes: 1
            });
            this.initializeGame();
            dropDown.disabled = true;
        }

        else if (selectedChallenge === "Five") {
            this.setState({
                seconds: 59,
                minutes: 4
            });
            this.initializeGame();
            dropDown.disabled = true;
        }
    }

    // Note (Function # 05): Function to check if user typed value and random value matched...!
    wordsMatched = (userValue) => {
        let randomWordClone = this.state.randomWord;

        if (randomWordClone === userValue) {
            this.setState({
                message: "Correct!!!"
            });
            return true;
        }

        else {
            this.setState({
                message: ""
            });
            return false;
        }
    }

    // Note (Function # 06): Function to start the game...!
    startGame = (getUserTypedValue) => {
        if (this.wordsMatched(getUserTypedValue)) {
            this.showWords(this.state.allWords);
            this.setState({
                isPlaying: true,
                wordsCount: this.state.wordsCount + 1,
                userInput: ""
            });
        }
    }

    // Note (Function # 07): Form handler function...!
    formHandler = (event) => {
        let inputValue = event.target.value;
        inputValue = inputValue.toLowerCase();
        this.setState({
            userInput: inputValue
        });

        // console.log(inputValue);
        this.startGame(inputValue);
    }

    // Note (Function # 08): Function to test user typing speed...!
    speedTest = () => {
        let wordsCountClone = this.state.wordsCount;
        let typingLevelClone = this.state.typingLevel;

        if (wordsCountClone >= 20 && wordsCountClone < 45) {
            typingLevelClone = "Your typing speed is Average!";
            this.setState({
                typingLevel: typingLevelClone
            });
        }

        else if (wordsCountClone >= 45 && wordsCountClone < 70) {
            typingLevelClone = "Your typing speed is Fluent!";
            this.setState({
                typingLevel: typingLevelClone
            });
        }

        else if (wordsCountClone >= 70) {
            typingLevelClone = "Your typing speed is Super Fast!";
            this.setState({
                typingLevel: typingLevelClone
            });
        }

        else if (wordsCountClone < 20) {
            typingLevelClone = "Your typing speed is Very Slow!";
            this.setState({
                typingLevel: typingLevelClone
            });
        }
    }

    /***** App Functionality Finished *****/

    // Note (Function # 09): Function tp play again...!
    playAgain = () => {
        window.location.reload();
    }

    // Note (Function # 10): Function to close the game...!
    closeGame = () => {
        alert("Game Closed! By Now!!!");
        window.close();
    }

    // Render fuction...!
    render() {
        return (
            // Main container...!
            <React.Fragment>
                <div>
                    <Container fixed>

                        {/* App Header */}
                        <h1 id="appHeader"> Typing Speed Game in React JS </h1>
                        <hr />

                        {/* Inner container # 1 */}
                        <div id="middleContainer">
                            <span id="spanTag">
                                {
                                    ((this.state.minutes && this.state.seconds) === undefined)
                                        ?
                                        ("Time: Minutes: 0 : Seconds: 0")
                                        :
                                        (`Time: Minutes: ${this.state.minutes} : Seconds: ${this.state.seconds}`)
                                }
                            </span>

                            <span id="spanTag">
                                You typed {(!this.state.hasGameOver) ? (<span className="totalCountNum"> {this.state.wordsCount} </span>) : (null)} words
                        </span>
                        </div>

                        {/* Result Header */}
                        <h1 id="gameHeader">
                            {(this.state.hasGameOver) ? ("Beat The Word") : (this.state.typingLevel)}
                        </h1>

                        {/* Game Levels Area */}
                        <select id="dropdown" value={this.state.selectLevel} onChange={this.selectHandler}>
                            <option value="SelectLevel"> Select Level </option>
                            <option value="One"> One Minute Challenge </option>
                            <option value="Two"> Two Minutes Challenge </option>
                            <option value="Five"> Five Minutes Challenge </option>
                        </select>

                        {/* Random Word Area */}
                        <h2 id="randomWordHeader"> {this.state.randomWord} </h2>

                        {/* Input Field Area */}
                        {
                            (this.state.hasGameOver)
                                ?
                                (
                                    <div id="inputFieldContainer">
                                        <TextField
                                            autoFocus
                                            label="Type Fast"
                                            id="standard-basic"
                                            value={this.state.userInput}
                                            onChange={this.formHandler}
                                        />
                                    </div>
                                )
                                :
                                (null)
                        }

                        {/* Showing Meessage Area */}
                        <h2 id="messageArea"> {this.state.message} </h2>

                        {/* Instructions Area */}
                        <div className="alert alert-success" role="alert" id="instrunctionsContainer">
                            <h4 className="alert-heading"> Read the Instructions Carefully! </h4>
                            <p> Select the level and check our typing speed level in the given amount of time. Once the game started
                            you cannot change level. Once the game is over then you need to click play again button to play the game otherwise
                        field bar and dropdown list will be disable. </p>
                        </div>

                        {/* Buttons Area */}
                        <div id="footerContainer">
                            <Button title="Play Again" variant="contained" color="secondary" onClick={this.playAgain} id="myButtons"> Play Again </Button>
                            <Button title="Close Game" variant="contained" color="secondary" onClick={this.closeGame} id="myButtons"> End Game </Button>
                        </div>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default TypingSpeedGame;