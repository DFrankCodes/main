//Sliding Menu
let header = document.querySelector(".header")
let nav = document.querySelector("#nav")
let cMicon = document.querySelector("#close")
header.onclick = function () {
	nav.style.height = "100px"
	cMicon.style.opacity = "1"
	nav.style.boxShadow = "-5px 5px 5px var(--boxshadcol);"
	nav.style.border = "1px solid var(--primcol)"
	nav.style.borderTop = "none"
}
cMicon.onclick = function () {
	nav.style.height = "0"
	cMicon.style.opacity = "0"
	nav.style.boxShadow = "none"
	nav.style.border = "none"
}

//Switch Calculator Type
let stand = document.querySelector("#stand")
let sci = document.querySelector("#sci")
let adv = document.querySelector("#adv")
let type = "standard"
stand.onclick = function () {
	if (type != "standard") {
		stand.style.boxShadow = "-3px 3px 3px var(--boxshadcol)"
		sci.style.boxShadow = "none"
		adv.style.boxShadow = "none"
		standswitch()
	}
}
sci.onclick = function () {
	if (type != "scientific") {
		stand.style.boxShadow = "none"
		sci.style.boxShadow = "-3px 3px 3px var(--boxshadcol)"
		adv.style.boxShadow = "none"
		sciswitch()
	}
}
adv.onclick = function () {
	if (type != "advanced") {
		stand.style.boxShadow = "none"
		sci.style.boxShadow = "none"
		adv.style.boxShadow = "-3px 3px 3px var(--boxshadcol)"
		advswitch()
	}
}

//Output Display
let disp = document.querySelector("#display")
let mode = 'calc'
let rdisp = document.querySelector("#rdisplay")


//Standard Calculator
function standswitch() {
	let topRow = document.querySelector(".top-row")
	let sideRow = document.querySelector(".side-row")
	let dynamic = document.querySelector("#dynamic")
	topRow.innerHTML = `<button id="clear" onclick="clearDisp()">C</button>
	<button id="divide" onclick="input('/')">÷</button>
	<button id="mult" onclick="input('*')">×</button>
	<button id="del" onclick="del()">DEL</button>`
	sideRow.innerHTML = `<button id="minus" onclick="input('-')">-</button>
	<button id="plus" onclick="input('+')">+</button>
	<button id="equal" onclick="calc()">=</button>
	<button id="ans" onclick="ans()">Ans</button>`
	dynamic.outerHTML = `<button id="dynamic" onclick="pisent(disp.value)">%</button>`
	type = "scientific"
}

function input(x) {
	if (disp.style.color == "var(--numcol)") {
		disp.value += x
		mode = 'calc'
		disp.style.color = "var(--numcol)"
	} else {
		disp.value = ""
		disp.value += x
		mode = 'calc'
		disp.style.color = "var(--numcol)"
	}
}

function clearDisp() {
	disp.value = ''
	rdisp.value = disp.value
	disp.style.color = "var(--numcol)"
}

function del() {
	if (rdisp.value == 'Error' || rdisp.value == "No Input") {
		rdisp.value = ''
	} else {
		disp.value = disp.value.slice(0, -1)
		disp.style.color = "var(--numcol)"
	}
}

function calc() {
	try {
		rdisp.value = eval(disp.value)
		//disp.value = ''
		mode = 'equal'
		rdisp.style.color = "var(--numcol)"
	}catch(err) {
		if (rdisp.value == undefined) {
			rdisp.value = 'Error'
			rdisp.style.color = "red"
			mode = 'equal'
		} else {
			rdisp.value = 'Error'
			rdisp.style.color = "red"
			mode = 'equal'
		}
	}
	if (rdisp.value == "undefined") {
		rdisp.value = 'No Input'
		rdisp.style.color = "red"
		mode = 'equal'
	} else if (rdisp.value === 'Error') {
		rdisp.value = 'Error'
		rdisp.style.color = "red"
		mode = 'equal'
	}
}
function ans() {
	if (rdisp.value != "undefined" && rdisp.value != 'Error') {
		disp.value += `(${rdisp.value})`
	}
	if (isNaN(rdisp.value)) {
		rdisp.value = 'Error'
		rdisp.style.color = "red"
	}
}
function pisent(x) {
	n = x/100
	rdisp.value = n
	disp.value = ''
}

