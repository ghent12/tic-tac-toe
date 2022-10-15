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
      const boardButton = playArea.appendChild(document.createElement('button'));
            boardButton.classList.add('play-button', 'play-button-' + i);
            boardButton.textContent = i;
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



const displayController = (() => {

  return {

  };
})();

document.getElementById('hello-world').remove();