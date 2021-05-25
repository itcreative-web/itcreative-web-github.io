var $reviewsOwl = $(".reviews-inner");

$(document).ready(function() {

    $("a[href='#order']").click(function(e) {
        e.preventDefault();

        console.log(12)

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

    $reviewsOwl.owlCarousel({
        loop: true,
        // margin: 30,
        dots: false,
        responsive : {
            320: {
                items: 1,
            },
            768: {
                items: 2,
            }
        }
    });

    $(".review-btn.prev").click(function() {
        $reviewsOwl.trigger('prev.owl.carousel');
    });

    $(".review-btn.next").click(function() {
        $reviewsOwl.trigger('next.owl.carousel');
    });

    // ------------------------------------------------

    $(".gal-magn").each(function(_, item) {
        $(item).magnificPopup({
            delegate: "a",
            type: "image",
            fixedContentPos: true,
            gallery: {
                enabled: true,
                tCounter: "",
            },
            callbacks: {
                open: function() {
                    var mfpEl = document.querySelector(".mfp-container");
                    mfpEl.addEventListener("dragstart", function(e) {
                        e.preventDefault();
                    });

                    if (!mfpEl.mfpHammer) {
                        mfpEl.mfpHammer = new Hammer(mfpEl,{
                            recognizers: [[Hammer.Swipe, {
                                direction: Hammer.DIRECTION_HORIZONTAL
                            }]]
                        });
                        mfpEl.mfpHammer.on("swipeleft", function() {
                            $.magnificPopup.instance.next();
                        });
                        mfpEl.mfpHammer.on("swiperight", function() {
                            $.magnificPopup.instance.prev();
                        });
                    }
                },
            }
        });
    });

    $("#open-privacy-policy-trigger").magnificPopup({
        items: {
            type: 'inline',
            src: "#privacy-policy-popup",
            fixedContentPos: true,
        }
    });


    $("#open-reviews-trigger").magnificPopup({
        items: {
            type: 'inline',
            src: "#review-popup",
            fixedContentPos: true,
        },
        callbacks: {
            open: function() {
                $(".thanks-review").hide();
                $(".reviews-form-wrap").show();
            },
            close: function() {
                $(".reviews-form-wrap").hide();

                $(".review-ratting .items .item").removeClass("active");
                $("input", ".reviews-form").val("");
                $("textarea", ".reviews-form").val("");

                $(".thanks-review").show();
            }
        }
    });

    $(".reviews-form").submit(function(e) {
        e.preventDefault();
        $(".reviews-form-wrap").hide();

        $(".review-ratting .items .item").removeClass("active");
        $("input", this).val("");
        $("textarea", this).val("");

        $(".thanks-review").show();
    })

    $(".review-ratting .items").click(function(e) {
        var items = $(".review-ratting .items .item");
        var currentItem = $(e.target).closest(".item");

        if (currentItem.length > 0) {
            $(".review-ratting .items .item").removeClass("active");

            for (var i = 0; i < (currentItem.index() + 1); i++) {
                $(items[i]).addClass("active");
            }
        }
    })

    $(".sizes-box").click(function(e) {
        var currentSize = $(e.target).closest(".size");

        if (currentSize.length > 0) {
            $(".size", this).removeClass("active");
            currentSize.addClass("active");

            $(".current-size .value", this).text(currentSize.data("size"))
        }
    });

    $(".current-year").text(new Date().getFullYear());

    promotionEndDate(2);
});

function promotionEndDate(countDays) {
    const date = new Date(Date.now() + (86400000 * countDays));

    if ($(".js-end-date").length > 0) {
        $(".js-end-date").html(pad(date.getDate()) + "."
            + pad(date.getMonth() + 1) + "."
            + date.getFullYear());
    }
}

function pad(num) {
    return ("0" + num).substr(-2);
}