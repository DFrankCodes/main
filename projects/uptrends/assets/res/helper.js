export function qs(sel, all = false) {
	let results = {};
	if (all) {
		results = document.querySelectorAll(sel);
		return results;
	}
	results = document.querySelector(sel);
	return results;
}
export function qsEl(el, sel, all = false) {
	let results = {};
	if (all) {
		results = el.querySelectorAll(sel);
		return results;
	}
	results = el.querySelector(sel);
	return results;
}

export function newIcon(icon_cat, icon_name) {
	const icon = document.createElement("i");
	icon.classList.add("fa-" + icon_cat);
	icon.classList.add("fa-" + icon_name);
	return icon;
}

export class navList {
	constructor(list) {
		this.list = list;
		this.length = this.list.length;
	}
	nav(dir, type = "nowrap") {
		if (!dir) return null;
		if (!type) type = "nowrap";
		let dirInt;
		let index;
		let indexBeta;
		if (dir === "next") {
			dirInt = 1;
		} else if (dir === "prev") {
			if (type === "wrap") dirInt = this.list.length - 1;
			if (type === "nowrap") dirInt = -1;
		}
		this.list.forEach((listItem, i) => {
			if (listItem.classList.contains("active")) {
				if (type === "nowrap") {
					indexBeta = i + dirInt;
					index = indexBeta >= this.length || indexBeta < 0 ? null: indexBeta;
				} else if (type === "wrap") {
					index = (i + dirInt) % this.list.length;
				}
			}
		});
		return index;
	}
	getIndex(item) {
		if (!item) return;
		let index;
		this.list.forEach((listItem, i) => {
			if (listItem === item) {
				index = i;
			}
		});
		return index;
	}
	getItem(index) {
		if (index === null && index !== 0) return;
		return this.list[index];
	}
}
export const isElement = (object) => {
	if (!object || typeof object !== "object") {
		return false;
	}
	if (typeof object.jquery !== "undefined") {
		object = object[0];
	}
	return typeof object.nodeType !== "undefined";
};
export const isVisible = (element) => {
	if (!isElement(element) || element.getClientRects().length === 0) {
		return false;
	}
	const elementIsVisible =
	getComputedStyle(element).getPropertyValue("visibility") === "visible";
	// Handle `details` element as its content may falsie appear visible when it is closed
	const closedDetails = element.closest("details:not([open])");
	if (!closedDetails) {
		return elementIsVisible;
	}
	if (closedDetails !== element) {
		const summary = element.closest("summary");
		if (summary && summary.parentNode !== closedDetails) {
			return false;
		}
		if (summary === null) {
			return false;
		}
	}
	return elementIsVisible;
};

export function randNo(n, x) {
	let val = Math.floor(Math.random() * ++x);
	if (val + n < x) return val + n;
	return val;
}

export function rand(length) {
	let val = [];
	for (let i = 1; i <= length; i++) {
		let n = randNo(0, 9);
		if (i === 1) n = randNo(1, 9);
		val.push(n);
	}
	return val.join("");
}

export class BIN {
	get num() {
		return "0123456789".split("");
	}
	get alpha() {
		return "abcdefghijklmnopqrstuvwxyz".split("");
	}
	get alphaU() {
		return "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
	}
	get alpha_U() {
		return (this.alpha + this.alphaU).split("");
	}
	get sym() {
		return "$@_-.#%";
	}
	get alphaNum() {
		return (this.alpha + this.num).split("");
	}
	get alphaNumSym() {
		return (this.alpha + this.num + this.sym).split("");
	}
	get alphaUNum() {
		return (this.alphaU + this.num).split("");
	}
	get alphaUNumSym() {
		return (this.alphaU + this.num + this.sym).split("");
	}
	get alpha_UNum() {
		return (this.alpha_U + this.num).split("");
	}
	get alpha_UNumSym() {
		return (this.alpha_U + this.num + this.sym).split("");
	}
	get palmpay() {
		return "WL LW FR RF ";
	}
}

export function cardId() {
	let val = [];
	let bin = new BIN();
	val.push(bin.alphaU[Math.floor(Math.random() * bin.alphaU.length)]);
	val.push(bin.alphaU[Math.floor(Math.random() * bin.alphaU.length)]);
	val.push(rand(6));
	return val.join("");
}

export function toInt(n) {
	let value = n;
	if (n) {
		try {
			value *= 1;
			return value;
		} catch (e) {
			return null;
		}
	}
}
export function boolStr(bool, mode) {
	if (typeof mode != "string") {
		console.error(
			"TypeError: Parameter 2 must be a string, " + typeof mode + " given"
		);
		return;
	} else {
		if (mode == "yn") {
			if (bool) {
				return "yes";
			} else {
				return "no";
			}
		} else if (mode == "oo") {
			if (bool) {
				return "on";
			} else {
				return "off";
			}
		} else {
			if (bool) {
				return "true";
			} else {
				return "false";
			}
		}
	}
}
export function toString(n) {
	return "" + n + "";
}
export function isInt(n) {
	if (n * 1) {
		return true;
	}
	return false;
}
export function getSum(arr) {
	let acca = 0;
	foreach(arr, (item, i) => {
		acca += toInt(item);
	});
	return acca;
}
export function getMult(arr) {
	let acca = 1;
	foreach(arr, (item, i) => {
		acca *= toInt(item);
	});
	return acca;
}
export function getAvg(arr) {
	let acca = getSum(arr) / arr.length;
	return acca;
}
export function foreach(items, fn) {
	items.forEach((item, index, items) => {
		fn(item, index, items);
	});
}
export function arrSearch(arr, key) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == key) {
			return i
		}
	}
	return false;
}
export function getLast(arr) {
	return arr[arr.length - 1];
}
export function getLastIndex(arr) {
	return arr.length - 1;
}
export function numdiv(n, divider = ",", mode = "set") {
	mode = !mode ? "set": mode;
	divider = !divider ? ",": divider;
	if (mode == "set") {
		if (!isInt(n)) {
			log(`${n} is not a Number!`, "warn");
			return null;
		}
		if (n < 1000) {
			return `${n}`;
		}
		n = toInt(n);
		let n2 = [];
		let n3 = [];
		let ns = toString(n).split("");
		let count = 0;
		for (let i = 0; i < ns.length; i++) {
			if (count == 3) {
				n2.push(divider);
				count = 0;
			}
			n2.push(ns[getLastIndex(ns) - i]);
			count++;
		}
		for (let i = 0; i < n2.length; i++) {
			n3.unshift(n2[i]);
		}
		return n3.join("");
	} else if (mode == "get") {
		ns = n.split(divider).join("");
		if (!isInt(ns)) {
			log(`${n} is not a Number!`, "warn");
			return null;
		}
		return toInt(ns);
	}
}
export function transEnd(El, fn) {
	El.addEventListener("transitionend", (e) => {
		fn(e);
	});
}
export function log(n, type = "log") {
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