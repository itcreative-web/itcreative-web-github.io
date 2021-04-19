var $reviewsOwl = $(".reviews-slides");
var $mainGalleryOwl = $(".main-gallery-slides");

$(document).ready(function() {
    var handleBtnMobOrder = null;

    window.addEventListener('scroll', function() {
        clearTimeout(handleBtnMobOrder);

        handleBtnMobOrder = setTimeout(function() {
            const holders = document.querySelectorAll(".product");

            if (holders.length > 0) {
                const windowScrollBottom = getDocumentScrollTop() + $(window).height();
                var isVisible = true;

                for (let i = 0; i < holders.length; i++) {
                    var $item = $(holders[i]);
                    var $itemTop = $item.offset().top;
                    if (windowScrollBottom > $itemTop && windowScrollBottom < $itemTop + $item.height() + 200) {
                        isVisible = false;
                        break;
                    }
                }

                const $pageHeight = $(".overflow").height() - $(window).height()

                if (getDocumentScrollTop() + 100 >= $pageHeight) {
                    $(".fixed-order-link").removeClass("active");
                } else {
                    $(".fixed-order-link").toggleClass("active", isVisible);
                }

            }
        }, 10)
    });

    $("a[href='#order']").click(function(e) {
        e.preventDefault();

        if ($(window).width() >= 1200) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $($(this).attr("href")).offset().top
            }, 1200);
        } else {
            $([document.documentElement, document.body]).animate({
                scrollTop: $($(this).attr("href")).offset().top - $(window).height() + $($(this).attr("href")).outerHeight()
            }, 1200);
        }
    });

    $(".product-colors").click(function(e) {
        var $currentProduct = $(e.target).closest(".product");
        var $color = $(e.target).closest(".color-item");
        var $mainImages = $(".product-main-image .image", $currentProduct);
        if ($currentProduct.length > 0 && $color.length > 0) {
            $(".color-item").removeClass("active");
            $color.addClass("active");
            $mainImages.removeClass("active");

            $(".product-main-image .image--" + $color.data("color"), $currentProduct).addClass("active");

            $(".product-galery", $currentProduct).removeClass("active");
            $(".product-galery--" + $color.data("color"), $currentProduct).addClass("active");
        }
    })

    $(".order-form .sizes").click(function(e) {
        if ($(e.target).closest(".size").length > 0) {
            var $sizes = $(".size", this);
            var $size = $(e.target).closest(".size");

            $sizes.removeClass("active");
            $size.addClass("active");
        }
    });

    $.fancybox.defaults.animationEffect = "fade";
    $.fancybox.defaults.infobar = false;
    $.fancybox.defaults.loop = true;

    $reviewsOwl.owlCarousel({
        loop: true,
        dots: true,
        responsive: {
            320: {
                items: 1,
                margin: 20,
            },
            768: {
                items: 2,
                margin: 20,
            }
        }
    })

    $('.review-btn--prev').click(function() {
        $reviewsOwl.trigger('prev.owl.carousel', [500]);
    });
    $('.review-btn--next').click(function() {
        $reviewsOwl.trigger('next.owl.carousel', [500]);
    });

    dynamicMainGalleryOwl();
    promotionEndDate(3);
});

function init() {
    $mainGalleryOwl.addClass("owl-carousel");
    $mainGalleryOwl.owlCarousel({
        loop:true,

        responsive: {
            0: {
                items: 1,
                margin: 0
            },
            585: {
                items: 2,
                margin: 20
            }
        }
    })


}

function dynamicMainGalleryOwl(name) {
    console.log("slider init");

    var func = function() {
        if ($(window).width() < 992) {
            init();
        } else {
            $mainGalleryOwl.trigger('destroy.owl.carousel');
        }
    }

    func();

    $(window).on("resize", function() {
        debounce("dynamicGalleryOwl_" + name, 100, func);
    });
}


function pad(num) {
    return ("0" + num).substr(-2);
}

function getDocumentScrollTop() {
    return $(document.scrollingElement || document.documentElement).scrollTop();
}

function promotionEndDate(countDays) {
    const date = new Date(Date.now() + (86400000 * countDays));

    if ($(".js-end-date").length > 0) {
        $(".js-end-date").html(pad(date.getDate()) + "."
            + pad(date.getMonth() + 1) + "."
            + date.getFullYear());
    }
}
