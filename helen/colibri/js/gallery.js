
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

var reviewsGalleryEl = document.querySelector(".reviews-inner");
var reviewsGallery = document.querySelector(".reviews-inner");
var reviewsHammer;

var overview1GalleryEl = document.querySelector(".overview--1 .overview-items");
var overview1Gallery = document.querySelector(".overview--1 .overview-items");
var overview1Hammer;

var overview2GalleryEl = document.querySelector(".overview--2 .overview-items");
var overview2Gallery = document.querySelector(".overview--2 .overview-items");
var overview2Hammer;

var cardGalleryEls = document.querySelectorAll(".card-gallery .items");
var cardGalleries = document.querySelectorAll(".card-gallery .items");
// var cardHammer;

$(document).ready(function() {
    overview1Gallery = new OverviewGallery(overview1GalleryEl,function(index, total) {});

    overview1GalleryEl.addEventListener("dragstart", function(e) {
        e.preventDefault();
    });

    $(".overview--1 .overviews-btns .prev").on("click", function(e) {
        overview1Gallery.prev();
    });

    $(".overview--1 .overviews-btns .next").on("click", function(e) {
        overview1Gallery.next();
    });


    overview1Hammer = new Hammer(overview1GalleryEl,{
        recognizers: [[Hammer.Swipe, {
            direction: Hammer.DIRECTION_HORIZONTAL
        }]]
    });

    overview1Hammer.on("swipeleft", function() {

        overview1Gallery.next();
    });

    overview1Hammer.on("swiperight", function() {
        overview1Gallery.prev();
    });

    // --------------------------------------------------


    overview2Gallery = new OverviewGallery(overview2GalleryEl,function(index, total) {});

    $(".overview--2 .overviews-btns .prev").on("click", function(e) {
        console.log(1)
        overview2Gallery.prev();
    });

    $(".overview--2 .overviews-btns .next").on("click", function(e) {
        console.log(1)
        overview2Gallery.next();
    });


    overview2GalleryEl.addEventListener("dragstart", function(e) {
        e.preventDefault();
    });

    overview2Hammer = new Hammer(overview2GalleryEl,{
        recognizers: [[Hammer.Swipe, {
            direction: Hammer.DIRECTION_HORIZONTAL
        }]]
    });

    overview2Hammer.on("swipeleft", function() {
        overview2Gallery.next();
    });

    overview2Hammer.on("swiperight", function() {
        overview2Gallery.prev();
    });

    // --------------------------------------------------

    for (var i = 0; i < cardGalleryEls.length; i++) {
        var cardGalleryEl = cardGalleryEls[i];
        let cardGallery = cardGalleries[i];
        var cardHammer;

        cardGallery = new OverviewGallery(cardGalleryEl,function(index, total) {});
        //
        cardGalleryEl.addEventListener("dragstart", function(e) {
            e.preventDefault();
        });

        console.log(cardGalleryEl);

        $(".slides-btns .prev", $(cardGalleryEl).closest(".card-gallery")).on("click", function(e) {
            cardGallery.prev();
        });

        $(".slides-btns .next", $(cardGalleryEl).closest(".card-gallery")).on("click", function(e) {
            cardGallery.prev();
        });

        cardHammer = new Hammer(cardGalleryEl,{

            recognizers: [[Hammer.Swipe, {
                direction: Hammer.DIRECTION_HORIZONTAL
            }]]
        });

        cardHammer.on("swipeleft", function() {
            console.log(cardGallery)
            cardGallery.next();
        });

        cardHammer.on("swiperight", function() {
            console.log(1)
            cardGallery.prev();
        });
    }


    // ----------------------------------------------------

    reviewsGallery = new OverviewGallery(reviewsGalleryEl,function(index, total) {});

    $(".reviews-btns .prev").on("click", function(e) {
        reviewsGallery.prev();
    });

    $(".reviews-btns .next").on("click", function(e) {
        reviewsGallery.next();
    });

    if ($(window).width() > 1365) {

        reviewsHammer = new Hammer(reviewsGalleryEl,{
            recognizers: [[Hammer.Swipe, {
                direction: Hammer.DIRECTION_VERTICAL
            }]]
        });

        reviewsHammer.on("swipeup", function() {
            reviewsGallery.next();
        });

        reviewsHammer.on("swipedown", function() {
            reviewsGallery.prev();
        });
    } else {
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
    }



});

