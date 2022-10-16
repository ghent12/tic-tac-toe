const gameBoard = (() => {
  const gameBoardSize = () => 9;

  let _boardArray = new Array(gameBoardSize());
  const claimSquare = (position, player) => {
    _boardArray[position - 1] = player.getSymbol();
    console.log(_boardArray)
    let button = document.querySelector(`.play-button-${position}`);
    button.textContent = player.getSymbol();
  }

  const getSquareInfo = (position) => _boardArray[position - 1];

  const _createBoard = (() => {
    const htmlBody = document.getElementById('body')
    const playArea = htmlBody.appendChild(document.createElement('main'));
          playArea.classList.add('play-area');
  for (let i = 1; i <= _boardArray.length; i++) {
      const boardButtonHolder = playArea.appendChild(document.createElement('div'));
            boardButtonHolder.classList.add('button-holder-' + i);
      const boardButton = boardButtonHolder.appendChild(document.createElement('button'));
            boardButton.classList.add('play-button', 'play-button-' + i);
            boardButton.id = 'play-button-' + i;
    }
  })();

  const gameStatus = () => {

  }

  return {
    claimSquare,
    getSquareInfo,
    gameStatus,
    gameBoardSize
  };
})();

const Player = (symbol) => {
  let _symbol = symbol;
  const getSymbol = () => _symbol;
  
  return {
    getSymbol
  };
}

const gameFlow = (() => {
  const _player = Player('X');
  const _computer = Player('O');
  //const test = console.log(`Clicked ${boardButton.id}`)
  const attemptClaim = (playButton) => {
    console.log('playButton used for attemptClaim is ' + playButton)
    const position = gameBoard.getSquareInfo(playButton);
    console.log('position inside attemptClaim is ' + position)
    if (position == undefined) {
      console.log(_player)
      gameBoard.claimSquare(playButton, _player)
      if (checkGameStatus()) {

      } else {
        computerTurn();
      }
    } else {
      console.log('No can do.')
    }
  }

  const computerTurn = () => {
    let availablePositions = [];
    for (let i = 1; i <= gameBoard.gameBoardSize(); i++) {
      if (gameBoard.getSquareInfo(i) == undefined) {
        availablePositions.push(i);
        //console.log(`hi ${i}`);
      }
    }
    console.log(availablePositions);
    const computerChoice = parseInt(Math.random() * availablePositions.length);
    console.log(`index ${computerChoice} results in availablePositions choice of ${availablePositions[computerChoice]}`);
    gameBoard.claimSquare(availablePositions[computerChoice], _computer)
  }

  const checkGameStatus = () => {

  }

  return {
    attemptClaim,
    computerTurn,
    checkGameStatus
  }
})();

const displayController = (() => {

  const _initialPlayerSelect = (() => {
    const firstTime = document.querySelectorAll('h1');
    const xButton = document.getElementById('select-x')
    if (firstTime.length == 1) {
      xButton.classList.add('selected-player-button');
    }
  })();

  const _initializeButtonClicks = (() => {
    const boardButtons = Array.prototype.slice.call(document.querySelectorAll('.play-button'));
    console.log(boardButtons);
    for (let i = 0; i < boardButtons.length; i++) {
      let button = boardButtons[i];
      button.addEventListener('click', gameFlow.attemptClaim.bind(button, i + 1))
    }
  })();

  return {

  };
})();

document.getElementById('hello-world').remove();