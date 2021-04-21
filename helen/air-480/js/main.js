var $reviewsSlick = $(".reviews-inner");

$(document).ready(function() {

    $reviewsSlick.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        rows: 1,
        dots: true,
        arrows: false,
        adaptiveHeight: true,
        // autoplay: true,
        // fade: true,
        fadeSpeed: 1000,
        // autoplaySpeed: 6000,

    });

    $(".review-btn--prev").click(function () {
        console.log(56453)
        $reviewsSlick.slick('slickPrev');
    })

    $(".review-btn--next").click(function () {
        console.log(56453)
        $reviewsSlick.slick('slickNext');
    })

});

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
        }, 500);
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

function pad(num) {
    return ("0" + num).substr(-2);
}

const timerLeftDays = 1;
const finish = TimerUtils.getTimerFinish("2020-10-16T00:00:00", timerLeftDays);

TimerUtils.startTimer(finish.toISOString(), function(diff) {

    if ($(".timer").length > 0) {
        console.log($(".timer .hours"))

        // $(".timer .days").text(pad(diff.days, 2));
        $(".timer .hours").text(pad(diff.hours, 2));
        $(".timer .minutes").text(pad(diff.minutes, 2));
        $(".timer .seconds").text(pad(diff.seconds, 2));
    }
});