//Scientific Calculator
function sciswitch() {
	let topRow = document.querySelector(".top-row")
	let sideRow = document.querySelector(".side-row")
	let dynamic = document.querySelector("#dynamic")
	topRow.innerHTML = `
	<button id="clear" onclick="clearDisp()">C</button>
	<button id="divide" onclick="sq(disp.value)">x²</button>
	<button id="mult" onclick="input('%')">mod</button>
	<button id="del" onclick="del()">DEL</button>`
	sideRow.innerHTML = `<button id="minus" onclick="cb(disp.value)">x³</button>
	<button id="plus" onclick="showIndx()">^</button>
	<button id="equal" onclick="calc()">=</button>
	<button id="ans" onclick="ans()">Ans</button>`
	dynamic.outerHTML = `<button id="dynamic" onclick="factorial(disp.value)">!</button>`
	type = "scientific"
}
function factorial(n) {
	let f = n
	if (n == '1' || n == '0' || n < 1) {
		disp.value = 1
	} else if (n > 1) {
		for (i = 1; i < n; i++) {
			f *= n - i
		}
		rdisp.value = f
		rdisp.style.color = "#dedede"
	} else {
		rdisp.value = 'Error'
		rdisp.style.color = "red"
		mode = 'equal'
	}
}
function sq(x) {
	try {
		n = x**2
		rdisp.value = n
		disp.value = ''
	} catch(err) {
		if (rdisp.value == undefined || isNaN(rdisp.value)) {
			rdisp.value = 'Error'
			disp.style.color = "red"
		}
	}
	if (isNaN(rdisp.value)) {
		rdisp.value = 'Error'
		rdisp.style.color = "red"
	}
}
function cb(x) {
	try {
		n = x**3
		rdisp.value = n
		disp.value = ''
	} catch(err) {
		if (rdisp.value == undefined || isNaN(rdisp.value)) {
			rdisp.value = 'Error'
			rdisp.style.color = "red"
		}
	}
	if (isNaN(rdisp.value)) {
		rdisp.value = 'Error'
		rdisp.style.color = "red"
	}
}

//Advanced  Calculator
function advswitch() {
	let topRow = document.querySelector(".top-row")
	let sideRow = document.querySelector(".side-row")
	let dynamic = document.querySelector("#dynamic")
	topRow.innerHTML = `
	<button id="clear" onclick="clearDisp()">C</button>
	<button id="divide" onclick="sqrt(disp.value)">√</button>
	<button id="mult" onclick="log(disp.value)">log</button>
	<button id="del" onclick="del()">DEL</button>`
	sideRow.innerHTML = `<button id="minus" onclick="cbrt(disp.value)">³√</button>
	<button id="plus" onclick="approx(disp.value)">≈</button>
	<button id="equal" onclick="calc()">=</button>
	<button id="ans" onclick="ans()">Ans</button>`
	dynamic.outerHTML = `<button id="dynamic" onclick="pi()">π</button>`
	type = "advance"
}

