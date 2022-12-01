// Made by Patrick Davey, 2022

const gameBoard = (() => {
  const gameBoardSize = () => 9;
  const _gameBoardRoot = Math.sqrt(gameBoardSize());

  let _boardArray = new Array(gameBoardSize());

  const claimSquare = (position, whichPlayer) => {
    _boardArray[position - 1] = Player().getPseudo(whichPlayer);
    let button = document.querySelector(`.play-button-${position}`);
    button.textContent = Player().getPseudo(whichPlayer);
    gameFlow.checkGameStatus();
  }

  const getSquareInfo = (position) => _boardArray[position - 1];

  const _createBoard = (() => {
    const htmlBody = document.getElementById('body')
    const playArea = htmlBody.appendChild(document.createElement('main'));
          playArea.classList.add('play-area');
    for (let i = 1; i <= _boardArray.length; i++) {
      const boardButtonHolder = playArea.appendChild(document.createElement('div'));
            boardButtonHolder.classList.add('button-holder-' + i, 'button-holder');
      if (i <= _gameBoardRoot) {
        boardButtonHolder.classList.add('button-top-row')
      } else if ((i > _gameBoardRoot) && (i <= (_gameBoardRoot * (_gameBoardRoot - 1)))) {
        boardButtonHolder.classList.add('button-inner-row')
      } else {
        boardButtonHolder.classList.add('button-bottom-row')
      }
      if ((i % _gameBoardRoot) == 1) {
        boardButtonHolder.classList.add('button-left-column')
      } else if ((i % _gameBoardRoot) != 0) {
        boardButtonHolder.classList.add('button-inner-column')
      } else {
        boardButtonHolder.classList.add('button-right-column')
      }
      const boardButton = boardButtonHolder.appendChild(document.createElement('button'));
            boardButton.classList.add('play-button', 'play-button-' + i);
            boardButton.id = 'play-button-' + i;
    }
    for (let i = 1; i <= _gameBoardRoot; i++) {
      const winRow = htmlBody.appendChild(document.createElement('div'));
            winRow.classList.add('win-row-' + i, 'win-row', 'just-hidden');
      const winColumn = htmlBody.appendChild(document.createElement('div'));
            winColumn.classList.add('win-column-' + i, 'win-column', 'just-hidden');
    }
    const winForwardDiagonal = htmlBody.appendChild(document.createElement('div'));
          winForwardDiagonal.classList.add('win-forward-diagonal', 'just-hidden');
    const winBackwardDiagonal = htmlBody.appendChild(document.createElement('div'));
          winBackwardDiagonal.classList.add('win-backward-diagonal', 'just-hidden');
})();

//  const _initializeWinLines = (() => {
    //win-forward-diagonal

//  })();


  const gameStatus = () => {
    if (gameBoardSize() == 9) {
      console.groupCollapsed('Game Status');
      let _playerArray = [];
      let _computerArray = [];
      for (let i = 0; i < _boardArray.length; i++) {
        if (_boardArray[i] !== undefined) {
          console.log(_boardArray[i]);
          console.log(i + ' ' + Player(_boardArray[i]).getSymbol());
          //if (_boardArray[i] === Player().getPseudo('X')) {
          if (_boardArray[i] === Player().getPseudo('player')) {
              _playerArray.push(i + 1);
          } else if (_boardArray[i] === Player().getPseudo('computer')) {
            _computerArray.push(i + 1);
          }
        } else {

        }
      }
      console.log(_playerArray + _computerArray);
      console.groupEnd('Game Status');
      checkForWin(_playerArray, Player().getPseudo('player'));
      checkForWin(_computerArray, Player().getPseudo('computer'));
    }
    return '';
  }

  const checkForWin = (currentArray, playerOrComputer) => {
    let winType = [];

    // FORWARD DIAGONAL CHECK
    /* Check forward diagonal by checking for a 1, 
       a number equal to gameboard size, and a 
       number at an interval equal to every 
       gameboard size's root plus one between 
       those endpoints.
       i.e. a 3x3 grid's forward diagonal would be
       positions 1, 5, 9 while a 4x4 grid's forward
       diagonal would be positions 1, 6, 11, 16, and
       a 5x5 grid's forward diagonal win would be at
       positions 1, 7, 13, 19, 25, and etc.
    */
    if (Array.isArray(currentArray)) {
      let winFowardDiagonalFlag = [];
      console.groupCollapsed('checkForwardDiagonal');
      console.log('currentArray is ' + currentArray);
      console.log('_gameBoardRoot is ' + _gameBoardRoot);
      for (let i = 0; i < _gameBoardRoot; i++) {
        console.log((1 + i * (_gameBoardRoot + 1)));
        if (currentArray.includes(1 + i * (_gameBoardRoot + 1))) {
          console.log('currentArray includes: ' + (1 + i * (_gameBoardRoot + 1)));
          winFowardDiagonalFlag.push(true);
        }
      }
      console.log(winFowardDiagonalFlag);
      if ((winFowardDiagonalFlag.length == _gameBoardRoot) && winFowardDiagonalFlag.every(entry => entry == true)) {
        ////////////////////////
        // WIN!
        ////////////////////////
        console.log('Win by Forward Diagonal!')
        winType.push('Forward Diagonal');
      }
      console.groupEnd('checkForwardDiagonal');
      } else {
      console.log('currentArray is not an array');
    }

    // BACKWARDS DIAGONAL CHECK
    /* Check backward diagonal by checking for a 
       gameboard size's root, a number equal to 
       gameboard size minus a number that is one 
       smaller than its root, and a number equal 
       to every gameboard size's root interval 
       (less one) between those endpoints.
    */

    if (Array.isArray(currentArray)) {
      let winBackwardDiagonalFlag = [];
      console.groupCollapsed('checkBackwardDiagonal');
      console.log('currentArray is ' + currentArray);
      console.log('_gameBoardRoot is ' + _gameBoardRoot);
      for (let i = 0; i < _gameBoardRoot; i++) {
        console.log((_gameBoardRoot + i * (_gameBoardRoot - 1)));
        if (currentArray.includes(_gameBoardRoot + i * (_gameBoardRoot - 1))) {
          console.log('currentArray includes: ' + (_gameBoardRoot + i * (_gameBoardRoot - 1)));
          winBackwardDiagonalFlag.push(true);
        }
      }
      console.log(winBackwardDiagonalFlag);
      if ((winBackwardDiagonalFlag.length == _gameBoardRoot) && winBackwardDiagonalFlag.every(entry => entry == true)) {
        ////////////////////////
        // WIN!
        ////////////////////////
        console.log('Win by Backward Diagonal!');
        winType.push('Backward Diagonal');
      }
      console.groupEnd('checkBackwardDiagonal');
      } else {
      console.log('currentArray is not an array');
    }
  
    // ROW CHECK
    /* Check rows by beginning at 1 and 
       continuing until the game board size's 
       root or multiple thereof.
    */
    if (Array.isArray(currentArray)) {
      let winRowFlag = [];
      console.groupCollapsed('checkRow');
      console.log('currentArray is ' + currentArray);
      console.log('_gameBoardRoot is ' + _gameBoardRoot);
      for (let i = 0; i < _gameBoardRoot; i++) {
        for (let j = i * _gameBoardRoot; j < i * _gameBoardRoot + _gameBoardRoot; j++) {
          if (currentArray.includes(j + 1)) {
            console.log('currentArray includes: ' + (j + 1));
            winRowFlag.push(true);
          }  
          console.log(winRowFlag);
        }
        if ((winRowFlag.length == _gameBoardRoot) && winRowFlag.every(entry => entry == true)) {
          ////////////////////////
          // WIN!
          ////////////////////////
          console.log('Win by Row!')
          winType.push('Row');
          winType.push(i + 1);
          winRowFlag = [];
        } else {
          winRowFlag = [];
        }
      }
      console.groupEnd('checkRow');
      } else {
      console.log('currentArray is not an array')
    }
  
    // COLUMN CHECK
    /* Check columns by beginning at 1 and 
       checking a number of entries equal to the 
       game board size's root in increments of 
       said root, then moving to 2 and repeating 
       the same check until you reach the last 
       column (which is the game board size's 
       root).
    */
       if (Array.isArray(currentArray)) {
        let winColumnFlag = [];
        console.groupCollapsed('checkColumn');
        console.log('currentArray is ' + currentArray);
        //console.log('_gameBoardRoot is ' + _gameBoardRoot);
        for (let i = 0; i < _gameBoardRoot; i++) {
          //console.log('i is ' + i + '');
          for (let j = 0; j < _gameBoardRoot; j++) {
            if (currentArray.includes(i + j * _gameBoardRoot + 1)) {
              console.log('currentArray includes: ' + (i + j * _gameBoardRoot + 1));
              winColumnFlag.push(true);
            }  
            console.log(winColumnFlag);
          }
          if ((winColumnFlag.length == _gameBoardRoot) && winColumnFlag.every(entry => entry == true)) {
            ////////////////////////
            // WIN!
            ////////////////////////
            console.log('Win by Column!');
            winType.push('Column');
            winType.push(i + 1);
            winColumnFlag = [];
          } else {
            winColumnFlag = [];
          }
        }
        console.groupEnd('checkColumn');
        } else {
        console.log('currentArray is not an array');
      }
    console.log(playerOrComputer + ': ' + winType);
    return winType[0];
  }

  return {
    claimSquare,
    getSquareInfo,
    gameStatus,
    gameBoardSize,
    checkForWin,
  };
})();

