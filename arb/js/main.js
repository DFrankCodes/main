//arb_init()


//VARS
let form = document.getElementById('input-form')
let output = document.querySelector(".calculator-output .outputTable .output")
let error = document.querySelector(".calculator-output .error");
let isLossEls = document.querySelectorAll("*.isLoss");
let status = document.querySelector(".calculator-output .status");
let arbTypeDiv = form.querySelector("#arbType")
let menuIcon = document.querySelector("header .menu-icon")
let menuNav = document.querySelector(".menu-nav")


let arbType = null
let results = null
form.arbTypeRadios.forEach(arbTypeRadio => {
	if (arbTypeRadio.checked) {
		arbType = new Number(arbTypeRadio.value)
	}
})

form.arbTypeRadios.forEach(arbTypeRadio => {
	arbTypeRadio.addEventListener("click", () => {

		if (arbTypeRadio.checked) {
			arbType = new Number (arbTypeRadio.value)
			if (arbType == 3) {
				if (arbTypeDiv.children.length < 3) {
					newInpDiv = document.createElement("span")
					newInpDiv.classList.add("odd")
					newInp = document.createElement("input")
					newInp.type = "text"
					newInp.name = "odd3"
					newInp.placeholder = "Odd 3"
					newInp.id = "odd3"
					newInpDiv.appendChild(newInp)
					arbTypeDiv.appendChild(newInpDiv)

					output.innerHTML += "<tr><td>3</td><td></td><td></td><td></td><td></td></tr>"
				}
			} else if (arbType == 2) {
				if (arbTypeDiv.children.length > 2) {
					arbTypeDiv.children[arbTypeDiv.children.length - 1].remove()
					output.children[output.children.length - 1].remove()
				}
			}
		}
	})
})

form.addEventListener("submit", (e) => {
	e.preventDefault()

	let arbTypeRadios = form.arbTypeRadios
	let oddsEl1 = form.odd1
	let oddsEl2 = form.odd2
	let oddsEl3 = null
	if (arbType == 3) {
		oddsEl3 = form.odd3
	}

	let odds = []
	odds.push(oddsEl1.value)
	odds.push(oddsEl2.value)
	if (arbType == 3) {
		odds.push(oddsEl3.value)
	}


	let stake = form.stake.value

	let validateData = filterArbData(arbType, odds, stake)
	if (validateData === true) {
		let arb = new Arb(arbType, odds, stake)
		let result = arb.retvals()
		results = result
	} else {
		results = validateData
	}
})