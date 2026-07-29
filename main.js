//Read user's screen size
const heightOutput = document.querySelector("#height");
const widthOutput = document.querySelector("#width");
function reportWindowSize() {
  heightOutput.textContent = window.innerHeight;
  widthOutput.textContent = window.innerWidth;
}
reportWindowSize();
window.addEventListener("resize", reportWindowSize);


//target all elements to save to constants
var allpages = document.querySelectorAll(".page");

//select all subtopic pages
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}

function show(pgno) { //function to show selected page no
    hideall();
	let onepage = document.querySelector("#page" + pgno);	//select page
	onepage.style.display = "block"; //show the page
}
const navMenu = document.querySelector("#navbar ul");
navMenu.addEventListener("click", function (e) {
    const clickedButton = e.target.closest("button");	// Find the nearest button that was clicked
    if (!clickedButton) {	    // No click, no page
		return;
    }
    // Navigate to the appropriate page
    if (clickedButton.id == "page1btn") {
        show(1);
    }
    if (clickedButton.id == "page2btn") {
        show(2);
    }
    if (clickedButton.id == "page3btn") {
        show(3);
    }
});

// Show page 1 when website loads
show(1);

/*JS for hamMenu */
	const hamBtn=document.querySelector("#hamIcon");
	const menuItemsList=document.querySelector("nav ul");
	hamBtn.addEventListener("click",toggleMenus);
	function toggleMenus(){ /*open and close menu*/
		//if menuItemsList dont have the class "menuShow", add it, else remove it
		menuItemsList.classList.toggle("menuShow");
		//if menu is showing (has the class “menuShow”)
		if(menuItemsList.classList.contains("menuShow")){
			hamBtn.innerHTML="Close Menu"; //change button text to chose menu
		}else{ //if menu NOT showing
			hamBtn.innerHTML="Open Menu"; //change button text open menu
		}
	}	
////////////// QUIZ ///////////////////////
const btnSubmit=document.querySelector("#btnSubmit");
	btnSubmit.addEventListener("click",CheckAns);
const scorebox=document.querySelector("#scorebox");
const form = document.querySelector("#quizForm");
var q1,q2,q3,score=0;
function CheckAns(){
	let score = 0;
	const data = new FormData(form);
	if(data.get("q1") == "Feet"){
        score++;
    }
    if(data.get("q2") == "Mosquitoes"){
        score++;
    }
    if(data.get("q3") == "England"){
        score++;
    }
    scorebox.innerHTML ="Your score: " + score + "/3";
}
////////////// GAME ///////////////////////

const game = document.getElementById("game");
const shuttle = document.getElementById("shuttle");
const racket = document.getElementById("racket");

const scoreText = document.getElementById("gamescore");
const startBtn = document.getElementById("startBtn");

const SpeedRange = document.getElementById('SpeedRange');
const RangeValue = document.getElementById('speed');
SpeedRange.oninput = function () {
	RangeValue.textContent = SpeedRange.value;
};

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const hittingAudio = new Audio("audio/shuttlehitting.mp3");

let gamescore = 0;
let shuttleX = 0;
let shuttleY = 0;
let racketX = 0;
let gameRunning = false;

// Start Game
startBtn.addEventListener("click", function () {
    gamescore = 0;
    scoreText.textContent = gamescore;
    shuttleY = 0;
    shuttleX =Math.random() *(game.clientWidth - shuttle.clientWidth);
    racketX =(game.clientWidth - racket.clientWidth) / 2;
    racket.style.left = racketX + "px";
    startBtn.textContent = "Start Game";
	gameRunning = true;
});

// Keyboard Controls
document.addEventListener("keydown", function (e) {
    if (e.key.toLowerCase() == "a") {
        racketX -= 20;
    }
    if (e.key.toLowerCase() == "d") {
        racketX += 20;
    }
    if (racketX < 0) {
        racketX = 0;
    }
    if (racketX > game.clientWidth - racket.clientWidth) {
        racketX = game.clientWidth - racket.clientWidth;
    }
racket.style.left = racketX + "px";
});

leftBtn.addEventListener("click", function () {	// Mobile Left Button
    racketX -= 20;
    if (racketX < 0) {
        racketX = 0;
    }
    racket.style.left = racketX + "px";
});
rightBtn.addEventListener("click", function () {	// Mobile Right Button
	racketX += 20;
	if (racketX > game.clientWidth - racket.clientWidth) {
		racketX = game.clientWidth - racket.clientWidth;
	}
	racket.style.left = racketX + "px";
});

// Main Game Loop
function gameLoop() {
	if (gameRunning == true) {
		shuttleY += parseInt(SpeedRange.value);	//speed of shuttle
		shuttle.style.top = shuttleY + "px";
		shuttle.style.left = shuttleX + "px";     
		if (shuttleY >=game.clientHeight -racket.clientHeight -10 &&shuttleX >= racketX &&shuttleX <=racketX + racket.clientWidth) {	// Shuttle hits racket
			hittingAudio.play();
			gamescore++;
			scoreText.textContent = gamescore;			
			if(gamescore >= 40){	//Win
				gameRunning=false;
				startBtn.textContent = "Congrats you won! Play Again?";
			}
				shuttleY = 0;
				shuttleX =
				Math.random() *
				(game.clientWidth -
				shuttle.clientWidth);
			}
			if (shuttleY > game.clientHeight) {	 // Shuttle missed
				gameRunning = false;
				startBtn.textContent = "Play Again";
			}
	}
}
setInterval(gameLoop, 30);
	
//////////////FULL SCREEN/////////////////////
const btnFS=document.querySelector("#btnFS");
const btnWS=document.querySelector("#btnWS");
btnFS.addEventListener("click",enterFullscreen);
btnWS.addEventListener("click",exitFullscreen);
function enterFullscreen() { //must be called by user generated event
if (document.documentElement.requestFullscreen) {
document.documentElement.requestFullscreen();
} else if (document.documentElement.mozRequestFullScreen) { // Firefox
document.documentElement.mozRequestFullScreen();
} else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
document.documentElement.webkitRequestFullscreen();
} else if (document.documentElement.msRequestFullscreen) { // IE/Edge
document.documentElement.msRequestFullscreen();
}
}
function exitFullscreen() {
if (document.exitFullscreen) {
document.exitFullscreen();
} else if (document.mozCancelFullScreen) { // Firefox
document.mozCancelFullScreen();
} else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
document.webkitExitFullscreen();
} else if (document.msExitFullscreen) { // IE/Edge
document.msExitFullscreen();
}
}
//////////////RESET BUTTON/////////////////////
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", resetApp);
function resetApp(){
    show(1); // Return to Page 1
    document.querySelector("#quizForm").reset();	// Reset Quiz
    scorebox.innerHTML = "Not submitted";

    gamescore = 0;  // Restart Game
    scoreText.textContent = gamescore;
    gameRunning = false;
    shuttleY = 0;
    shuttleX = Math.random() * 550;
    racketX = (game.clientWidth - racket.clientWidth) / 2;
    shuttle.style.top = shuttleY + "px";
    shuttle.style.left = shuttleX + "px";
    racket.style.left = racketX + "px";
	
    document.querySelector("#navbar ul")	//menu
            .classList.remove("menuShow");
    if(document.fullscreenElement){	 // if Fullscreened
        document.exitFullscreen();
    }
}