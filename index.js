const minimaxRoot = function (game, depth, maximisingPlayer) {
  var bestMove = -Infinity;
  var bestMoveFound;

  for (var i = 0; i < game.moves().length; i++) {
    game.move(game.moves()[i]);
    var value = minimax(
      game,
      depth - 1,
      -Infinity,
      Infinity,
      !maximisingPlayer
    );
    game.undo();
    if (value >= bestMove) {
      bestMove = value;
      bestMoveFound = game.moves()[i];
    }
  }
  return bestMoveFound;
};

function minimax(position, depth, alpha, beta, maximisingPlayer) {
  if (depth === 0) {
    return -evaluateBoard(position);
  }
  if (maximisingPlayer) {
    let value = -Infinity;
    for (let i = 0; i < position.moves().length; i++) {
      position.move(position.moves()[i]);
      value = Math.max(value, minimax(position, depth - 1, alpha, beta, false));
      position.undo();
      alpha = Math.max(alpha, value);
      if (alpha >= beta) {
        return value;
      }
    }

    return value;
  } else {
    let value = Infinity;
    for (let i = 0; i < position.moves().length; i++) {
      position.move(game.moves()[i]);
      value = Math.min(value, minimax(position, depth - 1, alpha, beta, true));
      position.undo();
      beta = Math.min(beta, value);
      if (alpha >= beta) {
        return value;
      }
    }
    return value;
  }
}

var board,
  game = new Chess();

const whitePawnMoves = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5, 5, 10, 25, 25, 10, 5, 5],
  [0, 0, 0, 20, 20, 0, 0, 0],
  [5, -5, -10, 0, 0, -10, -5, 5],
  [5, 10, 10, -20, -20, 10, 10, 5],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

const blackPawnMoves = whitePawnMoves.slice().reverse();



const whiteKnightMoves = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20, 0, 0, 0, 0, -20, -40],
  [-30, 0, 10, 15, 15, 10, 0, -30],
  [-30, 5, 15, 20, 20, 15, 5, -30],
  [-30, 0, 15, 20, 20, 15, 0, -30],
  [-30, 5, 10, 15, 15, 10, 5, -30],
  [-40, -20, 0, 5, 5, 0, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50]
];

const blacKnightMoves = whiteKnightMoves.slice().reverse();




const whiteBishopMoves = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 10, 10, 5, 0, -10],
  [-10, 5, 5, 10, 10, 5, 5, -10],
  [-10, 0, 10, 10, 10, 10, 0, -10],
  [-10, 10, 10, 10, 10, 10, 10, -10],
  [-10, 5, 0, 0, 0, 0, 5, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20]
];

const blackBishopMoves = whiteBishopMoves.slice().reverse();

const whiteRookMoves = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [5, 10, 10, 10, 10, 10, 10, 5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [0, 0, 0, 5, 5, 0, 0, 0]
];

const blackRookMoves = whiteRookMoves.slice().reverse();

const whiteQueenMoves = [
  [-20, -10, -10, -5, -5, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 5, 5, 5, 0, -10],
  [-5, 0, 5, 5, 5, 5, 0, -5],
  [0, 0, 5, 5, 5, 5, 0, -5],
  [-10, 5, 5, 5, 5, 5, 0, -10],
  [-10, 0, 5, 0, 0, 0, 0, -10],
  [-20, -10, -10, -5, -5, -10, -10, -20]
];

const blackQueenMoves = whiteQueenMoves.slice().reverse();

const whiteKingMoves = [
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-10, -20, -20, -20, -20, -20, -20, -10],
  [20, 20, 0, 0, 0, 0, 20, 20],
  [20, 30, 10, 0, 0, 10, 30, 20]
];

const blackKingMoves = whiteKingMoves.slice().reverse();

const pawnTable = [];

const knightTable = [];

const bishopTable = [];

const rookTable = [];

const queenTable = [];

const kingTable = [];

let numSquares = [];

game.SQUARES.forEach(square => {
  let value;
  if (square.charAt(1) === "8") {
    value = 0;
  } else if (square.charAt(1) === "7") {
    value = 1;
  } else if (square.charAt(1) === "6") {
    value = 2;
  } else if (square.charAt(1) === "5") {
    value = 3;
  } else if (square.charAt(1) === "4") {
    value = 4;
  } else if (square.charAt(1) === "3") {
    value = 5;
  } else if (square.charAt(1) === "2") {
    value = 6;
  } else if (square.charAt(1) === "1") {
    value = 7;
  }

  if (square.charAt(0) === "a") {
    numSquares.push({
      name: square,
      num: [0, value]
    });
  } else if (square.charAt(0) === "b") {
    numSquares.push({
      name: square,
      num: [1, value]
    });
  } else if (square.charAt(0) === "c") {
    numSquares.push({
      name: square,
      num: [2, value]
    });
  } else if (square.charAt(0) === "d") {
    numSquares.push({
      name: square,
      num: [3, value]
    });
  } else if (square.charAt(0) === "e") {
    numSquares.push({
      name: square,
      num: [4, value]
    });
  } else if (square.charAt(0) === "f") {
    numSquares.push({
      name: square,
      num: [5, value]
    });
  } else if (square.charAt(0) === "g") {
    numSquares.push({
      name: square,
      num: [6, value]
    });
  } else if (square.charAt(0) === "h") {
    numSquares.push({
      name: square,
      num: [7, value]
    });
  }
});

