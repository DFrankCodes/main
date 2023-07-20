import * as helper from '../res/helper.js';
import App from './app.js';
const {
	qs,
	qsEl,
	foreach,
	rand,
	getLastIndex
} = helper;
export class Product {
	constructor(img, title, price) {
		this.id = rand(16) * 1;
		this.img = img
		this.title = title
		this.price = price
		this.html = `<div class="item">
		<div class="img">
		<img src="${img}" alt="Item 1">
		</div>
		<div class="desc">
		<p class="title">
		${title}
		</p>
		<p class="price">
		&#x20A6;${price}
		</p>
		</div>
		<button id="delBtn" data-cart-id='${this.id}' type="button" onclick="remCartItem(this)"><i class="fa-solid fa-trash-alt"></i></button>
		</div>`
	}
	get obj () {
		return {
			id: this.id,
			img: this.img,
			title: this.title,
			price: this.price,
			html: this.html,
		}
	}
}
export class Cart {
	constructor(config) {
		this.El = config.el
		this.counterEl = config.counterEl
		this.checkoutEl = config.checkoutEl
		this.counter = 0
		this.items = []
		this.updateCart()
	}
	add(item) {
		this.items.push((new Product(item.img, item.title, item.price)).obj)
		this.counter++
		this.updateCart()
	}
	remove(id) {
		let newItems = []
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].id == id) ++i
			if (this.items[i]) newItems.push(this.items[i])
		}
		this.items = newItems;
		this.counter--
		this.updateCart();
	}
	updateCart() {
		console.log("Updated Cart...");
		this.counterEl.innerHTML = this.counter
		this.El.innerHTML = ''
		for (let i = 0; i < this.items.length; i++) {
			this.El.innerHTML += this.items[i].html
		}
		if (this.items.length <= 0) {
			this.El.innerHTML = '<p class="cart-alt">No Items...</p>'
			this.checkoutEl.disabled = true
		}
	}
}

let cart = new Cart({
	el: App.cartEl,
	counterEl: App.counterEl,
	checkoutEl: App.checkoutEl,
})
foreach(App.addBtns, addBtn => {
	addBtn.addEventListener('click', ()=> {
		let itemEl = addBtn.parentElement
		let item = {
			img: qsEl(itemEl, '.img > img').getAttribute('src'),
			title: qsEl(itemEl, '.desc > h6').innerText,
			price: qsEl(itemEl, '.desc > p > span').innerText,
		}
		cart.add(item)
	})
})
foreach(App.delBtns, delBtn => {
	delBtn.addEventListener('click', ()=> {
		console.log(delBtn.getAttribute('data-cart-id'));
		cart.remove(delBtn.getAttribute('data-cart-id') * 1)
	})
})

window.remCartItem = (delBtn) => {
	cart.remove(delBtn.getAttribute('data-cart-id') * 1)
}
window.cart = cart