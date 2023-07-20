//Naira = &#x20A6;

function toInt(n) {
	let value = 0
	if (n) {
		try {
			value = new Number(n);
			return value + 0
		}
		catch (e) {
			return null;
		}
	}
}
function boolStr(bool, mode) {
	if (typeof mode != "string") {
		console.error("TypeError: Parameter 2 must be a string, "+typeof(mode)+" given");
		return;
	} else {
		if (mode == "yn") {
			if (bool) {
				return "yes"
			} else {
				return "no"
			}
		} else if (mode == "oo") {
			if (bool) {
				return "on"
			} else {
				return "off"
			}
		} else {
			if (bool) {
				return "true"
			} else {
				return "false"
			}
		}
	}
}
function toString(n) {
	return ""+n+""
}
function isInt(n) {
	if (n * 1) {
		return true;
	}
	return false;
}
function getSum(arr) {
	let acca = 0;
	foreach(arr, (item, i) => {
		acca += toInt(item);
	});
	return acca;
}
function getMult(arr) {
	let acca = 1;
	foreach(arr, (item, i) => {
		acca *= toInt(item);
	});
	return acca;
}
function getAvg(arr) {
	let acca = getSum(arr) / arr.length;
	return acca;
}
function foreach(items, fn) {
	items.forEach((item, index, items) => {
		fn(item, index, items);
	});
}
function getLast(arr) {
	return arr[arr.length - 1]
}
function getLastIndex(arr) {
	return arr.length - 1
}
function scan(key, arr) {
	count = 0
	for (let i = 0; i < arr.length; i++) {
		if (key == arr[i]) {
			count++
		}
	}
	return count
}
function numdiv(n, divider = ",", mode = "set") {
	mode = !mode?"set": mode
	divider = !divider?",": divider
	if (mode == "set") {
		if (!isInt(n)) {
			log(`${n} is not a Number!`, "warn")
			return null
		}
		if (n < 1000) {
			return `${n}`
		}
		n = toInt(n)
		let n2 = []
		let n3 = []
		let ns = toString(n).split("")
		let count = 0
		let isDcm = scan('.', ns)
		for (let i = 0; i < ns.length; i++) {
			if (!isDcm) {
				if (count == 3) {
					n2.push(divider)
					count = 0
				}
				n2.push(ns[getLastIndex(ns) - i])
				count++
			} else {
				if (ns[i] == ".") {
					isDcm = 0
				}
				n2.push(ns[getLastIndex(ns) - i])
			}
		}
		for (let i = 0; i < n2.length; i++) {
			n3.unshift(n2[i])
		}
		return n3.join("")
	} else if (mode == "get") {
		ns = n.split(divider).join("")
		if (!isInt(ns)) {
			log(`${n} is not a Number!`, "warn")
			return null
		}
		return toInt(ns)
	}
}
function transEnd(El, fn) {
	El.addEventListener("transitionend", (e) => {
		fn(e)
	})
}



function log(n, type = "log") {
	switch (type) {
		case "log":
			console.log(n);
			break;
		case "warn":
			console.warn(n);
			break;
		case "error":
			console.error(n);
			break;
		case "table":
			console.table(n);
			break;
		default:
			"log";
		}
	}

//	console.log(numdiv(100000.5678))


function func(x) {
	return func(x-1)
}