function sqrt(n) {
	try {
		let x = Math.sqrt(n)
		rdisp.value = x

	} catch(err) {
		if (rdisp.value == undefined) {
			rdisp.value = 'Error'
			disp.style.color = "red"
		}
	}
	if (isNaN(rdisp.value)) {
		rdisp.value = 'Error'
		rdisp.style.color = "red"
	}
}
function cbrt(n) {
	try {
		let x = Math.cbrt(n)
		rdisp.value = x

	} catch(err) {
		if (rdisp.value == undefined) {
			rdisp.value = 'Error'
			rdisp.style.color = "red"
		}
	}
	if (isNaN(rdisp.value)) {
		rdisp.value = 'Error'
		rdisp.style.color = "red"
	}
}
function log(n) {
	try {
		let x = Math.log10(n)
		rdisp.value = x

	} catch(err) {
		if (rdisp.value == undefined) {
			rdisp.value = 'Error'
			rdisp.style.color = "red"
		}
	}
	if (isNaN(rdisp.value)) {
		rdisp.value = 'Error'
		rdisp.style.color = "red"
	}
}
function approx(n) {
	try {
		let x = Math.round(n)
		rdisp.value = x

	} catch(err) {
		if (rdisp.value == undefined) {
			rdisp.value = 'Error'
			rdisp.style.color = "red"
		}
	}
	if (isNaN(rdisp.value)) {
		rdisp.value = 'Error'
		rdisp.style.color = "red"
	}
}
function pi() {
	try {
		if (disp.value == "") {
			disp.value += 3.141593
		}
	} catch(err) {
		if (rdisp.value == undefined) {
			rdisp.value = 'Error'
			rdisp.style.color = "red"
		}
	}
	if (isNaN(rdisp.value)) {
		rdisp.value = 'Error'
		rdisp.style.color = "red"
	}
}
function showIndx() {
	let indxRow = document.querySelector(".index-row")
	indxRow.style.opacity = "1"
	indxRow.style.display = "grid"
}

function indx(i) {
	let indxRow = document.querySelector(".index-row")
	x = disp.value
	n = x**i
	disp.value = n
	indxRow.style.opacity = "0"
	indxRow.style.display = "none"
	if (isNaN(rdisp.value) || typeof(rdisp.value) == undefined) {
		rdisp.value = 'Error'
		rdisp.style.color = "red"
	}
}


plus = document.getElementById("plus")
minus = document.getElementById("minus")
mult = document.getElementById("mult")
divide = document.getElementById("divide")

plus.onclick = function () {
	if (rdisp.value != "" && disp.value == "") {
		disp.value = rdisp.value
		input("+")
	} else {
		input("+")
	}
}
minus.onclick = function () {
	if (rdisp.value != "" && disp.value == "") {
		disp.value = rdisp.value
		input("-")
	} else {
		input("-")
	}
}
mult.onclick = function () {
	if (rdisp.value != "" && disp.value == "") {
		disp.value = rdisp.value
		input("*")
	} else {
		input("*")
	}
}
divide.onclick = function () {
	if (rdisp.value != "" && disp.value == "") {
		disp.value = rdisp.value
		input("/")
	} else {
		input("/")
	}
}



let sMIcon = document.getElementById("showMenu")
let hMIcon = document.getElementById("hideMenu")
let aside = document.getElementById("aside")
let theme = "#01BC62"
let vtheme = ""
let htmlEl = document.documentElement
let bodyEl = document.body
let lMIcon = document.getElementById("lMIcon")
let dMIcon = document.getElementById("dMIcon")

function showMenu() {
	aside.style.width = "100px"
	sMIcon.style.display = "none"
	hMIcon.style.display = "inline"
}
function hideMenu() {
	aside.style.width = "0"
	sMIcon.style.display = "inline"
	hMIcon.style.display = "none"
}
function lightmode() {
	htmlEl.style = `
	--bgcol: #fff;
	--numcol: #0e0e0e;
	--primcol: ${theme};
	`
	lMIcon.style.display = "none"
	dMIcon.style.display = "inline"
	vtheme = "light"
}
function darkmode() {
	htmlEl.style = `
	--bgcol: #1c1517;
	--numcol: #dedede;
	--primcol: ${theme};
	`
	lMIcon.style.display = "inline"
	dMIcon.style.display = "none"
	vtheme = "dark"
}

//THEMES
let green = document.getElementsByClassName("green")
let pink = document.getElementsByClassName("pink")
let red = document.getElementsByClassName("red")
let blue = document.getElementsByClassName("blue")
let purple = document.getElementsByClassName("purple")
let white = document.getElementsByClassName("white")
let black = document.getElementsByClassName("black")


