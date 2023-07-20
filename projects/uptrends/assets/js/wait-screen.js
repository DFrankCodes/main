import * as helper from "../res/helper.js";
const {
	qs,
	qsEl
} = helper;

const waitScreen = qs(".wait-screen");
const spinner = qs(".spinner");
const circles = qs(".circles");
let circle = qsEl(spinner, ".circle", true);
const spinnerImg = qsEl(spinner, ".spinner-img");
const counterEl = qsEl(spinner, "#counterVar");
const counter = 100;
const duration = 0.5;
let i = 0;
const progress = setInterval(() => {
	addCircle(i);
	i++;
	counterEl.innerText = i + "%";
	if (i == counter) {
		EndWaitScreen();
		clearInterval(progress);
	}
}, (duration / 100) * 1e3);
function addCircle(i) {
	let newCircle = document.createElement("div");
	newCircle.classList.add("circle");
	circles.appendChild(newCircle);
	circle = qsEl(spinner,
		".circle",
		true);
	circle[i].style.transform =
	"translate(-50%) rotate(" + 3.6 * (i + 1) + "deg)";
}
function EndWaitScreen() {
	waitScreen.classList.add("inactive");
	waitScreen.ontransitionend = () => {
		waitScreen.style.zIndex = "-1";
		waitScreen.style.display = "none";
		spinnerImg.style.animationPlayState = "paused";
	};
}