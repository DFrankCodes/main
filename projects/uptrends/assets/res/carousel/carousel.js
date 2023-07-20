import * as helper from "../helper.js";
const { qs, qsEl, navList, isElement, isVisible } = helper;
export class SlidingCarousel {
  constructor(el, config) {
    this.El = el;
    this.items = new navList(qsEl(el, ".scarousel-item", true));
    this.isSliding = false;
    this.isPaused = false;
    this.isCycling = false;
    this.config = config;
    this.loadIndicators();
    this.updateItemsState();
    this.updateIndicatorsState();
    this.disperseEvents();
    if (!this.config.canWrap) this.config.canCycle = false;
  }
  loadIndicators() {
    let indicatorBox = qsEl(this.El, ".scarousel-indicators");
    let newIndicator = () => {
      let indicator = document.createElement("button");
      indicator.setAttribute("type", "button");
      indicator.classList.add(".scarousel-indicator");
      return indicator;
    };
    for (let i = 0; i < this.items.length; i++) {
      indicatorBox.appendChild(newIndicator());
    }

    this.indicators = new navList(qsEl(this.El, ".scarousel-indicator", true));
  }
  next() {
    if (this.items.next) {
      if (!this.isSliding) {
        // if (this.items.nextIndex <= 0) {
        //   console.log("Going to First Carousel Item!");
        // }
        this.isSliding = true;

        if (!isVisible(this.items.next)) return;
        this.slideTo(this.items.next);
        this.items.active.classList.remove("active");
        this.indicators.active.classList.remove("active");
        this.items.next.classList.add("active");
        this.indicators.next.classList.add("active");
        this.updateItemsState();
        this.updateIndicatorsState();
        this.isSliding = false;
      }
    }
    return;
  }
  prev() {
    if (this.items.prev) {
      if (!this.isSliding) {
        // if (this.items.prevIndex + 1 >= this.items.list.length) {
        //   console.log("Go to Last Carousel Item!");
        // }

        this.isSliding = true;
        if (!isVisible(this.items.prev)) return;
        this.slideTo(this.items.prev);
        this.items.active.classList.remove("active");
        this.indicators.active.classList.remove("active");
        this.items.prev.classList.add("active");
        this.indicators.prev.classList.add("active");
        this.updateItemsState();
        this.updateIndicatorsState();
        this.isSliding = false;
      }
    }
    return;
  }
  cycle() {
    if (this.config.canCycle) {
      this.isCycling = true;
      clearTimeout(this.cycler);
      this.cycler =
        typeof this.cycler == "object"
          ? this.cycler
          : setTimeout(() => {
              if (!this.isPaused) {
                this.cycle();
              }
            }, this.config.interval * 1000);

      this.El.addEventListener(this.config.pause, () => {
        this.isPaused = true;
        clearTimeout(this.cycler);
      });
      this.El.addEventListener(this.config.play, () => {
        this.isPaused = false;
        clearTimeout(this.cycler);

        this.cycler = setTimeout(() => {
          if (!this.isPaused) {
            this.next();
            this.cycle();
          }
        }, this.config.interval * 1000);
      });
    }
  }
  slideTo(item) {
    if (!item) return;
    item.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  updateItemsState() {
    this.items.active = qsEl(this.El, ".scarousel-item.active");
    this.items.activeIndex = this.items.getIndex(this.items.active);
    this.items.nextIndex = this.items.nav("next");
    this.items.next = this.items.getItem(this.items.nextIndex);
    this.items.prevIndex = this.items.nav("prev");
    this.items.prev = this.items.getItem(this.items.prevIndex);
  }
  updateIndicatorsState() {
    this.indicators.active = qsEl(this.El, ".scarousel-indicator.active");
    this.indicators.activeIndex = this.indicators.getIndex(
      this.indicators.active
    );
    this.indicators.nextIndex = this.indicators.nav("next");
    this.indicators.next = this.indicators.getItem(this.indicators.nextIndex);
    this.indicators.prevIndex = this.indicators.nav("prev");
    this.indicators.prev = this.indicators.getItem(this.indicators.prevIndex);
  }
  disperseEvents() {
    qsEl(this.El, "button.scarousel-control-prev").addEventListener(
      "click",
      () => this.prev()
    );
    qsEl(this.El, "button.scarousel-control-next").addEventListener(
      "click",
      () => this.next()
    );

    //For keyboard Controls
    if (this.config.keyboard) {
      this.El.addEventListener("click", () => {
        document.addEventListener("keypress", (e) => {
          console.log(e.key);
          if (e.key == "left") {
            this.prev();
          }
          if (e.key == "right") {
            this.next();
          }
        });
      });
    }
    //For Swiping
    if (this.config.touch) {
      let touch = {};
      this.El.addEventListener("touchstart", (e) => {
        touch.start = e.touches[0];
      });
      this.El.addEventListener("touchend", (e) => {
        touch.end = e.changedTouches[0];
        if (touch.start.force > 0.05) {
          if (this.isCycling) {
            this.isPaused = true;
          }
          if (touch.start.clientX < touch.end.clientX) {
            this.prev();
          } else if (touch.start.clientX > touch.end.clientX) {
            this.next();
          }
          if (this.isCycling) this.isPaused = false;
          if (this.isCycling) this.cycle(this.El);
        }
      });
    }
  }
}
export class FadingCarousel {
  constructor(el, config) {
    this.El = el;
    this.items = new navList(qsEl(el, ".fcarousel-item", true));
    this.itemBox = new navList(qsEl(el, ".fcarousel-inner", true));
    this.indicators = new navList(qsEl(el, ".fcarousel-indicator", true));
    this.isSliding = false;
    this.isPaused = false;
    this.isCycling = false;
    this.cycler = null;
    this.config = config;
    this.updateItemsState();
    this.updateIndicatorsState();
    this.disperseEvents();
    if (!this.config.canWrap) this.config.canCycle = false;
    if (this.config.canWrap) this.config.canCycle = true;
  }
  next() {
    if (this.items.next) {
      if (!this.isSliding) {
        // if (this.items.nextIndex <= 0) {
        //   console.log("Going to First Carousel Item!");
        // }
        this.isSliding = true;

        if (!isElement(this.items.next)) return;
        this.fadeTo(this.items.next, () => {
          this.items.active.classList.remove("active");
          this.indicators.active.classList.remove("active");
          this.items.next.classList.add("active");
          this.indicators.next.classList.add("active");
          this.updateItemsState();
          this.updateIndicatorsState();
          this.isSliding = false;
        });
      }
    }
    return;
  }
  prev() {
    if (this.items.prev) {
      if (!this.isSliding) {
        // if (this.items.prevIndex + 1 >= this.items.list.length) {
        //   console.log("Go to Last Carousel Item!");
        // }

        this.isSliding = true;
        if (!isElement(this.items.prev)) return;
        this.fadeTo(this.items.prev, () => {
          this.items.active.classList.remove("active");
          this.indicators.active.classList.remove("active");
          this.items.prev.classList.add("active");
          this.indicators.prev.classList.add("active");
          this.updateItemsState();
          this.updateIndicatorsState();
          this.isSliding = false;
        });
      }
    }
    return;
  }
  cycle() {
    if (this.config.canCycle && !this.isPaused) {
      this.isCycling = true;
      // this.cycler = this.cycler
      //   ? this.cycler
      //   :
      clearTimeout(this.cycler);
      setTimeout(() => {
        if (!this.isPaused) {
          this.next();
          this.cycle();
        }
      }, this.config.interval * 1000);
    }

    this.El.addEventListener(this.config.pause, () => {
      this.isPaused = true;
    });
    this.El.addEventListener(this.config.play, () => {
      this.isPaused = false;
      clearTimeout(this.cycler);
      this.cycler = setTimeout(() => {
        if (!this.isPaused) {
          this.next();
          this.cycle();
        }
      }, this.config.interval * 1000);
    });
  }
  fadeTo(item, fn) {
    if (!item) return;
    this.items.active.style.opacity = "0";
    this.items.active.ontransitionend = () => {
      fn();
      this.items.active.style.opacity = "1";
    };
  }

