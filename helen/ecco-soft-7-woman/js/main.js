var $overviewOwl = $(".overview-gallery");
var $cardOwl = $(".card-gallery");

$(document).ready(function() {

    $.fancybox.defaults.animationEffect = "fade";
    $.fancybox.defaults.infobar = false;
    $.fancybox.defaults.loop = true;

    $(".reviews-content").owlCarousel({
        loop: true,
        margin: 48,
        dots: true,
        responsive : {
            320: {
                items: 1,
            },
            768: {
                items: 2,
            },
            991: {
                items: 3,
            }
        }
    });

    $("a[href*='#']").click(function(e) {
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

    $(".colors").click(function(e) {
        var $color = $(e.target).closest(".color");
        var $colorData = $color.data("color");
        var $card = $color.closest(".card--multi");
        var $productImages = $(".image", $card)

        if ($color.length > 0) {
            $(".card-gallery", $card).removeClass("active");
            $card.find(".card-gallery--" + $colorData).addClass("active");

            $productImages.removeClass("active");
            $card.find(".image--" + $colorData).addClass("active");

            $(".color", $(this)).removeClass("active");
            $color.addClass("active");
        }
    });

    $(".card .sizes").click(function(e) {
        var $size = $(e.target).closest(".size");
        if ($size.length > 0) {
            $(".size", $(this)).removeClass("active");
            $size.addClass("active");
        }
    })

    promotionEndDate(2);

    var scenesParallax = [];

    mQ("(max-width: 1024px)", function () {
        if (!scenesParallax.length) return
        scenesParallax.forEach(function (scene) {
            scene.disable();
            scene.element.removeAttribute('style');
        })
    }, function () {
        if (scenesParallax.length === 0) {
            $('.parallax').each(function (i) {
                scenesParallax[i] = new Parallax($(this).children('div').attr('data-depth', randomNum(15, 15)).end().get(0), {
                    frictionX: 0.03,
                    frictionY: 0.03,
                    invertX: Math.random() >= 0.5,
                    invertY: Math.random() >= 0.5
                });
            })
        } else {
            scenesParallax.forEach(function (scene) {
                scene.enable();
            })
        }
    });

    function randomNum(min, max) {
        var numLow = min, numHigh = max,
            adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;
        return Math.floor(Math.random() * adjustedHigh) + parseFloat(numLow);
    }

    function mQ(mqStr, match, mismatch) {
        var mq = matchMedia(mqStr);
        mq.addListener(widthChange);
        widthChange(mq);
        function widthChange(mq) {
            if (mq.matches) {
                match();
            } else {
                mismatch();
            }
        }
    }

});

function debounce(name, delay, func) {
    window.appDebounceTimers = window.appDebounceTimers || {};
    clearTimeout(window.appDebounceTimers[name]);
    window.appDebounceTimers[name] = setTimeout(func, delay);
}

function initOverviewOwl() {
    $overviewOwl.addClass("owl-carousel");
    $overviewOwl.owlCarousel({
        items:1,
        loop: true,
        dots: true
    })
}

function initCardOwl() {
    $cardOwl.addClass("owl-carousel");
    $cardOwl.each(function(index, item) {
        $(item).owlCarousel({
            items:3,
            loop: true,
            dots: true,
            margin: 10,
            // autoWidth: true
        })
    });
}

dynamicOvewrviewOwl("overview");
dynamicCardOwl("card");

function dynamicCardOwl(name) {
    var func = function() {
        if ($(window).width() < 481 ) {
            $cardOwl.trigger('destroy.owl.carousel');
            $cardOwl.addClass("owl-carousel");
            initCardOwl();
        } else {
            $cardOwl.trigger('destroy.owl.carousel');
            $cardOwl.removeClass("owl-carousel");
        }
    }

    func();

    $(window).on("resize", function() {
        debounce("dynamicCardOwl_" + name, 100, func);
    });
}


function dynamicOvewrviewOwl(name) {
    var func = function() {
        if ($(window).width() < 586 ) {
            $overviewOwl.trigger('destroy.owl.carousel');
            $overviewOwl.addClass("owl-carousel");
            initOverviewOwl();
        } else {
            $overviewOwl.trigger('destroy.owl.carousel');
            $overviewOwl.removeClass("owl-carousel");
        }
    }

    func();

    $(window).on("resize", function() {
        debounce("dynamicOvewrviewOwl_" + name, 100, func);
    });
}

function pad(num) {
    return ("0" + num).substr(-2);
}

function promotionEndDate(countDays) {
    const date = new Date(Date.now() + (86400000 * countDays));

    $(".js-end-date").html(pad(date.getDate()) + "."
        + pad(date.getMonth() + 1) + "."
        + date.getFullYear());
}