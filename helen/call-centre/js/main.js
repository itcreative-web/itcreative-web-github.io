var $aboutLeftColumn;
var $aboutLeftColumnStopTriggerEl;
var $headerPlaceholderSection;
var $headerSection;

$(document).ready(function() {
    $aboutLeftColumn = $(".about .left.col");
    $aboutLeftColumnStopTriggerEl = $(".about .left-col-stop");

    $headerSection = $(".header");
    $headerPlaceholderSection = $(".header-placeholder");
    $headerPlaceholderSection.css({
        height: $headerSection.outerHeight()
    });

    $("#request-form-modal");

    $(".request-form-trigger").magnificPopup({
        items: {
            type: 'inline',
            src: "#request-form-modal"
        }
    });

    var $servicesContainer = $(".services-content");
    var $servicesTabs = $(".services-tabs .tab-item", $servicesContainer);
    var $servicesItems = $(".description-item", $servicesContainer);

    $servicesTabs.eq(0).addClass("active");
    $servicesItems.eq(0).addClass("active");

    $servicesTabs.click(function(e) {
        var $currentTab = $(e.target).closest(".tab-item");

        if ($currentTab.length > 0) {
            $servicesTabs.removeClass("active");
            $currentTab.addClass("active");

            $servicesItems.removeClass("active");
            $servicesItems.eq(parseInt($currentTab.data("tabIndex"))).addClass("active");
        }
    });

    var handleBtnMobOrder = null;

    window.addEventListener('scroll', function() {
        clearTimeout(handleBtnMobOrder);

        handleBtnMobOrder = setTimeout(function() {

            const holders = document.querySelectorAll(".request-form");

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
                    $(".btn-order-fixed").removeClass("active");
                } else {
                    $(".btn-order-fixed").toggleClass("active", isVisible);
                }

            }
        }, 10)
    });

    $(".dropdown__list").each(function(index, element) {
        $(element).attr("data-height", $(this).outerHeight());
        $(element).css("height", "0")
    })

    if ($(window).width() < 1200) {
        dropdownClick();

        var lang = $(".lang-select .dropdown__list .list__item");
        lang.each(function(index, element) {
            $(".lang-select").append(element);
        });

        $(".lang-select .dropdown__list").remove()
        $(".lang-select .btn-open-dropdown").remove()

    } else {
        dropdownHover();
    }

    $("a[href*='#']").click(function(e) {
        e.preventDefault();

        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1200);
    });

    // --

    $(".js-full-year").text(new Date().getFullYear());

    if ($(window).width() < 992) {
        $(".header-nav").css("top", $(".header").outerHeight());
    }

    $(".header-nav .mail-nav__item a[href*='#']").click(function (e) {
        e.preventDefault();

        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1200);

        $("body").removeClass("menu-opened");
        $(".header-nav").removeClass("active");
        $(".mob-menu-open").removeClass("opened");
    })

    $(".mob-menu-open").click(function() {
        $(".header-nav").css("top", $(".header").outerHeight());

        if ($(this).hasClass("opened")) {
            $("body").removeClass("menu-opened");
            $(".header-nav").removeClass("active");
            $(this).removeClass("opened");

        } else {
            $("body").addClass("menu-opened");
            $(".header-nav").addClass("active");
            $(this).addClass("opened");
        }
    })

    // --

    $(window).on("scroll", function(e) {
        updateStickOffset($aboutLeftColumn, $aboutLeftColumnStopTriggerEl);
        updateHeader();
    });

});

function getDocumentScrollTop() {
    return $(document.scrollingElement || document.documentElement).scrollTop();
}

function dropdownHover() {
    var hideTimer;

    $(".dropdown-box").mouseenter(function(e) {
        clearTimeout(hideTimer);
        $(".dropdown__list", this).eq(0).css("height",  $(".dropdown__list", this).data("height"));
        $(".dropdown__list", this).eq(0).addClass("active");
    });

    $(".dropdown-box").mouseleave(function (e) {
        var that = this;
        hideTimer = setTimeout(function() {
            $(".dropdown__list", that).eq(0).css("height",  "0");
            $(".dropdown__list", that).eq(0).removeClass("active");
        }, 300);
    });
}

function dropdownClick() {
    $(".dropdown-box").click(function(e) {
        if ($(this).hasClass("active")) {
            $(".dropdown__list", this).eq(0).css("height",  "0");
            $(this).removeClass("active");
        } else {
            $(".dropdown__list", this).eq(0).css("height",  $(".dropdown__list", this).data("height"));
            $(this).eq(0).addClass("active");
        }
    });
}

function updateStickOffset($stick, $stickStopEl) {
    if (!$stick || $stick.length < 1) {
        return;
    }

    if ($(window).width() > 767) {
        var $parent = $stick.parent();
        var stickHeight = $stick.outerHeight();
        var parentOffsetTop = $parent.offset().top;
        var parentHeight = $parent.outerHeight();
        var windowHeight = $(window).height();
        var windowScrollTop = $(window).scrollTop();
        var offset = 0;
        var maxOffset = parentHeight - stickHeight;

        if ($stickStopEl && $stickStopEl.length > 0) {
            maxOffset = $stickStopEl.offset().top - parentOffsetTop
            $stickStopEl.css({minHeight: stickHeight});
        }

        if (windowScrollTop + windowHeight/2 >= parentOffsetTop + stickHeight/2) {
            offset = (windowScrollTop - parentOffsetTop) + (windowHeight - stickHeight)/2;
            offset = Math.min(offset, maxOffset);
        }

        $stick.css({top: offset});
    } else {
        $stick.css({top: "initial"});
        $stickStopEl.css({minHeight: "initial"});
    }
}

function updateHeader() {
    $headerSection.toggleClass("fixed", $(window).scrollTop() > $headerPlaceholderSection.outerHeight());
    $headerSection.toggleClass("visible", $(window).scrollTop() > 500);
}

