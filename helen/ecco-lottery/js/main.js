var overviewOwl =  $(".overview");
// var productMainOwl =  $(".main-product-gallery");
var reviewsOwl =  $(".reviews-content");

var overviewGallerySlider;
var overvieGwalleryHammer;
var overvieGwalleryMiniHammer;
var overvieGwalleries = document.querySelectorAll(".main-product-gallery .gallery-inner")
var overvieGwalleryElements = document.querySelectorAll(".main-product-gallery .gallery-inner")
var overvieGwalleryElement;

$(document).ready(function() {
    // $.fancybox.defaults.animationEffect = "fade";
    // $.fancybox.defaults.infobar = false;
    // $.fancybox.defaults.loop = true;

    $(".sizes .size").click(function(e) {
        var currentSize = $(e.target).closest(".size");

        if (currentSize.length > 0) {
            $(".size", $(this).closest(".sizes")).removeClass("active");
            currentSize.addClass("active");
        }
    });

    $(".colors-box").click(function (e) {
        e.preventDefault();

        var currentItem = $(e.target).closest(".color");
        var currentIndex = currentItem.index();

        if (currentItem.length > 0) {
            $(".color", this).removeClass("active");
            currentItem.addClass("active");

            $(".product-gallery-box", $(this).closest(".product-content")).removeClass("active");

            $(this).closest(".product-content").find(".product-gallery-box-" + currentItem.data("color")).addClass("active");
        }
    })

    overviewOwl.owlCarousel({
        responsive: {
            320: {
                loop: true,
                items: 1,
                dots: true,
            },
            480: {

                loop: true,
                items: 2,
                dots: true,
            },

            768: {
                loop: true,
                items: 3,
                dots: true,

            },
            1365: {
                loop: false,
                items: 4,
            }
        }
    });

    reviewsOwl.owlCarousel({

        responsive: {
            320: {
                items: 1,
                loop: true,
                margin: 20,
            },
            992: {
                items: 2,
                loop: true,
                margin: 20,
            },
            1365: {
                items: 3,
                loop: true,
                margin: 20,
            }
        }
    });

    for (var i = 0; i < overvieGwalleries.length; i++) {
        overvieGwalleryElement = overvieGwalleries[i];

        var overvieGwalleryElement = overvieGwalleries[i];
        let overvieGwallery = overvieGwalleryElements[i];

        overvieGwalleryElement.addEventListener("dragstart", function(e) {
            e.preventDefault();
        });

        overvieGwallery = new GalleryCarousel(overvieGwalleryElement, function(index, total) {
            var miniGal = $(this.el).closest(".product-gallery-box").find(".mini-product-gallery .gallery-inner");

            $(".item", miniGal).removeClass("active");
            $(".item", miniGal).eq(index).addClass("active")

            $(".gallery-dots .dot", overvieGwalleryElement).removeClass("active");
            $(".gallery-dots .dot", overvieGwalleryElement).eq(index).addClass("active");

            $(".gallery-dots .dot", overvieGwalleryElement).removeClass("active");
            $(".gallery-dots .dot", overvieGwalleryElement).eq(index).addClass("active");
        });

        $(".item", $(overvieGwallery.el).closest(".product-gallery-box").find(".mini-product-gallery .gallery-inner")).click(function(e) {
            e.preventDefault();

            var currentItem = $(e.target).closest(".item");
            $(".item", $(this).closest(".mini-product-gallery .gallery-inner")).removeClass("active");
            currentItem.addClass("active");
            var currentIndex = currentItem.index();
            overvieGwallery.setIndex(currentIndex)
        })

        // console.log(overvieGwalleryElement)
        // $(overvieGwalleryElement).each(function (index, item) {
        //     var slidesLength = $(item).closest(".main-product-gallery .slide").length;
        //
        //     console.log(item)
        //
        //     // slidesLength.each(function (index2, item2) {
        //         // $(item).closest(".main-product-gallery").find(".gallery-dots").append(
        //         //     $("<span>", {"class": "dot " + (i === 0 ? "active" : "")})
        //         // );
        //     // })
        //
        //     $(item).closest(".main-product-gallery").find(".gallery-dots");
        // })

        var slides = $(overvieGwalleryElement).find(".slide");
        var dotsContainer = $(overvieGwalleryElement).parent().find(".gallery-dots");
        for (var j = 0; j < slides.length; j++) {
            var dot = $("<div class='dot' data-index='"+j+"'></div>");
            if (j === 0) {
                dot.addClass("active");
            }

            dotsContainer.append(dot);
        }

        $(".overview-gallery-wrapper .dots .dot").click(function(e) {
            overviewGallerySlider.setCurrent($(e.target).index());
        });

        overvieGwalleryHammer = new Hammer(overvieGwalleryElement, {
            recognizers: [
                [Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}]
            ]
        });

        overvieGwalleryHammer.on("swipeleft", function() {
            overvieGwallery.next();
        });

        overvieGwalleryHammer.on("swiperight", function() {
            overvieGwallery.prev();
        });
    }

    var windowWidth = $(window).width();

    orderFormMoving()

    $(window).resize(function() {
        orderFormMoving();
    })

    if (localStorage.getItem("lotteryRotated")) {
        $(".lottery-round").addClass("rotated");
        $(".success-part").addClass("active");
    } else {
        console.log(2)
    }

    $(".lottery-btn").click(function() {
        var $that = $(this);
        var $lotteryRound = $that.closest(".lottery-box").find(".lottery-round")
        $lotteryRound.css("animation", "rotate 5s forwards");
        $lotteryRound.css("animation-timing-function", "cubic-bezier(.46,.07,.19,1.06)");

        setTimeout(function() {
            $that.closest(".lottery-box").find(".lottery-round").addClass("rotated");

            localStorage.setItem("lotteryRotated", true);

            // $that.find(".text-init").hide();
            // $that.find(".text-sale-count").show(200);

            $(".success-part").addClass("active");

            $([document.documentElement, document.body]).animate({
                scrollTop: $("#success").offset().top
            }, 1200);
        }, 5000);
    });

});

function orderFormMoving() {
    $(".product").each(function(index, item) {
        var form = this.querySelector(".order-form")
        var formClone = form.cloneNode(true);

        if ($(window).width() > 992 && $(window).width() < 1365) {
            $(".product-content", this).append(formClone);
        } else {
            $(".product-description", this).append(formClone);
        }

        form.remove()
    })
}