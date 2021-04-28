function pad(num) {
    return ("0" + num).substr(-2);
}


$(document).ready(function() {
    $.fancybox.defaults.animationEffect = "fade";
    $.fancybox.defaults.infobar = false;
    $.fancybox.defaults.loop = true;


    // $(".reviews-content").height($(".review").eq(0).innerHeight());


    var $windowWidth = $(window).width();

    // $(window).on("resize", function() {
    //     if ($windowWidth !== $(window).width()){
    //         $(".reviews-content").height($(".review").eq(0).innerHeight());
    //     }
    // });

    $(".spray .colors").click(function(e) {
        if ($(e.target).closest(".color-item").length > 0) {
            $(".color-item", this).removeClass("active");
            $(e.target).closest(".color-item").addClass("active");
        }
    })

    $(".product").click(function(e) {
        var $currentColor = $(e.target).closest(".color-item");

        if ($currentColor.length > 0 && $currentColor.data("color") !== undefined) {
            $(".color-item", this).removeClass("active");
            $currentColor.addClass("active")
            $(".product-image", this).removeClass('active');
            $(".product-image--" + $currentColor.data("color"), this).addClass('active');

            $(".product-galleries .gallery", this).removeClass("active");
            $(".product-galleries .gallery--" + $currentColor.data("color"), this).addClass("active");
        }
    })

    if ($(window).width() < 1200 && $(window).width() > 991) {
        $(".product").each(function(index, item) {
            var $prodGal = item.querySelector(".product-galleries");
            var $prodGalClone = $prodGal.cloneNode(true);

            $(".product-info", $(item)).append($prodGal);
            $prodGalClone.remove();
        });
    }

    $(window).on("resize", function() {
        if ($windowWidth !== $(window).width()){
            $(".product").each(function(index, item) {
                if ($(window).width() < 1200 && $(window).width() > 991) {
                    var $prodGal = item.querySelector(".product-galleries");
                    var $prodGalClone = $prodGal.cloneNode(true);

                    $(".product-info", $(item)).append($prodGal);
                    $prodGalClone.remove();
                } else {
                    var gall = $(".product-galleries", item);

                    if (gall.length > 0) {
                        $(".product-galleries-wrapper", item).append(gall);
                        // gall.remove();
                    }
                }
            })
        }
    });


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

    $("a[href='#order-woman']").click(function(e) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1200);
    });

    $("a[href='#order-man']").click(function(e) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1200);
    });



    $(".btn-send-review").click(function(e) {
        $.fancybox.open({
            src  : '#modal-reviews',
            type : 'inline',
            opts : {
                beforeShow : function( instance, current ) {
                    $(".review-popup__form").show();
                    $(".thanks-your-feedback").hide();
                    $(".add-photo-file__inner img").attr("src", "images/elipse.png");
                    $(".add-photo__icon").show()
                }
            }
        });
    })

    $(".review-popup__form").submit(function(e) {
        e.preventDefault();
        $(".form-control").val("");
        $(".thanks-your-feedback").show(320);
        $(".review-popup__form").hide(320);
    });

    $(".add-photo-file__field").change(function(e) {
        if (this.files.length > 0) {
            if (["image/jpeg", "image/png"].indexOf(this.files[0].type) > -1) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $(".add-photo-file__inner img").attr("src", e.target.result)
                };
                reader.readAsDataURL(this.files[0]);
            }
            $(".add-photo__icon").hide(320)
        }
    });

})