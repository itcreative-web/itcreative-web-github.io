var galleryElement = document.querySelector(".privilege-slider");
var gallerySlider;

var overviewElement = document.querySelector(".overview-slides");
var overviewSlider;
var overviewHammer;

function debounce(name, delay, func) {
    window.appDebounceTimers = window.appDebounceTimers || {};
    clearTimeout(window.appDebounceTimers[name]);
    window.appDebounceTimers[name] = setTimeout(func, delay);
}

function dynamicGalleryOwl(name) {
    console.log("slider init");

    var func = function() {
        if ($(window).width() > 1199) {
            gallerySliderCustomDestroy();
            $(".privilege-slider").trigger('destroy.owl.carousel');

            gallerySliderCustomInit();
        } else {
            gallerySliderCustomDestroy();
            $(".privilege-slider").trigger('destroy.owl.carousel');

            gallerySliderOwlInit();
        }
    }

    func();

    $(window).on("resize", function() {
        debounce("dynamicGalleryOwl_" + name, 100, func);
    });
}

function gallerySliderCustomInit() {
    galleryElement = document.querySelector(".privilege-slider");
    galleryElement.addEventListener("dragstart", function(e) {
        e.preventDefault();
    });

    gallerySlider = new GalleryCarousel(galleryElement, function(index, total) {
        $(".privilege-dots .dot").removeClass("active");
        $(".privilege-dots .dot").eq(index).addClass("active");
    });

    $(".privilege-slider").addClass("js-custom-slider");

    for (var i = 0; i < galleryElement.querySelectorAll(".slide").length; i++) {
        $(".privilege-dots").append(
            $("<span>", {"class": "dot " + (i === 0 ? "active" : "")})
        );
    }

    $(".privilege-dots .dot").on("click", function(e) {
        if ($(e.target).closest(".dot").length > 0) {
            gallerySlider.setIndex($(e.target).closest(".dot").index());
        }
    })

    $(".privilege-slider .slide").on("click", function(e) {
        if ($(e.target).closest(".slide").length > 0) {
            gallerySlider.setIndex($(e.target).closest(".slide").index());
        }
    });

    galleryHammer = new Hammer(galleryElement, {
        recognizers: [
            [Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}]
        ]
    });

    galleryHammer.on("swipeleft", function() {
        console.log("swipeleft")
        gallerySlider.next();
    });

    galleryHammer.on("swiperight", function() {
        console.log("swiperight")
        gallerySlider.prev();
    });
}

function gallerySliderCustomDestroy() {
    console.log("custom slider destroy");

    if ($(".privilege-slider").hasClass("js-custom-slider")) {
        galleryHammer.destroy();
    }

    $(".privilege-dots").text("");
    $(".privilege-slider .slide").removeClass("active");
    $(".privilege-slider .slide").removeClass("prev");
    $(".privilege-slider .slide").removeClass("next");

    $(".privilege-dots .dot").off();
    $(".privilege-slider .slide").off();

    // galleryHammer.off();
}

function gallerySliderOwlInit() {
    console.log("gallery owl init");

    $(".privilege-slider").addClass("owl-carousel");
    $(".privilege-slider").owlCarousel({
        items: 3,
        loop: true,
        responsive: {
            0: {
                items: 1,
                center: true,
                margin: 0
            },
            480: {
                items: 2,
                center: false,
                margin: 10
            },
            992: {
                items: 3,
                center: true,
                margin: 0
            }
        }
    })
}

$(document).ready(function() {
    dynamicGalleryOwl("privilege");

    overviewElement = document.querySelector(".overview-slides");
    overviewElement.addEventListener("dragstart", function(e) {
        e.preventDefault();
    });

    overviewSlider = new GalleryCarousel(overviewElement, function(index, total) {
        $(".overview-dots .dot").removeClass("active");
        $(".overview-dots .dot").eq(index).addClass("active");
    });

    for (var i = 0; i < $(".overview-slides .slide").length; i++) {
        $(".overview-dots").append(
            $("<span>", {"class": "dot " + (i === 0 ? "active" : "")})
        );
    }

    overviewHammer = new Hammer(overviewElement, {
        recognizers: [
            [Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}]
        ]
    });


    overviewHammer.on("swipeleft", function() {
        console.log("swipe")
        overviewSlider.next();
    });

    overviewHammer.on("swiperight", function() {
        console.log("swipe")
        overviewSlider.prev();
    });


});

function GalleryCarousel(el, changedCallback) {
    this.el = el;
    this.slides = el.querySelectorAll(".slide");
    this.index = 0;
    this.changedCallback = changedCallback;

    this.update();
}

GalleryCarousel.prototype.next = function() {
    console.log(this.index)

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

GalleryCarousel.prototype.update = function() {
    var nextIndex = (this.index === this.slides.length - 1) ? 0 : this.index + 1;
    var prevIndex = (this.index === 0) ? this.slides.length - 1 : this.index - 1;
    for (var i = 0; i < this.slides.length; i++) {
        this.slides[i].classList[i === this.index ? "add" : "remove"]("active")
        this.slides[i].classList[i === nextIndex ? "add" : "remove"]("next")
        this.slides[i].classList[i === prevIndex ? "add" : "remove"]("prev")
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
