// Made by Patrick Davey, 2022

const gameBoard = (() => {
  const gameBoardSize = () => 9;

  let _boardArray = new Array(gameBoardSize());
  const claimSquare = (position, player) => {
    _boardArray[position - 1] = player.getSymbol();
    console.log(_boardArray)
    let button = document.querySelector(`.play-button-${position}`);
    button.textContent = player.getSymbol();
    gameFlow.checkGameStatus();
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

  const gameStatus = (playerStatus, computerStatus) => {
    if (gameBoardSize() == 9) {
      console.groupCollapsed('Game Status');
      let _playerArray = [];
      let _computerArray = [];
      for (let i = 0; i < _boardArray.length; i++) {
        if (_boardArray[i] !== undefined) {
          console.log(i + Player(_boardArray[i]).getSymbol());
          if (_boardArray[i] === playerStatus) {
            _playerArray.push(i + 1);
          } else if (_boardArray[i] === computerStatus) {
            _computerArray.push(i + 1);
          }
        } else {

        }
      }
      console.log(playerStatus);
      console.groupEnd('Game Status');
    }
    return '';
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
  
  const chooseSymbol = (choice, symbol) => {
    _symbol = symbol;
    if (choice === true) {
      document.getElementById(`select-${symbol.toLowerCase()}`).classList.add('player-choice');
    } else {
      document.getElementById(`select-${symbol.toLowerCase()}`).classList.remove('player-choice');
    }
  }

  const pseudoX = () => {

  }

  const pseudoO = () => {}

  return {
    getSymbol,
    chooseSymbol,
    pseudoX,
    pseudoO,
  };
}

const gameFlow = (() => {
  let _player = Player('X');
  let _computer = Player('O');

  const changeSymbol = () => {

  }

  const changeSymbolSubmit = () => {

  }
  //const test = console.log(`Clicked ${boardButton.id}`)
  const attemptClaim = (playButton) => {
//    console.log('playButton used for attemptClaim is ' + playButton)
    const position = gameBoard.getSquareInfo(playButton);
//    console.log('position inside attemptClaim is ' + position)
    if (position == undefined) {
//      console.log(_player)
      gameBoard.claimSquare(playButton, _player)
      if (checkGameStatus() === 'draw' || checkGameStatus() === 'win' || checkGameStatus() === 'lose') {

      } else {
        computerTurn();
      }
    } else {
//      console.log('No can do.')
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
//    console.log(availablePositions);
    const computerChoice = parseInt(Math.random() * availablePositions.length);
//    console.log(`index ${computerChoice} results in availablePositions choice of ${availablePositions[computerChoice]}`);
    if (availablePositions.length > 0) {
      gameBoard.claimSquare(availablePositions[computerChoice], _computer)
    }
  }

  const checkGameStatus = () => {
    return gameBoard.gameStatus(whichIsHuman(), whichIsComputer())
  }

  const whichIsHuman = () => _player;

  const whichIsComputer = () => _computer;

  const chooseX = () => {
    Player().chooseSymbol(false, 'O');
    Player().chooseSymbol(true, 'X');
  }

  const chooseO = () => {
    Player().chooseSymbol(false, 'X');
    Player().chooseSymbol(true, 'O');
  }

  return {
    attemptClaim,
    computerTurn,
    checkGameStatus,
    whichIsHuman,
    whichIsComputer,
    chooseX,
    chooseO,
    changeSymbol,
    changeSymbolSubmit
  }
})();

const displayController = (() => {
  const _initialPlayerSelect = (() => {
    const changeSymbolsForm = document.getElementsByClassName('header')[0].appendChild(document.createElement('form'));
    const changeButtonSubmit = changeSymbolsForm.appendChild(document.createElement('button'));
          changeButtonSubmit.classList.add('change-symbols-submit');
          changeButtonSubmit.textContent = 'Submit';
    const changeSymbolX = changeSymbolsForm.appendChild(document.createElement('input'));
          changeSymbolX.name = 'x-symbol-field';
    const changeSymbolO = changeSymbolsForm.appendChild(document.createElement('input'));
          changeSymbolO.name = 'o-symbol-field';
    const firstTime = document.querySelectorAll('h1');
    const xButton = document.getElementById('select-x');
    const oButton = document.getElementById('select-o');
    const changeButton = document.getElementById('change-symbols');

    xButton.addEventListener('click', gameFlow.chooseX.bind());
    oButton.addEventListener('click', gameFlow.chooseO.bind());
    changeButton.addEventListener('click', gameFlow.changeSymbol());
    changeButtonSubmit.addEventListener('click', gameFlow.changeSymbolSubmit());
    if (firstTime.length == 1) {
      Player().chooseSymbol(false, 'O');
      Player().chooseSymbol(true, 'X');
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