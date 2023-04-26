const container = document.querySelector('#container');
const controls = document.querySelector('#controls');
const btn16 = document.querySelector('#btn-16');
const btn32 = document.querySelector('#btn-32');
const btn64 = document.querySelector('#btn-64');
const resetButton = document.getElementById('btn-reset');
const eraserButton = document.getElementById('btn-eraser');
const colorPicker = document.getElementById('color-picker');
const grid = document.getElementById('grid');


let eraseMode = false;
let currentColor = '#000000'; // default color is black

// create initial grid
createGrid(16);

// add event listeners to buttons
btn16.addEventListener('click', () => {
	removeGrid();
	createGrid(16);
});
btn32.addEventListener('click', () => {
	removeGrid();
	createGrid(32);
});
btn64.addEventListener('click', () => {
	removeGrid();
	createGrid(64);
});

// function to create grid
function createGrid(size) {
    // calculate size of each grid square based on container size and number of squares
    const squareSize = size === 16 ? 60 : size === 32 ? 30 : 15;
  
    // update current color when color picker changes
    colorPicker.addEventListener('input', (event) => {
      currentColor = event.target.value;
    });

    // set width and height of container based on number of squares and square size
    const containerSize = size * squareSize;
    container.style.width = `${containerSize}px`;
    container.style.height = `${containerSize}px`;
  
    // create grid squares and add to container
    for (let i = 0; i < size * size; i++) {
      const div = document.createElement('div');
      div.classList.add('grid-square');
      div.style.width = `${squareSize}px`;
      div.style.height = `${squareSize}px`;
      container.appendChild(div);
    }
  
    // add event listener to each grid square
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach((square) => {
      square.addEventListener('mouseover', () => {
          if (eraseMode) {
              square.style.backgroundColor = 'white';
          } else {
              square.style.backgroundColor = currentColor;
          }
      });
  });
}

// function to remove old grid
function removeGrid() {
	const squares = document.querySelectorAll('.grid-square');
	squares.forEach(square => {
		container.removeChild(square);
	});
}

resetButton.addEventListener('click', function() {
  const squares = document.querySelectorAll('.grid-square');
  squares.forEach(square => {
    square.style.backgroundColor = 'white';
  });
  eraseMode = false;
});

eraserButton.addEventListener("click", () => {
  eraseMode = !eraseMode;
});

colorPicker.addEventListener('click', () => {
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.addEventListener('input', () => {
    currentColor = colorInput.value;
  });
  colorInput.click();
});

grid.addEventListener('mousemove', (event) => {
  if (event.target.className === 'cell') {
    event.target.style.backgroundColor = currentColor;
  }
});

