// Se escoge que jugador empieza primero...

const players = document.querySelectorAll(".player");

let player1 = {
  element: players[0],
  points: 0,
};

let player2 = {
  element: players[1],
  points: 0,
};

let playerTurn = 0;
let totalPieces = 11;

function chooseStartPlayer() {
  const initPlayer = Math.round(Math.random() * 2);
  initPlayer == 1
    ? player1.element.classList.toggle("darken")
    : player2.element.classList.toggle("darken");
  playerTurn = initPlayer;
}

// Se genera el tablero con todas las piesas...
let clicks = 0;

function loadBoard() {
  const icons = document.querySelectorAll('.icon');
  icons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      if (totalPieces > 0) {
        if (clicks < 3) {
          playAnimation(e);
          clicks++;
          totalPieces--;
        } else {
          return;
        }
      } else {
        endGame();
      }
    }, false);
  });
}

// Metodo para comenzar la animacion...

function playAnimation(e) {
  let currentElement = e.target;
  let parentNode = e.target.parentNode;
  let siblingNode = e.target.nextElementSibling;
  parentNode.classList.add('darken');
  currentElement.classList.add('hidden');
  siblingNode.classList.remove('hidden');
  siblingNode.removeEventListener('click', playAnimation, false);
}

// Manejo de turnos...

function switchPlayer() {
  if (clicks != 0) {
    clicks = 0;
    playerTurn = playerTurn == 1 ? 2 : 1;
    player1.element.classList.toggle("darken");
    player2.element.classList.toggle("darken");
  }
}

// Decidir el ganador al terminar la partida...

function endGame() {
  if (totalPieces == 0) {
    if (playerTurn == 1) {
      alert("PLAYER 2 WON! \nThanks for playing!");
      resetGame();
    } else {
      alert("PLAYER 1 WON! \nThanks for playing!");
      resetGame();
    }
  }
}

function resetGame() {
  window.location.reload();
}

// Inicio del Juego...

function start() {
  chooseStartPlayer();
  loadBoard();
}

start();
