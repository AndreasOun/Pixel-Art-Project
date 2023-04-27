const container = document.querySelector('#container');
const controls = document.querySelector('#controls');
const btn16 = document.querySelector('#btn-16');
const btn32 = document.querySelector('#btn-32');
const btn64 = document.querySelector('#btn-64');
const resetButton = document.getElementById('btn-reset');
const eraserButton = document.getElementById('btn-eraser');
const colorPicker = document.getElementById('color-picker');
const grid = document.getElementById('grid');
const downloadButton = document.getElementById('btn-download');
const squares = document.querySelectorAll('.grid-square');


let eraseMode = false;
let currentColor = '#000000'; // default color is black
let isDrawing = false;

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
      square.addEventListener('mousedown', (event) => {
          isDragging = true;
          if (eraseMode) {
            square.style.backgroundColor = 'white';
          } else {
            square.style.backgroundColor = currentColor;
          }
          lastSquare = square;
      });
      square.addEventListener('mousemove', (event) => {
          if (isDragging && square != lastSquare) {
              if (eraseMode) {
                  square.style.backgroundColor = 'white';
              } else {
                  square.style.backgroundColor = currentColor;
              }
              lastSquare = square;
          }
      });
      square.addEventListener('mouseup', () => {
          isDragging = false;
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
  eraserButton.classList.toggle('active');
});

colorPicker.addEventListener('click', () => {
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.addEventListener('input', () => {
    currentColor = colorInput.value;
  });
  colorInput.click();
});

function downloadImage() {
  const canvas = document.createElement('canvas');
  const size = parseInt(container.style.width);
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const squares = document.querySelectorAll('.grid-square');
  squares.forEach((square) => {
    const x = square.offsetLeft - container.offsetLeft;
    const y = square.offsetTop - container.offsetTop;
    const color = window.getComputedStyle(square).backgroundColor;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, square.offsetWidth, square.offsetHeight);
  });
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'pixel-art.png';
  link.href = dataUrl;
  link.click();
}

downloadButton.addEventListener('click', downloadImage);

