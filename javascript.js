const gameBoard = (() => {
  let _boardArray = new Array(9);
  const claimSquare = (position, player) => {
    _boardArray[position] = player.getSymbol();
  }

  const _createBoard = (() => {
    const htmlBody = document.getElementById('body')
    const playArea = htmlBody.appendChild(document.createElement('main'));
          playArea.classList.add('play-area');
  for (let i = 1; i <= _boardArray.length; i++) {
      const boardButtonHolder = playArea.appendChild(document.createElement('button'));
            boardButtonHolder.classList.add('play-button-holder-' + i);
      const boardButton = boardButtonHolder.appendChild(document.createElement('button'));
            boardButton.classList.add('play-button', 'play-button-' + i);
            //boardButton.textContent = i;
            boardButton.id = 'play-button-' + i;
    }
  })();

  return {
    claimSquare
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
    //const 
  })();

  return {

  };
})();

document.getElementById('hello-world').remove();