numSquares.forEach(square => {
  pawnTable.push({
    square: square,
    wValue: whitePawnMoves[square.num[1]][square.num[0]],
    bValue: blackPawnMoves[square.num[1]][square.num[0]]
  });

  knightTable.push({
    square: square,
    wValue: whiteKnightMoves[square.num[1]][square.num[0]],
    bValue: blacKnightMoves[square.num[1]][square.num[0]]
  });

  bishopTable.push({
    square: square,
    wValue: whiteBishopMoves[square.num[1]][square.num[0]],
    bValue: blackBishopMoves[square.num[1]][square.num[0]]
  });

  rookTable.push({
    square: square,
    wValue: whiteRookMoves[square.num[1]][square.num[0]],
    bValue: blackRookMoves[square.num[1]][square.num[0]]
  });

  queenTable.push({
    square: square,
    wValue: whiteQueenMoves[square.num[1]][square.num[0]],
    bValue: blackQueenMoves[square.num[1]][square.num[0]]
  });
  kingTable.push({
    square: square,
    wValue: whiteKingMoves[square.num[1]][square.num[0]],
    bValue: blackKingMoves[square.num[1]][square.num[0]]
  });
});


function kingSafety(board) {
  let whiteKingSafety = 0;
  let blackKingSafety = 0;

  const kingSquare = board.getKingSquare(board.turn());

  // Castling availability bonus (if not castled yet)
  if (board.hasKingsideCastlingRights(board.turn())) {
    whiteKingSafety += (board.turn() === "w") ? 20 : -20;
  }
  if (board.hasQueensideCastlingRights(board.turn())) {
    whiteKingSafety += (board.turn() === "w") ? 20 : -20;
  }

  // King's position (central squares better than edge squares)
  whiteKingSafety += pieceSquareTables.kingSquareVals[kingSquare.rank][kingSquare.file] * (board.turn() === "w" ? 1 : -1);

  if (board.hasKingsideCastlingRights(board.turn())) {
    blackKingSafety += (board.turn() === "b") ? 20 : -20;
  }
  if (board.hasQueensideCastlingRights(board.turn())) {
    blackKingSafety += (board.turn() === "b") ? 20 : -20;
  }
  blackKingSafety += pieceSquareTables.kingSquareVals[kingSquare.rank][kingSquare.file] * (board.turn() === "b" ? 1 : -1);

  return whiteKingSafety - blackKingSafety;
}

function pieceMobility(board) {
  let whiteMobility = 0;
  let blackMobility = 0;

  board.SQUARES.forEach(square => {
    const piece = board.get(square);
    if (piece && piece.color === "w") {
      whiteMobility += board.moves({ square }).length;
    } else if (piece && piece.color === "b") {
      blackMobility += board.moves({ square }).length;
    }
  });

  return whiteMobility - blackMobility;
}

function checkmateThreat(board) {
  let threateningPieces = 0;
  const kingSquare = board.getKingSquare(board.turn());

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const attackerSquare = {
        rank: kingSquare.rank + i,
        file: kingSquare.file + j,
      };
      if (board.isValid(attackerSquare) && board.get(attackerSquare) && board.get(attackerSquare).color !== board.turn()) {
        threateningPieces++;
      }
    }
  }

  let threatScore = 0;
  if (threateningPieces >= 2) {
    threatScore = -500; // Significant threat
  } else if (threateningPieces === 1) {
    threatScore = -100; // Minor threat
  }

  return threatScore;
}


function materialBalance(board) {
  let whiteMaterial = 0;
  let blackMaterial = 0;
  const pieceValues = { p: 100, n: 320, b: 330, r: 500, q: 1100, k: 20000 };

  board.SQUARES.forEach(square => {
    const piece = board.get(square);
    if (piece) {
      if (piece.color === "w") {
        whiteMaterial += pieceValues[piece.type];
      } else {
        blackMaterial += pieceValues[piece.type];
      }
    }
  });

  return whiteMaterial - blackMaterial;
}


const evaluateBoard = function (board) {
  let totalEvaluation = 0;

  // Material Balance
  totalEvaluation -= materialBalance(board);
  totalEvaluation += pieceMobility(board);
  // totalEvaluation -= kingSafety(board);
  // totalEvaluation += checkmateThreat(board);
  if (board.in_checkmate() && board.turn() === "b") {
    return totalEvaluation + 100000;
  } else if (board.in_checkmate() && board.turn() === "w") {
    return totalEvaluation - 100000;
  } else if (board.in_draw()) {
    return 0;
  }

  return totalEvaluation;
};

