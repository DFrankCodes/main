import * as helper from '../res/helper.js';
const {
	qs,
	qsEl,
	foreach
} = helper;
const App = {}
export default App;
App.cartEl = qs('.cart .tooltip .tooltip-body')
App.counterEl = qs('.cart .items')
App.checkoutEl = qs('.cart .tooltip .tooltip-foot .checkout')
App.addBtns = qs('#featured .product #addBtn', true)
App.delBtns = qsEl(App.cartEl, '.item #delBtn', true)