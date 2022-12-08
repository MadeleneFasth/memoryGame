// Alla kort, 2 st av samma
let cardsArray = [
  { 
    imgSrc: "./assets/bauble.png", 
    name: "bauble" 
  },
  { 
    imgSrc: "./assets/cane.png", 
    name: "cane" 
  },
  { 
    imgSrc: "./assets/bell.png", 
    name: "bell" 
  },
  { 
    imgSrc: "./assets/lights.png", 
    name: "lights" 
  },
  { 
    imgSrc: "./assets/reindeer.png", 
    name: "reindeer" 
  },
  { 
    imgSrc: "./assets/mistletoe.png", 
    name: "mistletoe" 
  },
  { 
    imgSrc: "./assets/tree.png", 
    name: "tree" 
  },
  { 
    imgSrc: "./assets/gingerbread.png", 
    name: "gingerbread" 
  },
  { 
    imgSrc: "./assets/sock.png", 
    name: "sock" 
  },
  { 
    imgSrc: "./assets/presents.png", 
    name: "presents" 
  },
  { 
    imgSrc: "./assets/sleigh.png", 
    name: "sleigh" 
  },
  { 
    imgSrc: "./assets/wreath.png", 
    name: "wreath" 
  },
  { 
    imgSrc: "./assets/bauble.png", 
    name: "bauble" 
  },
  { 
    imgSrc: "./assets/cane.png", 
    name: "cane" 
  },
  { imgSrc: "./assets/bell.png", 
    name: "bell" 
  },
  { 
    imgSrc: "./assets/lights.png", 
    name: "lights" 
  },
  { 
    imgSrc: "./assets/reindeer.png", 
    name: "reindeer" 
  },
  { 
    imgSrc: "./assets/mistletoe.png", 
    name: "mistletoe" 
  },
  { 
    imgSrc: "./assets/tree.png", 
    name: "tree" 
  },
  { 
    imgSrc: "./assets/gingerbread.png", 
    name: "gingerbread" 
  },
  { 
    imgSrc: "./assets/sock.png", 
    name: "sock" 
  },
  { 
    imgSrc: "./assets/presents.png", 
    name: "presents" 
  },
  { 
    imgSrc: "./assets/sleigh.png", 
    name: "sleigh" 
  },
  { 
    imgSrc: "./assets/wreath.png", 
    name: "wreath" 
  },
];
// Blandar listan av korten varje gång koden körs
cardsArray.sort(() => Math.random() - 0.5);

// Objektlista för players (användarna)
let players = [
  {
    name: "Player One",
    score: 0,
  },
  {
    name: "Player Two",
    score: 0,
  },
];

// Variabler 
const startScreen = document.querySelector(".start-screen");
const button = document.querySelector(".start-btn");
const fieldOne = document.querySelector(".player-one-field");
const fieldTwo = document.querySelector(".player-two-field");
let cardContainer = document.querySelector(".card-container");
let playerTurnHolder = document.querySelector(".player-turn-holder");
let playerOneScoreHolder = document.querySelector(".player-one-score");
let playerTwoScoreHolder = document.querySelector(".player-two-score");
let cardsChosen = [];
let cardsChosenId = [];
let gameTurn = 0;
let pairOfCards = cardsArray.length / 2;

//eventlistner till knappen, drar igång funktionen startAndHide.
button.addEventListener("click", startAndHide);

// funktionen hämtar inputen från användarna och lagrar in i objektlistan (players[x].name).
function nameInputs() {
  players[0].name = fieldOne.value;
  players[1].name = fieldTwo.value;
}

// Gömmer startrutan och visar spelplanen
function startAndHide() {
  if (startScreen.style.display === "none") {
    startScreen.style.display = "block";
  } else {
    nameInputs();
    startGame();
    startScreen.style.display = "none";
  }
}

// Lägger ut alla kort på brädet
function distributeCards() {
  for (let i = 0; i < cardsArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "./assets/back-of-card.png");
    card.setAttribute("class", i);
    cardContainer.appendChild(card);
    card.addEventListener("click", showChosenCard);
  }
}

// Uppdaterar vems tur det är av användarna och uppdaterar poängdisplayen. 
function updateGame() {
  let currentPlayer = players[gameTurn];
  playerTurnHolder.innerText = currentPlayer.name;
  playerOneScoreHolder.innerText = `${players[0].name}: ${players[0].score}`;
  playerTwoScoreHolder.innerText = `${players[1].name}: ${players[1].score}`;
}

// Funktion som startar spelet. Spelet startar med den som skrev in sitt namn i första rutan
function startGame() {
  gameTurn = 0;
  let currentPlayer = players[gameTurn];
  playerTurnHolder.innerText = currentPlayer.name;
  playerOneScoreHolder.innerText = `${players[0].name}: ${players[0].score}`;
  playerTwoScoreHolder.innerText = `${players[1].name}: ${players[1].score}`;
}

// Funktionen visar cardsArray[x].name när kortet klickats på. Funktionen sparar även ner kortet namn i listan cardsChosen och kortets index i cardsChosenId.
function showChosenCard() {
    const cardIndex = this.getAttribute("class");
    cardsChosen.push(cardsArray[cardIndex].name);
    cardsChosenId.push(cardIndex);
    this.setAttribute("src", cardsArray[cardIndex].imgSrc);
  if (cardsChosenId.length === 2) {
    setTimeout(checkForMatch, 300);
  }
}

/*  
Funktion kontrollerar om de två vända korten matchar. Dels kollar den om korten i listan CardsChosen är lika, har samma namn. 
Sedan kollar den också om korten har olika index för att säkerställa att man inte råkat klicka på samma kort två gånger. 
Är det en matchning uppdateras spelarens poäng med +1 och spelaren får fortsätta spela i nästa runda. 
*/
function checkForMatch() {
  let imgs = document.querySelectorAll("img");
  let firstCard = cardsChosenId[0];
  let secondCard = cardsChosenId[1];
  if (cardsChosen[0] === cardsChosen[1] && firstCard !== secondCard) {
    let currentPlayer = players[gameTurn];
    currentPlayer.score = currentPlayer.score + 1;

    // Korten "försvinner" efter matchning 
    imgs[firstCard].setAttribute("src", "./assets/blank.png");
    imgs[secondCard].setAttribute("src", "./assets/blank.png");
    setTimeout(checkWon, 300);
  } else {
    // Om det inte blir en matchning så vänds korten tillbaka
    imgs[firstCard].setAttribute("src", "./assets/back-of-card.png");
    imgs[secondCard].setAttribute("src", "./assets/back-of-card.png");
    gameTurn =
      (gameTurn + 1) %
      2; // Modulus 2 ger 1 och 0 varannan gång. Altenerar spelare
  }

  cardsChosen = []; // Nollar listan
  cardsChosenId = []; // Nollar listan
  updateGame(); // Kör funktionen som visar vems tur det är och uppdaterar presentationen av spelarnas poäng.
}

// Funktionen kollar om poängen i spelet är lika mycket som pairOfCards i spelet. Om det är sant avslutas spelet och genom en alert skriver det ut vem som har vunnit omgången eller om det har blivit oavgjort.
function checkWon() {
  let score1 = players[0].score;
  let score2 = players[1].score;
  let sum = score1 + score2;

  if (sum == pairOfCards) {
    if (score1 > score2) {
      alert(`Grattis, ${players[0].name} vann omgången!`);
    } else if (score1 == score2) {
      alert(`Det blev oavgjort !`);
    } else {
      alert(`Grattis, ${players[1].name} vann omgången!`);
    }
  }
}

// Funktionen som lägger ut korten och spelet börjar
distributeCards();
