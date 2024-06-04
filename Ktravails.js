/* eslint-disable no-restricted-syntax */
class Position {
  constructor(coord) {
    this.cood = coord;
    this.distance = null;
    this.predecesor = null;
  }
}

function allMoves(x, y) {
  const moves = [[x + 1, y - 2],
    [x - 1, y + 2],
    [x + 1, y + 2],
    [x + 2, y + 1],
    [x - 2, y - 1],
    [x - 1, y - 2],
    [x - 2, y + 1],
    [x + 2, y - 1]];
  const array = [];
  for (const move of moves) {
    array.push(move.filter((value) => value >= 0 && value < 8));
  }
  array.filter((element) => element.length === 2);
}

function containsEnd(array, end) {
  if (array.find((move) => move[0] === end[0] && move[1] === end[1])) {
    return true;
  }
}

function convertToNode (move, array) {
  const node = new Position(move);
  array.push(node);
  return array;
}

console.log(allMoves(7, 7));