// Print Pawn Evaluation Table
console.log("Pawn Evaluation Table:");
console.log("----------------------");
console.log("Square  | White Value  |   Black Value");
console.log("-----------------------------------");

// Iterate over pawnTable and print each entry
if (pawnTable.length !== 0) {
  pawnTable.forEach(({ square, wValue, bValue }) => {
    console.log(`${square.name}     | ${wValue}          | ${bValue}`);
    // console.log(square);
  });
  console.log("\n");
}

// Print Knight Evaluation Table
console.log("Knight Evaluation Table:");
console.log("------------------------");
console.log("Square  | White Value  |   Black Value");
console.log("-----------------------------------");

// Iterate over knightTable and print each entry
if (knightTable.length !== 0) {
  knightTable.forEach(({ square, wValue, bValue }) => {
    console.log(`${square.name}     | ${wValue}          | ${bValue}`);
    // console.log(3);
  });
  console.log("\n");
}



const getPieceValue = function (piece, square) {
  if (piece === null) {
    return 0;
  }
  const getAbsoluteValue = function (piece) {
    let value;

    if (piece.type === "p") {
      value = 100;
    } else if (piece.type === "r") {
      value = 500;
    } else if (piece.type === "n") {
      value = 320;
    } else if (piece.type === "b") {
      value = 330;
    } else if (piece.type === "q") {
      value = 900;
    } else if (piece.type === "k") {
      value = 20000;
    }

    return value;
  };

  const getSquareValue = function (piece, square) {
    if (piece.color === "w") {
      if (piece.type === "p") {
        let val = pawnTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "r") {
        let val = rookTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "n") {
        let val = knightTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "b") {
        let val = bishopTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "q") {
        let val = queenTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "k") {
        let val = kingTable.find(obj => obj.square.name === square);
        return val.wValue;
      }
    } else {
      if (piece.type === "p") {
        let val = pawnTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "r") {
        let val = rookTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "n") {
        let val = knightTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "b") {
        let val = bishopTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "q") {
        let val = queenTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "k") {
        let val = kingTable.find(obj => obj.square.name === square);
        return val.bValue;
      }
    }
  };

  let value = getAbsoluteValue(piece) + getSquareValue(piece, square);

  if (piece.color === "w") {
    return value;
  } else {
    return -value;
  }
};


function onDragStart(source, piece) {
  if (piece.charAt(0) === "b") {
    return false;
  }
}

function onDrop(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: "q"
  });

  if (move === null) {
    displayLoading(false);
    return "snapback";
  } else {
    displayLoading(true);
    setTimeout(function () {
      makeBestMove(game, 3);
      displayLoading(false);
      chessboard.position(game.fen());
      updateStatus();
    }, 250);
  }

  updateStatus();
}

function onSnapEnd() {
  chessboard.position(game.fen());
}

const $status = $(".status");

function updateStatus() {
  var status = "";

  var moveColor = "White";
  if (game.turn() === "b") {
    moveColor = "Black";
  }

  if (game.in_checkmate()) {
    status = "Game over, " + moveColor + " is in checkmate.";
  } else if (game.in_draw()) {
    status = "Game over, drawn position";
  } else {
    status = moveColor + " to move";

    if (game.in_check()) {
      status += ", " + moveColor + " is in check";
    }
  }

  $status.html(status);
}

const config = {
  pieceTheme: "img/chesspieces/fapieces/{piece}.png",
  showNotation: false,
  draggable: true,
  position: "start",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};

const chessboard = Chessboard("chessboard", config);

function makeBestMove(game, depth) {
  let bestMove = minimaxRoot(game, depth, true);
  game.move(bestMove);
  setTimeout(function () {
    chessboard.position(game.fen());
  }, 100);
}

const loading = document.querySelector(".loading");

function displayLoading(bool) {
  if (bool) {
    loading.style.visibility = "visible";
  } else {
    loading.style.visibility = "hidden";
  }
}


// Populate pawnTable with evaluation values for each square
for (let rank = 0; rank < 8; rank++) {
  for (let file = 0; file < 8; file++) {
    const wValue = whitePawnMoves[rank][file];
    const bValue = blackPawnMoves[rank][file];
    const squareName = String.fromCharCode(97 + file) + (8 - rank);
    pawnTable.push({ square: squareName, wValue, bValue });
  }
}


// Populate knightTable with evaluation values for each square
for (let rank = 0; rank < 8; rank++) {
  for (let file = 0; file < 8; file++) {
    const wValue = whiteKnightMoves[rank][file];
    const bValue = blacKnightMoves[rank][file];
    const squareName = String.fromCharCode(97 + file) + (8 - rank);
    knightTable.push({ square: squareName, wValue, bValue });
  }
}



