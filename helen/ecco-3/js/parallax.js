$(document).ready(function() {
    // return false;

    // var checkIe = !navigator.userAgent.match(/Trident.*rv\:11\./);

    randomAnimatedParallax(document.querySelector(".h-b-1"), -0.9, false);
    randomAnimatedParallax(document.querySelector(".h-b-2"), 1.3, true);
    randomAnimatedParallax(document.querySelector(".h-b-3"), 1.5, false);
    randomAnimatedParallax(document.querySelector(".h-b-4"), -1.2, true);
    randomAnimatedParallax(document.querySelector(".h-b-5"), -0.8, false);

    randomAnimatedParallax(document.querySelector(".p-b-1"), -0.9, false);
    randomAnimatedParallax(document.querySelector(".p-b-2"), 0.4, false);
    randomAnimatedParallax(document.querySelector(".p-b-3"), -1.5, true);
    randomAnimatedParallax(document.querySelector(".p-b-4"), -1.8, false);
    randomAnimatedParallax(document.querySelector(".p-b-5"), 1.0, false);
    randomAnimatedParallax(document.querySelector(".p-b-6"), -0.3, false);
    randomAnimatedParallax(document.querySelector(".p-b-7"), 0.6, false);
    randomAnimatedParallax(document.querySelector(".p-b-8"), 1.3, false);

    randomAnimatedParallax(document.querySelector(".f-b-1"), 0.4, false);
    randomAnimatedParallax(document.querySelector(".f-b-2"), 1.3, true);
    randomAnimatedParallax(document.querySelector(".f-b-3"), 1.7, true);
    randomAnimatedParallax(document.querySelector(".f-b-4"), -1.2, false);
    randomAnimatedParallax(document.querySelector(".f-b-5"), -0.8, false);
    randomAnimatedParallax(document.querySelector(".f-b-6"), 0.5, false);
});

function randomAnimatedParallax(el, factor, rotate) {

    if (el) {
        const rect = el.getBoundingClientRect();
        $(el).css("transition", "transform 3000ms linear");
        $(el).data("rotate", 0);

        const update = function() {
            const rd = Math.random();
            const dx = (rd * $(window).width()) - (rect.left + rect.width / 2);
            const px = (dx / $(window).width()) * factor * 30;
            const py = ((Date.now() % 3000) / 100 * factor) + (rd > 0.5 ? -1 : 0);
            const sc = 0.8 + (rd * 0.4);
            let rt = 0;

            if (rotate) {
                rt = $(el).data("rotate") + ((10 * rd) * factor);
                $(el).data("rotate", rt);
            }

            $(el).css("transform", "translate(" + px + "%, " + py + "%) scale(" + sc + ") rotate(" + rt + "deg)");

            setTimeout(update, 2600);
        };

        update();
    }
}