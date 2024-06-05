/* eslint-disable no-restricted-syntax */
class Position {
  constructor(coord) {
    this.coord = coord;
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
  return array.filter((element) => element.length === 2);
}

function convertToNode(start) {
  const moves = allMoves(start[0], start[1]);
  const array = [];
  for (const move of moves) {
    const node = new Position(move);
    array.push(node);
  }
  return array;
}

function containsEnd(array, end) {
  if (array.find((move) => move.coord[0] === end[0] && move.coord[1] === end[1])) {
    return true;
  }
}

function constructPath(array) {
  let current = array.pop();
  let distance = current.distance;
  console.log(distance);
  const path = [];
  while (current) {
    path.push(current.coord);
    current = current.predecesor;
  }
  const result = path.reverse();
  return `You made it in ${distance}! Here's your path : ${result}`;
}

function knightMoves(start, end) {
  const startNode = new Position(start);
  startNode.distance = 0;
  const array = [];
  const queue = [startNode];

  while (!containsEnd(queue, end)) {
    const current = queue.shift();
    const moves = convertToNode(current.coord);
    moves.forEach((move) => {
      if (!containsEnd(array, end)) {
        move.distance = current.distance + 1;
        move.predecesor = current;
        queue.push(move);
        array.push(move);
      }
    });
  }
  return constructPath(array);
}
console.log(knightMoves([0, 0], [3, 3]));
