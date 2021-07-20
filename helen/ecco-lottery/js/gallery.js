
function pad(num) {
    return ("0" + num).substr(-2);
}

function GalleryCarousel(el, changedCallback) {
    this.el = el;
    this.slides = el.querySelectorAll(".slide");
    this.index = 0;
    this.changedCallback = changedCallback;

    this.update();
}

GalleryCarousel.prototype.next = function() {

    this.index++;
    if (this.index >= this.slides.length) {
        this.index = 0;
    }

    this.update();
};

GalleryCarousel.prototype.prev = function() {
    this.index--;
    if (this.index < 0) {
        this.index = this.slides.length - 1;
    }

    this.update();
};

GalleryCarousel.prototype.setCurrent = function(index) {
    this.index = Math.max(index, 0);
    this.index = Math.min(this.index, this.slides.length - 1);

    this.update();
};

GalleryCarousel.prototype.update = function() {

    var nextIndex = (this.index === this.slides.length - 1) ? 0 : this.index + 1;
    var prevIndex = (this.index === 0) ? this.slides.length - 1 : this.index - 1;

    for (var i = 0; i < this.slides.length; i++) {
        this.slides[i].classList[i === this.index ? "add" : "remove"]("active")
        // this.slides[i].classList[i === nextIndex ? "add" : "remove"]("next")
        // this.slides[i].classList[i === prevIndex ? "add" : "remove"]("prev")
    }

    if (typeof this.changedCallback === "function") {
        this.changedCallback.call(this, this.index, nextIndex);
    }
};

GalleryCarousel.prototype.setIndex = function(index) {
    if (index < 0) {
        index = 0;
    } else if (index > this.slides.length - 1) {
        index = this.slides.length - 1;
    }

    this.index = index;
    this.update();
};