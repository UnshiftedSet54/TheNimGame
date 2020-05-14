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

const pts = document.querySelectorAll(".pts");

// Se escoge que jugador empieza primero...

function chooseStartPlayer() {
  const initPlayer = Math.round(Math.random() * 2);
  initPlayer == 1
    ? player1.element.classList.toggle("darken")
    : player2.element.classList.toggle("darken");
  console.log("hola");
  playerTurn = initPlayer;
}

// Se genera el tablero con todas las piesas...

const ico = document.getElementsByClassName("ico");
let clicks = 0;

function loadBoard() {
  Array.prototype.forEach.call(ico, (icon) => {
    let anim = bodymovin.loadAnimation({
      container: icon,
      path: `icon/${icon.dataset.file}.json`,
      renderer: "svg",
      loop: false,
      autoplay: false,
    });

    icon.addEventListener("click", (event) => {
      if (totalPieces > 0) {
        if (
          clicks < 3 &&
          document.getElementById(event.path[1].id).classList[1] != "darken"
        ) {
          icon.classList.toggle("darken");
          playAnim(anim);
          clicks++;
          totalPieces--;
          setPoints();
          console.log(totalPieces);
          //icon.addEventListener("mouseup", loadPieces);
        } else {
          // Agregar alguin tipo de notificacion
          return;
        }
      } else {
        endGame();
      }
    });
  });
}

// Metodo para comenzar la animacion...

function playAnim(animation) {
  //console.log(animation);
  animation.setDirection(1);
  animation.play();
  //console.log(animation);
}

//Actualiza los puntos de los jugadores...

function setPoints() {
  if (playerTurn === 1) {
    player1.points++;
    pts[0].textContent = `${player1.points}`;
  } else {
    player2.points++;
    pts[1].textContent = `${player2.points}`;
  }
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

async function endGame() {
  if (totalPieces == 0) {
    if (playerTurn == 1) {
      await alert("PLAYER 2 HA GANADO! \nGracias por jugar :)");
      resetGame();
      //await prompt("hola");
    } else {
      await alert("Player 1 ha GANADO! \nGracias por jugar :)");
      resetGame();
      //prompt("hola", "13");
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
