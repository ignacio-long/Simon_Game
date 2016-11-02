var btn1 = { audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
				 btn: document.getElementById('btn1'),
				 color1: '#070',
				 color2: '#0F0'
			  },
	 btn2 = { audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
				 btn: document.getElementById('btn2'),
				 color1: '#900',
				 color2: '#F00'
			  },
	 btn3 = { audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
				 btn: document.getElementById('btn3'),
				 color1: '#CC0',
				 color2: '#FF0'
			  },
	 btn4 = { audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
				 btn: document.getElementById('btn4'),
				 color1: '#00A',
				 color2: '#05F'
			  },
	 startBtn = { btn: document.getElementById('startBtn'),
					  color1: '#623',
					  color2: '#F23'
					},
	 strictBtn = { btn: document.getElementById('strictBtn'),
					   color1: '#623',
					   color2: '#F23'
					 },
	 btnNum = { 0: btn1, 1: btn2, 2: btn3, 3: btn4 },
	 scoreDisplay = document.getElementById('counterDisplay'),
	 alarms = { basic: new Audio('https://cdn.rawgit.com/ignacio-long/freeCodeCamp_projectFiles/master/NO%20-%20Short.mp3'),
				   strict: new Audio('https://cdn.rawgit.com/ignacio-long/freeCodeCamp_projectFiles/master/NO%20-%20Long.mp3'),
				   victory: new Audio('https://cdn.rawgit.com/ignacio-long/freeCodeCamp_projectFiles/master/Victory%20Fanfare.mp3')
				 },
	 sequence = [],
	 playerTurn = false,
	 playerMoveCount = 0,
	 gameStart = false,
	 gameVictory = false,
	 strictMode = false;


// -------- Global Functions -------- //
// Sequence Player
function playSequence() {
	var seqIndex = 0;

	playerTurn = false;
	var playSeq = setInterval(function() {
		soundsAndLight(sequence[seqIndex++]);
		if (seqIndex === sequence.length) {
			clearInterval(playSeq);
			playerTurn = true;
			return;
		}
	}, 800);
}


// Sequence Generator
function growSequence() {
	sequence.push(Math.floor(Math.random() * 4));
}


// Sound and Light Effect for Btns
function soundsAndLight(val) {
	btnNum[val].audio.play();
	btnNum[val].btn.style.backgroundColor = btnNum[val].color2;
	setTimeout(function() { btnNum[val].btn.style.backgroundColor = btnNum[val].color1; }, 200);
}


// Reset Game
function resetSimon() {
	sequence = [];
	playerTurn = false;
	playerMoveCount = 0;
	gameStart = false;
	gameVictory = false;
	strictMode = false;
	scoreCounter = 0;
	startBtn.btn.style.backgroundColor = startBtn.color1;
	strictBtn.btn.style.backgroundColor = strictBtn.color1;
	displayScore(null);
	alarms.victory.pause();
}


// Display formatted Score -- Timeout added to give 'Vintage Effect'
function displayScore(val) {
	setTimeout(function() { scoreDisplay.innerHTML = val === null ? "--" : val < 10 ? "0" + String(val) : String(val); }, 300);
}


// Color Button Function --- This is the MAIN CORE!!
function colorBtn(num) {
	if (playerTurn) {
		if (num === sequence[playerMoveCount]) {
			soundsAndLight(num);
			playerMoveCount++;
			if (playerMoveCount === sequence.length) {
				playerTurn = false;
				displayScore(playerMoveCount);
				if (playerMoveCount < 20) {
					playerMoveCount = 0;
					growSequence();
					setTimeout(playSequence, 400);
				} else if (playerMoveCount === 20) {
					setTimeout(function() { alarms.victory.play(); }, 500);
				}
			}
		} else if (!strictMode) {
			alarms.basic.play();
			playerMoveCount = 0;
			setTimeout(playSequence, 400);
		} else if (strictMode) {
			playerTurn = false;
			setTimeout(function() { alarms.strict.play(); }, 400);
			setTimeout(resetSimon, 3000);
			setTimeout(startSimon, 3500);
		}
	}
}


// Game Starter
function startSimon() {
	if (!gameStart) {
		startBtn.btn.style.backgroundColor = startBtn.color2;
		displayScore(0);
		gameStart = true;
		growSequence();
		playSequence();
	} else if (gameStart) {
		resetSimon();
	}
}


// -------- Btn Assignments -------- //
startBtn.btn.onclick = function() {
	startSimon();
};

strictBtn.btn.onclick = function() {
	strictBtn.btn.style.backgroundColor = strictMode ? strictBtn.color1 : strictBtn.color2;
	strictMode = !strictMode;
};

// Color Btns
btn1.btn.onclick = function() { colorBtn(0); };

btn2.btn.onclick = function() { colorBtn(1); };

btn3.btn.onclick = function() { colorBtn(2); };

btn4.btn.onclick = function() { colorBtn(3); };

