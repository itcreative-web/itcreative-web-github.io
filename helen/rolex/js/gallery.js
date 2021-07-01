var gallerySlider;
var galleryHammer;
var galleryElement = document.querySelector(".privilege-slider .slides");

var reviewsSlider;
var reviewsHammer;
var reviewsElement = document.querySelector(".reviews-slides .slides");

$(document).ready(function() {
    galleryElement = document.querySelector(".privilege-slider .slides");
    galleryElement.addEventListener("dragstart", function(e) {
        e.preventDefault();
    });

    gallerySlider = new GalleryCarousel(galleryElement, function(index, total) {
        $(".privilege-slider .dots .dot").removeClass("active");
        $(".privilege-slider .dots .dot").eq(index).addClass("active");
    });

    for (var i = 0; i < galleryElement.querySelectorAll(".slide").length; i++) {
        $(".privilege-slider .dots").append(
            $("<span>", {"class": "dot " + (i === 0 ? "active" : "")})
        );
        $(".privilege-slider .dots .dot").eq(i).text(pad(i + 1))
    }

    $(".privilege-slider .dots .dot").click(function(e) {
        console.log(444)
        gallerySlider.setCurrent($(e.target).index())
    });

    if ($(window).width() <= 1024 ) {
        galleryHammer = new Hammer(galleryElement, {
            recognizers: [
                [Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}]
            ]
        });

        galleryHammer.on("swipeleft", function() {
            gallerySlider.next();
        });

        galleryHammer.on("swiperight", function() {
            gallerySlider.prev();
        });
    }


    $(".privilege-slider .prev").click(function() {
        gallerySlider.prev();
    });

    $(".privilege-slider .next").click(function() {
        gallerySlider.next();
    });

    if (window.innerWidth > 1024) {
        var privilegeContainner = $(".js-privilege-wrapper");
        var privilegeSlidesCount = $(".privilege-slider .slides .slide").length;

        fixedElementScroll(privilegeContainner, privilegeSlidesCount, 650);

        function fixedElementScroll(wrapper, slidesCount, slideRange) {
            var $container = $(".js-privilege-inner", wrapper);
            var containerTop = $container.offset().top;

            var func = function() {

                if (window.innerWidth > 1024) {

                }

                var containerHeight = $container.outerHeight();
                var windowScrollTop = $(window).scrollTop();
                var scrollTopFromParent = windowScrollTop - containerTop;
                var slideIndex = Math.floor(scrollTopFromParent / slideRange);
                slideIndex = Math.max(slideIndex, 0);
                slideIndex = Math.min(slideIndex, slidesCount - 1);

                if (scrollTopFromParent >= 0) {
                    $container.addClass("fixed");
                    wrapper.height(containerHeight + (privilegeSlidesCount * slideRange));

                    gallerySlider.setCurrent(slideIndex);

                    var max = containerTop + (slidesCount * slideRange);
                    if (windowScrollTop >= max) {
                        $container.css("top", (windowScrollTop-max) * -1);
                    } else {
                        $container.css("top", "");
                    }
                } else {
                    $container.removeClass("fixed");
                }
            };

            $(window).on("scroll resize", func);
        }
    }

    // ----------------------------------------------------------------------------------------------------

    // reviewsElement = document.querySelector(".reviews-slides");
    // reviewsElement.addEventListener("dragstart", function(e) {
    //     e.preventDefault();
    // });
    //
    // reviewsSlider = new GalleryCarousel(reviewsElement, function(index, total) {
    //     $(".reviews-slides .dots .dot").removeClass("active");
    //     $(".reviews-slides .dots .dot").eq(index).addClass("active");
    // });
    //
    // console.log(galleryElement)
    //
    // for (var i = 0; i < galleryElement.querySelectorAll(".slide").length; i++) {
    //     console.log($(".reviews-slides .dots"))
    //     $(".reviews-nav .dots").append(
    //         $("<span>", {"class": "dot " + (i === 0 ? "active" : "")})
    //     );
    //     $(".reviews-nav .dots .dot").eq(i).text(pad(i + 1))
    // }
    //
    // $(".reviews-nav .prev").click(function() {
    //     reviewsSlider.prev();
    // });
    //
    // $(".reviews-nav .next").click(function() {
    //     reviewsSlider.next();
    // });

});


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