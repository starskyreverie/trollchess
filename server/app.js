import express from "express";
import http from "http";
import socketio from "socket.io";
import initializeGame from "./game-logic.js";
const app = express();

/**
 * Backend flow:
 * - check to see if the game ID encoded in the URL belongs to a valid game session in progress.
 * - if yes, join the client to that game.
 * - else, create a new game instance.
 * - '/' path should lead to a new game instance.
 * - '/game/:gameid' path should first search for a game instance, then join it. Otherwise, throw 404 error.
 */

const server = http.createServer(app);
const io = socketio(server);

// get the gameID encoded in the URL.
// check to see if that gameID matches with all the games currently in session.
// join the existing game session.
// create a new session.
// run when client connects

io.on("connection", (client) => {
  initializeGame(io, client);
  console.log("connection created");
});

// usually this is where we try to connect to our DB.
server.listen(process.env.PORT || 8000);
console.log(
  `server listening on port ${process.env.port ? process.env.port : 8000}`
);
