const board = [[1, 2, 3, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
];

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
  return array.filter((element) => element.length == 2);
}

console.log(allMoves(7, 7));
