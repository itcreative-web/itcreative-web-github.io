var overviewGalleryEl = document.querySelector(".overview-gallery__slides");
var overviewGallery = document.querySelector(".overview-gallery");
var overviewHammer;

var reviewsGalleryEl = document.querySelector(".reviews-content");
var reviewsGallery = document.querySelector(".reviews-content");
var reviewsHammer;

function OverviewGallery(el, changedCallback) {
    this.el = el;
    this.slides = el.querySelectorAll(".slide");
    this.index = 0;
    this.changedCallback = changedCallback;

    this.update();
}

OverviewGallery.prototype.next = function() {
    if (this.index + 1 >= this.slides.length) {
        this.index = 0;
    } else {
        this.index++;
    }

    this.update();
};

OverviewGallery.prototype.prev = function() {
    if (this.index - 1 < 0) {
        this.index = this.slides.length - 1;
    } else {
        this.index--;
    }

    this.update();
};

OverviewGallery.prototype.update = function() {
    var nextIndex = (this.index === this.slides.length - 1) ? 0 : this.index + 1;
    var postNextIndex = (nextIndex === this.slides.length - 1) ? 0 : nextIndex + 1;
    var prevIndex = (this.index === 0) ? this.slides.length - 1 : this.index - 1;
    var prePrevIndex = (prevIndex === 0) ? this.slides.length - 1 : prevIndex - 1;

    $(".current-count").text(pad(this.index + 1));

    for (var i = 0; i < this.slides.length; i++) {
        this.slides[i].classList[i === this.index ? "add" : "remove"]("active");
        this.slides[i].classList[i === nextIndex ? "add" : "remove"]("next");
        // this.slides[i].classList[i === postNextIndex ? "add" : "remove"]("post-next");
        this.slides[i].classList[i === prevIndex ? "add" : "remove"]("prev");
        // this.slides[i].classList[i === prePrevIndex ? "add" : "remove"]("pre-prev");
    }

    if (typeof this.changedCallback === "function") {
        this.changedCallback.call(this, this.index, this.slides.length);
    }
}

function pad(num) {
    return ("0" + num).substr(-2);
}

//
$(document).ready(function() {
    overviewGallery = new OverviewGallery(overviewGalleryEl,function(index, total) {
            // $(".overview-gallery .current-index").text(pad(index + 1));
            // $(".overview-gallery .all-index").text(pad(total));

            $(".current-count", overviewGalleryEl).text(pad(this.index + 1));
            $(".total-count", overviewGalleryEl).text(pad(this.slides.length));
        }
    );

    $(".overview-btns").on("click", function(e) {
        console.log(12)

        if ($(e.target).is(".prev")) {
            overviewGallery.prev();
        } else {
            overviewGallery.next();
        }
    });

    overviewGalleryEl.addEventListener("dragstart", function(e) {
        e.preventDefault();
    });

    overviewHammer = new Hammer(overviewGalleryEl,{
        recognizers: [[Hammer.Swipe, {
            direction: Hammer.DIRECTION_HORIZONTAL
        }]]
    });

    overviewHammer.on("swipeleft", function() {
        overviewGallery.next();
    });

    overviewHammer.on("swiperight", function() {
        overviewGallery.prev();
    });

// -----------------------------------------------------------------------------------

    reviewsGallery = new OverviewGallery(reviewsGalleryEl,function(index, total) {
            // $(".overview-gallery .current-index").text(pad(index + 1));
            // $(".overview-gallery .all-index").text(pad(total));

            $(".reviews-slides-counts .current-slide").text(pad(index + 1));
            $(".reviews-slides-counts .all-slides").text(pad(total));

            $(".current-count", overviewGalleryEl).text(pad(this.index + 1));
            $(".total-count", overviewGalleryEl).text(pad(this.slides.length));
        }
    );

    $(".reviews-btns").on("click", function(e) {
        if ($(e.target).is(".prev")) {
            reviewsGallery.prev();
        } else {
            reviewsGallery.next();
        }
    });

    reviewsGalleryEl.addEventListener("dragstart", function(e) {
        e.preventDefault();
    });

    reviewsHammer = new Hammer(reviewsGalleryEl,{
        recognizers: [[Hammer.Swipe, {
            direction: Hammer.DIRECTION_HORIZONTAL
        }]]
    });

    reviewsHammer.on("swipeleft", function() {
        reviewsGallery.next();
    });

    reviewsHammer.on("swiperight", function() {
        reviewsGallery.prev();
    });

});


