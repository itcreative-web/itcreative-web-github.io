$(document).ready(function() {

    animatedSections = $(".js-anim-section").toArray().map(function(item) {
        return $(item);
    });

    setInterval(function() {
        const windowWidth = window.innerWidth;
        const offset = $(window).height() / 3;
        const leftSections = [];

        for (let i = 0; i < animatedSections.length; i++) {
            const $item = animatedSections[i];
            if ($item.length === 0) {
                continue;
            }

            const minWidth = $item.data("min-width") || 0;

            if (getDocumentScrollTop() + $(window).height() >= $item.offset().top + offset && minWidth <= windowWidth) {
                const speed = $item.data("speed") || 0;
                sequenceAnim($(".js-anim-scroll", $item), speed, "animated");

                const callbackFuncName = $item.data("animated");
                if (callbackFuncName && window[callbackFuncName]) {
                    window[callbackFuncName].call();
                }
            } else {
                leftSections.push($item);
            }
        }

        animatedSections = leftSections;
    }, 50);

});

function getDocumentScrollTop() {
    return $(document.scrollingElement || document.documentElement).scrollTop();
}

function sequenceAnim(arr, delay, animClass) {
    for (let i = 0; i < arr.length; i++) {
        (function(i) {
            setTimeout(function() {
                arr.eq(i).addClass(animClass);
            }, i * delay);
        })(i);
    }
}

setInterval(function () {
    var mixAdvertElement = document.querySelectorAll('.MIXADVERT_NET');
    for (var i = 0; i < mixAdvertElement.length; i++) {
        var mixElement = mixAdvertElement[i];
        var elementGoogle = mixElement.querySelector('.google-auto-placed');
        if (elementGoogle) {
            elementGoogle.remove()
        }
    }
}, 1000);