function tgreen() {
	let htmlEl = document.documentElement
	theme = "#01bc62"
	if (vtheme == "light") {
		htmlEl.style = `
		--bgcol: #fff;
		--numcol: #0e0e0e;
		--primcol: ${theme};
		`
		vtheme = "light"
	} else {
		htmlEl.style = `
		--bgcol: #1c1517;
		--numcol: #dedede;
		--primcol: ${theme};
		`
		vtheme = "dark"
	}
}

function tpink() {
	let htmlEl = document.documentElement
	theme = "pink"
	if (vtheme == "light") {
		htmlEl.style = `
		--bgcol: #fff;
		--numcol: #0e0e0e;
		--primcol: ${theme};
		`
		vtheme = "light"
	} else {
		htmlEl.style = `
		--bgcol: #1c1517;
		--numcol: #dedede;
		--primcol: ${theme};
		`
		vtheme = "dark"
	}
}

function tred() {
	let htmlEl = document.documentElement
	theme = "red"
	if (vtheme == "light") {
		htmlEl.style = `
		--bgcol: #fff;
		--numcol: #0e0e0e;
		--primcol: ${theme};
		`
		vtheme = "light"
	} else {
		htmlEl.style = `
		--bgcol: #1c1517;
		--numcol: #dedede;
		--primcol: ${theme};
		`
		vtheme = "dark"
	}
}

function tblue() {
	let htmlEl = document.documentElement
	theme = "blue"
	if (vtheme == "light") {
		htmlEl.style = `
		--bgcol: #fff;
		--numcol: #0e0e0e;
		--primcol: ${theme};
		`
		vtheme = "light"
	} else {
		htmlEl.style = `
		--bgcol: #1c1517;
		--numcol: #dedede;
		--primcol: ${theme};
		`
		vtheme = "dark"
	}
}

function tpurple() {
	let htmlEl = document.documentElement
	theme = "purple"
	if (vtheme == "light") {
		htmlEl.style = `
		--bgcol: #fff;
		--numcol: #0e0e0e;
		--primcol: ${theme};
		`
		vtheme = "light"
	} else {
		htmlEl.style = `
		--bgcol: #1c1517;
		--numcol: #dedede;
		--primcol: ${theme};
		`
		vtheme = "dark"
	}
}

function twhite() {
	let htmlEl = document.documentElement
	theme = "#dedede"
	if (vtheme == "light") {
		htmlEl.style = `
		--bgcol: #fff;
		--numcol: #0e0e0e;
		--primcol: ${theme};
		`
		vtheme = "light"
	} else {
		htmlEl.style = `
		--bgcol: #1c1517;
		--numcol: #dedede;
		--primcol: ${theme};
		`
		vtheme = "dark"
	}
}

function tblack() {
	let htmlEl = document.documentElement
	theme = "black"
	if (vtheme == "light") {
		htmlEl.style = `
		--bgcol: #fff;
		--numcol: #0e0e0e;
		--primcol: ${theme};
		`
		vtheme = "light"
	} else {
		htmlEl.style = `
		--bgcol: #1c1517;
		--numcol: #dedede;
		--primcol: ${theme};
		`
		vtheme = "dark"
	}
}

document.addEventListener("load", chk())
function chk() {
	if (type == "standard") {
		stand.style.boxShadow = "-3px 3px 3px var(--boxshadcol)"
		sci.style.boxShadow = "none"
		adv.style.boxShadow = "none"
	} else if (type == "scientific") {
		stand.style.boxShadow = "none"
		sci.style.boxShadow = "-3px 3px 3px var(--boxshadcol)"
		adv.style.boxShadow = "none"
	} else {
		stand.style.boxShadow = "none"
		sci.style.boxShadow = "none"
		adv.style.boxShadow = "-3px 3px 3px var(--boxshadcol)"
	}
	if (htmlEl.style = `
		--bgcol: #1c1517;
		--numcol: #dedede;
		--primcol: ${theme};
		`) {
		vtheme = "dark"
	} else {
		vtheme = "dark"
	}
	if (vtheme == "light") {
		lMIcon.style.display = "none"
		dMIcon.style.display = "inlne"
	} else if (vtheme == "dark") {
		lMIcon.style.display = "inline"
		dMIcon.style.display = "none"
	}
}