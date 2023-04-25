const container = document.querySelector('#container');


//creates grid squares and add to container
for (let i = 0; i < 256; i++) {
    const div = document.createElement('div');
    div.classList.add('grid-square');
    container.appendChild(div);
}

//event listener for each grid square
const squares = document.querySelectorAll('.grid-square');
squares.forEach(square => {
	square.addEventListener('mouseover', () => {
		square.classList.add('active');
	});
});