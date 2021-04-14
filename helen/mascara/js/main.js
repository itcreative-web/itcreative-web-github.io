var $reviewsSlider = $(".reviews .reviews-inner");
var $privilegeSlider = $(".results-content");

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle){
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
}

function debounce(name, delay, func) {
    window.appDebounceTimers = window.appDebounceTimers || {};
    clearTimeout(window.appDebounceTimers[name]);
    window.appDebounceTimers[name] = setTimeout(func, delay);
}

function initPrivilegeSlick() {
    $privilegeSlider.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        mobileFirst: true,
        rows: 1,
        dots: true,
        arrows: false,
        fade: false,
        adaptiveHeight: true,
        autoWidth: true,
        responsive: [{
            breakpoint: 300,
            settings: {
                autoHeight: true,
                slidesToShow: 1,

            }
        }, {
            breakpoint: 481,
            settings: {
                autoHeight: false,
                slidesToShow: 2,
            }
        }]
    });
}

function dynamicPrivilegeSlick(name) {
    var func = function() {
        if ($(window).width() < 768 ) {
            initPrivilegeSlick();
        } else {
            if ($privilegeSlider.hasClass("slick-initialized")) {

                console.log(455555)
                $privilegeSlider.slick('unslick');
            }
        }
    }

    func();

    $(window).on("resize", function() {
        console.log(121212)
        debounce("dynamicPrivilegeSlick_" + name, 100, func);
    });
}

function getDocumentScrollTop() {
    return $(document.scrollingElement || document.documentElement).scrollTop();
}

$(document).ready(function() {

    setTimeout(function() {
        $('body').addClass('loaded');
    }, 800);

    var link = window.location.href;
    link = link.toLowerCase();

    if (link.indexOf('tiktok') >=0 ) {
        $(".footer-info-wrapper").addClass('show-tiktok');
    }


    var handleBtnMobOrder = null;

    window.addEventListener('scroll', function() {
        clearTimeout(handleBtnMobOrder);

        handleBtnMobOrder = setTimeout(function() {
            const holders = document.querySelectorAll(".order");

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

    dynamicPrivilegeSlick("privilege")

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

    $("#open-privacy-policy-trigger").magnificPopup({
        items: {
            type: 'inline',
            src: "#privacy-policy-popup"
        }
    });

    $reviewsSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        rows: 1,
        dots: true,
        arrows: false,
        fade: true,
        autoWidth: true,
        fadeSpeed: 1000,
        // variableWidth: true,
        // autoplaySpeed: 6000,
        responsive: [{
            breakpoint: 300,
            settings: {
                adaptiveHeight: true,
                slidesToShow: 1,
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
            }
        }]
    });

    $(".review-btn.next").click(function(e) {
        $reviewsSlider.slick('slickNext');
    });

    $(".review-btn.prev").click(function(e) {
        $reviewsSlider.slick('slickPrev');
    });
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
        $(".timer .days .inner").text(pad(diff.days, 2));
        $(".timer .hours .inner").text(pad(diff.hours, 2));
        $(".timer .minutes .inner").text(pad(diff.minutes, 2));
        $(".timer .seconds .inner").text(pad(diff.seconds, 2));

        $(".timer .days svg > path").attr("d", describeArc(50, 50, 42, 90, (diff.days/timerLeftDays)*360+90));
        $(".timer .hours svg > path").attr("d", describeArc(50, 50, 42, 90, (diff.hours/24)*360+90));
        $(".timer .minutes svg > path").attr("d", describeArc(50, 50, 42, 90, (diff.minutes/60)*360+90));
        $(".timer .seconds svg > path").attr("d", describeArc(50, 50, 42, 90, (diff.seconds/60)*360+90));
    }
});