  updateItemsState() {
    this.items.active = qsEl(this.El, ".fcarousel-item.active");
    this.items.activeIndex = this.items.getIndex(this.items.active);
    this.items.nextIndex = this.items.nav("next", "wrap");
    this.items.next = this.items.getItem(this.items.nextIndex);
    this.items.prevIndex = this.items.nav("prev", "wrap");
    this.items.prev = this.items.getItem(this.items.prevIndex);
  }
  updateIndicatorsState() {
    this.indicators.active = qsEl(this.El, ".fcarousel-indicator.active");
    this.indicators.activeIndex = this.indicators.getIndex(
      this.indicators.active
    );
    this.indicators.nextIndex = this.indicators.nav("next", "wrap");
    this.indicators.next = this.indicators.getItem(this.indicators.nextIndex);
    this.indicators.prevIndex = this.indicators.nav("prev", "wrap");
    this.indicators.prev = this.indicators.getItem(this.indicators.prevIndex);
  }
  disperseEvents() {
    qsEl(this.El, "button.fcarousel-control-prev").addEventListener(
      "click",
      () => {
        if (this.canCycle) this.isPaused = true;
        this.prev();
        if (this.isPaused) this.isPaused = false;
      }
    );
    qsEl(this.El, "button.fcarousel-control-next").addEventListener(
      "click",
      () => {
        if (this.canCycle) this.isPaused = true;
        this.next();
        if (this.isPaused) this.isPaused = false;
      }
    );

    //For keyboard Controls
    if (this.config.keyboard) {
      this.El.addEventListener("click", () => {
        document.addEventListener("keypress", (e) => {
          console.log(e.key);
          if (e.key == "left") {
            this.prev();
          }
          if (e.key == "right") {
            this.next();
          }
        });
      });
    }
    //For Swiping
    if (this.config.touch) {
      let touch = {};
      this.El.addEventListener("touchstart", (e) => {
        touch.start = e.touches[0];
      });
      this.El.addEventListener("touchend", (e) => {
        touch.end = e.changedTouches[0];
        if (Math.abs(touch.start.clientY - touch.end.clientY) <= 25) {
          if (touch.start.force > 0.05) {
            if (this.isCycling) {
              this.isPaused = true;
            }
            if (touch.start.clientX < touch.end.clientX) {
              this.prev();
            } else if (touch.start.clientX > touch.end.clientX) {
              this.next();
            }
            if (this.isCycling) this.isPaused = false;
            if (this.isCycling) this.cycle(this.El);
          }
        }
      });
    }
  }
}
export class ManualCarousel {
  constructor(config) {
    this.El = qs(".mcarousel");
    this.items = new navList(qsEl(this.El, ".mcarousel-item", true));
    this.itemBox = qs(".mcarousel-inner");
    this.isSliding = false;
    this.config = config;
    this.updateItemsState();
    this.disperseEvents();
    this.i = 0;
    this.coord = {
      x: 0,
      y: 0,
    };
  }
  next() {
    if (!this.isSliding) {
      // if (this.items.nextIndex <= 0) {
      //   console.log("Going to First Carousel Item!");
      // }
      this.isSliding = true;
      this.slide("next", () => {
        this.updateItemsState();
        this.isSliding = false;
      });
    }
    return;
  }
  prev() {
    if (!this.isSliding) {
      // if (this.items.prevIndex + 1 >= this.items.list.length) {
      //   console.log("Go to Last Carousel Item!");
      // }
      this.isSliding = true;
      this.slide("prev", () => {
        this.updateItemsState();
        this.isSliding = false;
      });
    }
    return;
  }

  slide(dir, fn) {
    if (!fn) return;
    if (dir == "next") {
      this.coord.x = ++this.i * this.config.slideWidth;
      this.itemBox.scroll(this.coord.x, this.coord.y);
    }
    if (dir == "prev") {
      this.coord.x = --this.i * this.config.slideWidth;
      this.itemBox.scroll(this.coord.x, this.coord.y);
    }
    fn();
  }
  updateItemsState() {
    console.log("Updated Items State.");
  }
  disperseEvents() {
    qsEl(this.El, "button.mcarousel-control-prev").addEventListener(
      "click",
      () => this.prev()
    );
    qsEl(this.El, "button.mcarousel-control-next").addEventListener(
      "click",
      () => this.next()
    );

    //For keyboard Controls
    if (this.config.keyboard) {
      this.El.addEventListener("click", () => {
        document.addEventListener("keypress", (e) => {
          console.log(e.key);
          if (e.key == "left") {
            this.prev();
          }
          if (e.key == "right") {
            this.next();
          }
        });
      });
    }
  }
}