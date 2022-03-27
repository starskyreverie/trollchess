import React from "react";
import { Redirect } from "react-router-dom";
import { ColorContext } from "../context/colorcontext";
import generateRandomAnimalName from "random-animal-name-generator";
const socket = require("../connection/socket").socket;
/**
 * Onboard is where we create the game room.
 */

class CreateNewGame extends React.Component {
  state = {
    didGetUserName: false,
    inputText: "",
    gameId: "",
    typedGameCode: "",
    didGetGameCode: false,
  };

  constructor(props) {
    super(props);
    this.textArea = React.createRef();
  }

  send = () => {
    /**
     * This method should create a new room in the '/' namespace
     * with a unique identifier.
     */
    const newGameRoomId = generateRandomAnimalName()
      .toLowerCase()
      .split(" ")
      .join("_");

    // set the state of this component with the gameId so that we can
    // redirect the user to that URL later.
    this.setState({
      gameId: newGameRoomId,
    });

    // emit an event to the server to create a new room
    socket.emit("createNewGame", newGameRoomId);
  };

  typingUserName = () => {
    // grab the input text from the field from the DOM
    const typedText = this.textArea.current.value;

    // set the state with that text
    this.setState({
      inputText: typedText,
    });
  };

  typingGameCode = (value) => {
    this.setState({
      typedGameCode: value,
    });
  };

  render() {
    // !!! TODO: edit this later once you have bought your own domain.

    return (
      <React.Fragment>
        {this.state.didGetUserName || this.state.didGetGameCode > 0 ? (
          <Redirect
            to={
              this.state.didGetUserName
                ? "/game/" + this.state.gameId
                : "/game/" + this.state.typedGameCode
            }
          >
            <button
              className="btn btn-success"
              style={{
                marginLeft: String(window.innerWidth / 2 - 60) + "px",
                width: "120px",
                backgroundColor: "#fd4d4d",
                borderColor: "#fd4d4d",
              }}
            >
              Start Game
            </button>
          </Redirect>
        ) : (
          <>
            <div>
              <h1
                style={{
                  textAlign: "center",
                  marginTop: String(window.innerHeight / 5) + "px",
                  fontSize: "20px",
                }}
              >
                To start a game, enter a username here:
              </h1>
              <input
                style={{
                  marginLeft: String(window.innerWidth / 2 - 120) + "px",
                  width: "240px",
                  marginTop: "10px",
                }}
                ref={this.textArea}
                onInput={this.typingUserName}
              ></input>
              <button
                className="btn btn-primary"
                style={{
                  marginLeft: String(window.innerWidth / 2 - 60) + "px",
                  width: "120px",
                  marginTop: "50px",
                  backgroundColor: "#fd4d4d",
                  borderColor: "#fd4d4d",
                }}
                disabled={!(this.state.inputText.length > 0)}
                onClick={() => {
                  // When the 'Submit' button gets pressed from the username screen,
                  // We should send a request to the server to create a new room with
                  // the uuid we generate here.
                  this.props.didRedirect();
                  this.props.setUserName(this.state.inputText);
                  this.setState({
                    didGetUserName: true,
                  });
                  this.send();
                }}
              >
                Create
              </button>
            </div>
            <div>
              <h1
                style={{
                  textAlign: "center",
                  marginTop: String(window.innerHeight / 10) + "px",
                  fontSize: "20px",
                }}
              >
                To join an existing game, enter the game code your friend
                provided you here:
              </h1>
              <input
                style={{
                  marginLeft: String(window.innerWidth / 2 - 120) + "px",
                  width: "240px",
                  marginTop: "10px",
                }}
                value={this.state.typedGameCode}
                onChange={(e) => {
                  this.typingGameCode(e.target.value);
                }}
              ></input>
              <button
                className="btn btn-primary"
                style={{
                  marginLeft: String(window.innerWidth / 2 - 60) + "px",
                  width: "120px",
                  marginTop: "50px",
                  backgroundColor: "#fd4d4d",
                  borderColor: "#fd4d4d",
                }}
                disabled={!(this.state.typedGameCode.length > 0)}
                onClick={() => {
                  this.setState({
                    didGetUserName: false,
                    didGetGameCode: true,
                  });
                  console.log(this.state.typedGameCode);
                }}
              >
                Join
              </button>
            </div>
          </>
        )}
      </React.Fragment>
    );
  }
}

const Onboard = (props) => {
  const color = React.useContext(ColorContext);

  return (
    <CreateNewGame
      didRedirect={color.playerDidRedirect}
      setUserName={props.setUserName}
    />
  );
};

export default Onboard;