const Player = (symbol) => {
  let _symbol = symbol;
  const getSymbol = () => _symbol;
  
  //const getSymbol = () => {document.getElementById(`select-${_symbol.toLowerCase()}`).textContent}

  //const getSymbol = (symbol) => getPseudo(symbol);

  const chooseSymbol = (choice, symbol) => {
    _symbol = symbol;
    
    let buttonForSymbol = document.getElementById(`select-${symbol.toLowerCase()}`);
    let buttonForOtherSymbol;
    if (symbol === 'X') {
      buttonForOtherSymbol = document.getElementById('select-o')
    } else {
      buttonForOtherSymbol = document.getElementById('select-x')
    }

    if (choice === true) {
      buttonForSymbol.classList.add('player-choice');
      buttonForOtherSymbol.classList.add('computer-choice');
    } else {
      buttonForSymbol.classList.remove('player-choice');
      buttonForOtherSymbol.classList.remove('computer-choice');
    }
  }

  const setPseudoX = () => {
    let newX = document.getElementsByName('x-symbol-field')[0].value
    if (newX != undefined) {
      document.getElementById('select-x').textContent = newX;
    }
  }

  const setPseudoO = () => {
    let newO = document.getElementsByName('o-symbol-field')[0].value
    if (newO != undefined) {
      document.getElementById('select-o').textContent = newO;
    }
  }

  const getPseudo = (symbol) => {
    switch(symbol) {
      default:
        return document.getElementById(`select-${symbol.toString().toLowerCase()}`).textContent;
      case 'player':
        return document.getElementsByClassName(`player-choice`)[0].textContent
      case 'computer':
        return document.getElementsByClassName(`computer-choice`)[0].textContent
    }
    
  }

/*  const getPseudo = (eitherPlayer) => {
    console.log(`select-${eitherPlayer.toString().toLowerCase()}`);
    console.log(document.getElementById(`select-${eitherPlayer.toString().toLowerCase()}`));
    return document.getElementById(`select-${eitherPlayer.toString().toLowerCase()}`).textContent;
  }
*/

  const getPseudoPlayer = () => {
    return document.getElementsByClassName(`player-choice`)[0].textContent;
  }

  const getPseudoComputer = () => {
    return document.getElementsByClassName(`computer-choice`)[0].textContent;
  }

//  const getPseudoO = () => {
//    return document.getElementById('select-o').textContent;
//  }

  return {
    getSymbol,
    chooseSymbol,
    setPseudoX,
    setPseudoO,
    getPseudoPlayer,
    getPseudoComputer,
    getPseudo
    //X,
    //getPseudoO
  };
}

