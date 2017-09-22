const R = require('ramda');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const loop = (gameData, prompt, run) => {
  rl.question(prompt, (resp) => {
    const { end, cont } = run(gameData, resp);

    if (end) {
      console.log(end.farewell);
      rl.close();
    } else {
      loop(cont.data, cont.prompt, run)
    }
  });
}

/*
  Define a function to drive your game.
  The function will need to take the current game state, the response
  from the user and calculate the next game state.

  Pass that function, along with some initial data and prompt to
  the loop function.

  When ending, the game should first show a farewell message.
  When continuing, the game should show prompt & await user input
*/

// const board = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ];
//
//
const board = [
  [{ p: 1, c: 'die' }, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const actions = {
  die: () => {}
}

const directions = {
  'N': (board, row, column) => board[row - 1][column],
  'S': (board, row, column) => board[row + 1][column],
  'W': (board, row, column) => board[row][column - 1],
  'E': (board, row, column) => board[row][column + 1],
}

const things = {
  getNextPosition(currentPosition, board, direction) {
    const rowIndex = R.findIndex((row) => {
      return R.contains(currentPosition, row);
    }, board);

    const column = R.findIndex((column) => {
      return currentPosition === column
    }, board[rowIndex]);

    const nextDirection = directions[direction](board, rowIndex, column);
    return nextDirection === undefined 
      ? -1 
      : R.is(Number) 
        ? { c: R.identity }
  },
  doAction(condition, gameState) {
    return action[condition](gameState)
  },
  board
};

module.exports = things;

loop({a: 0}, 'pick a direction!', (gameData, resp) => {
  const next = getNextPosition(gameData.currentPosition, board, resp);
  const newData = doAction(next.c);
  return {
    end: false,
    cont: {
      data: newData,
      prompt: 'pick a direction!'
    }
  };
});
