import * as helper from '../res/helper.js';
import App from './app.js';
const {
	qs,
	qsEl,
	foreach,
	log,
	arrSearch
} = helper;

export class Tooltip {
	constructor() {
		this.El = qs('.tooltip');
		this.openEl = qs('.cart');
		this.closeEls = qsEl(this.El, '[data-class="tooltip-close"]', true);
		this.disperseEvents();
	}

	close () {
		this.El.classList.remove('active');
	}
	open () {
		this.El.classList.add('active');
	}
	disperseEvents() {
		this.openEl.addEventListener('click', (e)=> {
			if (arrSearch(e.composedPath(), this.El) === false) {
				this.open();
			}
			foreach(this.closeEls,
				closeEl => {
					closeEl.addEventListener('click',
						(e) => {
							this.close();
						});
				});
			document.addEventListener('click', (e)=> {
				if (arrSearch(e.composedPath(), this.El) === false && arrSearch(e.composedPath(), this.openEl) === false) {
					this.close();
				}
			})
		})
	}
}

export const tooltip = new Tooltip;