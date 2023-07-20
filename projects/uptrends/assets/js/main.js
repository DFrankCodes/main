import * as carousel from "../res/carousel/carousel.js";
import * as helper from "../res/helper.js";
import * as ws from "./wait-screen.js";
import * as tooltip from "./tooltip.js";
import {Cart, Product} from "./cart.js";
import App from './app.js';

const { ManualCarousel } = carousel;
const { qs, qsEl, navList } = helper;
let productsCarousel = new ManualCarousel({
  keyboard: true,
  slideWidth: qs(".mcarousel-item.product").clientWidth,
});