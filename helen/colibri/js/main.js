$(document).ready(function() {

    new WOW().init();

    var handleBtnMobOrder = null;

    $("a[href*='#']").click(function(e) {
        e.preventDefault();

        if ($(window).width() >= 1366) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $($(this).attr("href")).offset().top
            }, 1200);
        } else {
            $([document.documentElement, document.body]).animate({
                scrollTop: $($(this).attr("href")).offset().top - $(window).height() + $($(this).attr("href")).outerHeight()
            }, 1200);
        }
    });

    $.fancybox.defaults.animationEffect = "fade";
    $.fancybox.defaults.infobar = false;
    $.fancybox.defaults.loop = true;

    window.addEventListener('scroll', function() {
        clearTimeout(handleBtnMobOrder);

        handleBtnMobOrder = setTimeout(function() {
            const holders = document.querySelectorAll(".card");

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


    $(".sizes").click(function(e) {
        var $size = $(e.target).closest(".size");

        if ($size.length > 0) {
            $(".size", this).removeClass("active");
            $size.addClass("active");
        }
    });

    promotionEndDate(2);
});

function promotionEndDate(countDays) {
    const date = new Date(Date.now() + (86400000 * countDays));

    $(".js-end-date").html(pad(date.getDate()) + "."
        + pad(date.getMonth() + 1) + "."
        + date.getFullYear());
}