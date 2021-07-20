$(document).ready(function() {

    var checkIe = !navigator.userAgent.match(/Trident.*rv\:11\./);

    if (checkIe) {
        randomAnimatedParallax(document.querySelector(".h-b-1"), 1.4);
        randomAnimatedParallax(document.querySelector(".h-b-2"), -0.4, true);
        randomAnimatedParallax(document.querySelector(".h-b-3"), 1.8, true);
        randomAnimatedParallax(document.querySelector(".h-b-4"), -1.4, true);
        randomAnimatedParallax(document.querySelector(".h-b-5"), 2.2);
        randomAnimatedParallax(document.querySelector(".h-b-6"), 2.6, true);
        randomAnimatedParallax(document.querySelector(".h-b-7"), -1.5);
        randomAnimatedParallax(document.querySelector(".h-b-8"), 5.3, true);
        randomAnimatedParallax(document.querySelector(".p-b-1"), 1.4, true);
        randomAnimatedParallax(document.querySelector(".p-b-2"), -1.8, true);
        randomAnimatedParallax(document.querySelector(".p-b-3"), -2.5, true);
        randomAnimatedParallax(document.querySelector(".p-b-4"), -1.9);
        randomAnimatedParallax(document.querySelector(".p-b-5"), 4.8);
        //

        randomAnimatedParallax(document.querySelector(".promo-b-1"), 0.7);
        randomAnimatedParallax(document.querySelector(".promo-b-2"), 0.2, false);
        randomAnimatedParallax(document.querySelector(".promo-b-3"), -0.9, true);
        randomAnimatedParallax(document.querySelector(".promo-b-4"), -1.3);
        randomAnimatedParallax(document.querySelector(".promo-b-5"), -0.5, true);
        randomAnimatedParallax(document.querySelector(".promo-b-6"), 1.2);
        //

        randomAnimatedParallax(document.querySelector(".promo-b-7"), -1.5, true);
        randomAnimatedParallax(document.querySelector(".promo-b-8"), 0.5, true);
        //

        randomAnimatedParallax(document.querySelector(".prod1-b-1"), -0.5, true);
        randomAnimatedParallax(document.querySelector(".prod1-b-2"), 1.3, true);
        // randomAnimatedParallax(document.querySelector(".prod1-b-3"), -0.4, true);
        //

        randomAnimatedParallax(document.querySelector(".promo-b-4"), 2.3, true);
        randomAnimatedParallax(document.querySelector(".promo-b-5"), -1.5, true);
        randomAnimatedParallax(document.querySelector(".promo-b-6"), 1.5, true);
        randomAnimatedParallax(document.querySelector(".promo-b-7"), -2.2, true);
        randomAnimatedParallax(document.querySelector(".promo-b-8"), -2.3, true);
        randomAnimatedParallax(document.querySelector(".o31"), 1.5, true);
        randomAnimatedParallax(document.querySelector(".o32"), -2.3, true);
        randomAnimatedParallax(document.querySelector(".o33"), -2.6, true);
        randomAnimatedParallax(document.querySelector(".o34"), 1.4, true);
        randomAnimatedParallax(document.querySelector(".o35"), 1.3, true);
        randomAnimatedParallax(document.querySelector(".o36"), -2.5, true);
        randomAnimatedParallax(document.querySelector(".o37"), 1.3, true);
        randomAnimatedParallax(document.querySelector(".o38"), -2.5, true);
        randomAnimatedParallax(document.querySelector(".o39"), 2.3, true);
        randomAnimatedParallax(document.querySelector(".o40"), 1.3, true);
        randomAnimatedParallax(document.querySelector(".o41"), -2.5, true);


    }
});

function randomAnimatedParallax(el, factor, rotate) {
    const rect = el.getBoundingClientRect();
    $(el).css("transition", "transform 3000ms linear");
    $(el).data("rotate", 0);

    const update = function() {
        const rd = Math.random();
        const dx = (rd * $(window).width()) - (rect.left + rect.width / 2);
        const px = (dx / $(window).width()) * factor * 40;
        const py = ((Date.now() % 2000) / 100 * factor) + (rd > 0.5 ? -1 : 0);
        const sc = 0.8 + (rd * 0.6);
        let rt = 0;

        if (rotate) {
            rt = $(el).data("rotate") + ((10 * rd) * factor);
            $(el).data("rotate", rt);
        }

        $(el).css("transform", "translate(" + px + "%, " + py + "%) scale(" + sc + ") rotate(" + rt + "deg)");

        setTimeout(update, 2000);
    };

    update();
}