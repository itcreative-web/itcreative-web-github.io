var $reviewsOwl = $(".reviews-slides");
var $previewsOwl = $(".previews-content");

var $cardsOwl =  $(".main-image");

$(document).ready(function() {

    $(".reviews-slides .slide").each(function(index, item ) {
        $(".reviews-nav .dots").append(
            $("<span>", {"class": "dot " + (index === 0 ? "active" : "")})
        );

        $(".reviews-nav .dots .dot").eq(index).text(pad(index + 1))
    })

    $cardsOwl.each(function(index, item) {
        $(item).owlCarousel({
            loop: true,
            items: 1,
            dotsContainer: '.mini-images--' + $(item).data("index")
        });

        $('.mini-images .item', $(item).closest(".card")).click(function () {
            $(item).trigger('to.owl.carousel', [$(this).index(), 300]);
        });
    })

    $reviewsOwl.owlCarousel({
        loop: true,
        dots: false,
        responsive : {
            320: {
                items: 1,
                margin: 0
            },
            768: {
                items: 1,
                margin: 30,
            },
            1200: {
              items: 2,
              margin: 30
            },
            1536: {
                items: 2,
                margin: 50
            }
        }
    });

    $reviewsOwl.on("changed.owl.carousel", function(e) {
        var index = e.relatedTarget.relative(e.item.index);

        $(".reviews-nav .dots .dot").removeClass("active")
        $(".reviews-nav .dots .dot").eq(index).addClass("active")
    });

    $(".reviews-nav .dots .dot").click(function(e) {
        var $currentDot = $(e.target).closest(".dot").index();
        $reviewsOwl.trigger('to.owl.carousel', [$currentDot, 500])
    })

    $(".reviews-nav .prev").click(function() {
        $reviewsOwl.trigger('prev.owl.carousel');
    });

    $(".reviews-nav .next").click(function() {
        $reviewsOwl.trigger('next.owl.carousel');
    });

    if ($(window).width() < 1200) {
        $previewsOwl.addClass("owl-carousel");

        $previewsOwl.owlCarousel({
            loop: true,
            dots: false,
            responsive : {
                320: {
                    items: 1,
                    margin: 30
                },

                575: {
                    items: 2,
                    margin: 30,
                },

                992: {
                    items: 3,
                    margin: 30,
                }
            }
        });

        $(".previews-nav .prev").click(function() {
            $previewsOwl.trigger('prev.owl.carousel');
        });

        $(".previews-nav .next").click(function() {
            $previewsOwl.trigger('next.owl.carousel');
        });
    }

    $(".open-order-trigger").magnificPopup({
        items: {
            fixedContentPos: true,
            type: 'inline',
            src: "#order-popup"
        },
        callbacks: {

            open: function() {
            },
            close: function() {
            }

        }
    });

    $(".open-privacy-trigger").magnificPopup({
        items: {
            fixedContentPos: true,
            type: 'inline',
            src: "#privacy-popup"
        },
        callbacks: {
            open: function() {
            },
            close: function() {
            }
        }
    });

    $(".js-year").text(new Date().getFullYear());

    promotionEndDate(day);

});


function promotionEndDate(countDays) {
    const date = new Date(Date.now() + (86400000 * countDays));

    $(".js-end-date").html(pad(date.getDate()) + "."
        + pad(date.getMonth() + 1) + "."
        + pad(date.getFullYear()));
}


function pad(num) {
    return ("0" + num).substr(-2);
}

// timer

const TimerUtils = {
    startTimer: function(targetDateStr, tickCallback) {
        const targetDateMillis = Date.parse(targetDateStr);

        return setInterval(function() {
            const currentMillis = Date.now();
            const diffMillis = targetDateMillis - currentMillis;
            const diff = {};

            diff.seconds = Math.floor(diffMillis / 1000) % 60;
            diff.minutes = Math.floor(diffMillis / 1000 / 60) % 60;
            diff.hours = Math.floor(diffMillis / 1000 / 60 / 60) % 24;
            diff.days = Math.floor(diffMillis / 1000 / 60 / 60 / 24);

            tickCallback(diff);
        }, 1000);
    },

    getTimerFinish: function(finishDate, period) {
        const finishDateMillis = Date.parse(finishDate);

        if (Date.now() >= finishDateMillis) {
            return TimerUtils.getTimerFinish(
                new Date(finishDateMillis + (period * 60 * 60 * 24 * 1000)).toISOString(),
                period
            );
        }

        return new Date(finishDateMillis);
    }
};

const day = 1;
const finish = TimerUtils.getTimerFinish("2020-10-16T00:00:00", day);

TimerUtils.startTimer(finish.toISOString(), function(diff) {
    if ($(".timer-inner").length > 0) {
        $(".timer-inner .days").text(pad(diff.days, 2));
        $(".timer-inner .hours").text(pad(diff.hours, 2));
        $(".timer-inner .minutes").text(pad(diff.hours, 2));
        $(".timer-inner .seconds").text(pad(diff.seconds, 2));
    }
});