//The setup function only happens once
function setup() {
	let cnv = createCanvas(800, 600);
	textSize(18);
	textAlign(CENTER);
	cnv.parent('myGame');

}

function keyPressed(el) {
	if(el.key == 'g' || el.key === 'G') {
		start = true;
		garbageArr = [];
	}
	if(el.key == 'Y' || el.key === 'y') {
		start = false;
		GAME_OVER = false;
		sec = 19;
		garbageArr = [];
		amountCollected = 0;
		millisec = 60;
	}
}

var amountCollected = 0;
var start = false;
var GAME_OVER = false;
var millisec = 60;
var sec = 19;
var garbageArr = [];

// function mousePressed() {
// 	collect();
// }
function mouseMoved() {
	collect();
}

function draw() {
	background('#333');
	if (start && !GAME_OVER) {
		garbageArr.map((el) => {
			fill(el[2]);
			noStroke();
			rect(el[0], el[1], 35, 35);
		})
		timer();
	} else if (GAME_OVER && !start) {
		tryAgaine();
	} else {
		fill('rgb(144,238,134)');
		textSize(30);
		text('Collect The Garbage', width/2, height/2 - 100)
		text('By Hovering On It', width/2, height/2 - 70)
		text('Press G to start', width/2, height/2 - 40)
	}

}

function tryAgaine() {
	fill('rgb(144,238,134)');
	textSize(30);
	if (amountCollected > 16) {
		text(`WOW`, width/2, height/2 - 50);
	} else if (amountCollected < 15) {
		text(`Good`, width/2, height/2 - 50);
	} else if (amountCollected < 10) {
		text(`You Can Do Better`, width/2, height/2 - 50);
	}
	text(`You Have Collected `, width/2, height/2 - 20);
	text(`${amountCollected} Garbage Items`, width/2, height/2 + 10);
	text(`Press Y To Play Again`, width/2, height/2 + 40);

}

function collect() {
	garbageArr = garbageArr.filter((el) => {
		if (dist(mouseX, mouseY, el[0]+10, el[1]+10) < 20) {
			amountCollected++;3
		}
		return dist(mouseX, mouseY, el[0]+10, el[1]+10) > 20;
	})

}

function timer() {
	textSize(18);
	textAlign(CENTER);
	fill('lightblue');
	millisec--;
	if ( millisec % 10 === 0) {
		garbageArr.push([(Math.random() * width), (Math.random() * height), `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`]);
	}
	if ( millisec == 0 ) {
		millisec = 60;
		sec--;
	}
	if (sec == -1) {
		GAME_OVER = true;
		start = false;
		WIN = false;
		garbageArr = [];

	}
	text(`${sec < 10 ? '0' : ''}${sec}:${millisec < 10 ? '0' : ''}${millisec}`, 50, 40);
	text(`Collected ${amountCollected}`, 72, 60);
}