const gameFlow = (() => {
  let _player = 'X';
  let _computer = 'O';
  if (document.getElementById('select-o') === document.getElementsByClassName('player-select')[0]) {
    _computer = 'X';
    _player = 'O';
  }

  const changeSymbol = () => {
    //Just shows the form
    const changeForm = document.getElementById('change-symbols-form-area');
    changeForm.classList.remove('hide-form');
    document.getElementsByName('x-symbol-field')[0].value = document.getElementById('select-x').textContent;
    document.getElementsByName('o-symbol-field')[0].value = document.getElementById('select-o').textContent;
  }

  const changeSymbolSubmit = () => {
    //Closes the form, calls for game reset, and updates 
    //symbols if one or more was input
    const changeForm = document.getElementById('change-symbols-form-area');
    changeForm.classList.add('hide-form');
    //Call for game reset
    //Update symbols for pseudoX and pseudoO.
    Player().setPseudoX();
    Player().setPseudoO();
  }
  const attemptClaim = (playButton) => {
    const position = gameBoard.getSquareInfo(playButton);
    if (position == undefined) {
      gameBoard.claimSquare(playButton, _player)
      if (checkGameStatus() === 'draw' || checkGameStatus() === 'win' || checkGameStatus() === 'lose') {
        //nothing
      } else {
        computerTurn();
      }
    } else {
    }
  }

  const computerTurn = () => {
    let availablePositions = [];
    for (let i = 1; i <= gameBoard.gameBoardSize(); i++) {
      if (gameBoard.getSquareInfo(i) == undefined) {
        availablePositions.push(i);
      }
    }
    const computerChoice = parseInt(Math.random() * availablePositions.length);
    if (availablePositions.length > 0) {
      gameBoard.claimSquare(availablePositions[computerChoice], _computer)
    }
  }

  const checkGameStatus = () => {
    //return gameBoard.gameStatus(gameFlow.whichIsHuman(), gameFlow.whichIsComputer())
    return gameBoard.gameStatus();
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
    const changeSymbolsFormArea = document.getElementById('body').appendChild(document.createElement('div'));
          changeSymbolsFormArea.id = 'change-symbols-form-area';
          changeSymbolsFormArea.classList.add('hide-form');
    const changeSymbolsForm = changeSymbolsFormArea.appendChild(document.createElement('form'));
          changeSymbolsForm.id = 'change-symbols-form';
    const changeSymbolXLabel = changeSymbolsForm.appendChild(document.createElement('label'));
          changeSymbolXLabel.id = 'x-symbol-label';
          changeSymbolXLabel.setAttribute('for', 'x-symbol-field');
          changeSymbolXLabel.textContent = "First Player:";
    const changeSymbolX = changeSymbolXLabel.appendChild(document.createElement('input'));
          changeSymbolX.name = 'x-symbol-field';
          changeSymbolX.classList.add('symbol-input', 'x-symbol-input');
          changeSymbolX.maxLength = 8;
    const changeSymbolOLabel = changeSymbolsForm.appendChild(document.createElement('label'));
          changeSymbolOLabel.id = 'o-symbol-label';
          changeSymbolOLabel.setAttribute('for', 'o-symbol-field');
          changeSymbolOLabel.textContent = "Second Player:";
    const changeSymbolO = changeSymbolOLabel.appendChild(document.createElement('input'));
          changeSymbolO.name = 'o-symbol-field';
          changeSymbolO.classList.add('symbol-input', 'o-symbol-input');
          changeSymbolO.maxLength = 8;
    const changeButtonSubmit = changeSymbolsFormArea.appendChild(document.createElement('button'));
          changeButtonSubmit.classList.add('change-symbols-submit');
          changeButtonSubmit.textContent = 'Submit';
    const firstTime = document.querySelectorAll('h1');
    const xButton = document.getElementById('select-x');
    const oButton = document.getElementById('select-o');
    const changeButton = document.getElementById('change-symbols');

    xButton.addEventListener('click', gameFlow.chooseX.bind());
    oButton.addEventListener('click', gameFlow.chooseO.bind());
    changeButton.addEventListener('click', gameFlow.changeSymbol.bind());
    changeButtonSubmit.addEventListener('click', gameFlow.changeSymbolSubmit.bind());
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