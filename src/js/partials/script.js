$(document).ready(function () {
    var jVal;
    $('#you__name').click(function () {
        $('.name__range-name').css({'display': 'block'});
    })
    $(document).on('mouseenter', '#you__name', function () {
        $('.form__hint-name').animate({'opacity': '0.7', 'transition': '0.7s'})
    })
    $(document).on('mouseleave', '#you__name', function () {
        $('.form__hint-name').animate({'opacity': '0', 'transition': '1s'})
    });

    jVal = {
        'fullName': function () {
            var nameInfo = $('.name__range');
            var ele = $('#you__name');
            var pos = ele.offset();
            if (ele.val().length < 2) {
                jVal.errors = true;
                nameInfo.css(
                    {'background': 'url("../img/chrast.png")no-repeat center'}
                );
            } else {
                nameInfo.css(
                    {'background': 'url("../img/yes.png")no-repeat center'}
                );
                ele.css({'border-color': '#28921f', 'box-shadow': '0 0 5px #5cd053'});
                $('.form__hint-name').css({'display': 'none'});
            }
            ;
        },

        'youBirthday': function () {
            var ele = $('#year');
            var birthday = $('select[name="birthday"]');
            var pos = birthday.offset();
            if (ele.change === false) {
                jVal.errors = true;
            } else {
                $('.name__range-date').css(
                    {'display': 'block', 'background': 'url("../img/yes.png")no-repeat center'}
                );
            }
        },

        'youCity': function () {
            var ele = $('#you__city');
            var pos = ele.offset();
            if (ele.change !== false) {
                ele.css(
                    {'border-color': '#28921f', 'box-shadow': '0 0 5px #5cd053'}
                );
                $('.name__range-city').css(
                    {'display': 'block', 'background': 'url("../img/yes.png")no-repeat center'}
                );
            } else {
                jVal.errors = true;
            }
        }
    };
    $('#you__name').change(jVal.fullName);
    $('#you__city').change(jVal.youCity);
    $('select[name="birthday"]').change(jVal.youBirthday);
});

//****Header-Photo slide****

$(document).ready(function () {
    $('.buttons__item-one').click(function () {
        $('.header__pictures').css(
            {'background': 'url("../img/slide-pare.png")no-repeat top center /cover', 'transition': '2s'}
        );
    });

    $('.buttons__item-two').click(function () {
        $('.header__pictures').css(
            {'background': 'url("../img/slide-girl.png")no-repeat center /cover', 'transition': '2s'}
        );
    });

    $('.buttons__item-three').click(function () {
        $('.header__pictures').css(
            {'background': 'url("../img/slide-pare2.png")no-repeat top center /cover', 'transition': '2s'}
        );
    });

    $('.buttons__item-four').click(function () {
        $('.header__pictures').css(
            {'background': 'url("../img/slide-girl2.png")no-repeat center /cover', 'transition': '2s'}
        );
    });
});

//  ****Carousel photo content right****

$(document).on('click', ".carousel-button-right", function () {
    var carusel = $(this).parents('.carousel');
    right_carusel(carusel);
    return false;
});

$(document).on('click', ".carousel-button-left", function () {
    var carusel = $(this).parents('.carousel');
    left_carusel(carusel);
    return false;
});
function left_carusel(carusel) {
    var block_width = $(carusel).find('.carousel-block').outerWidth();
    $(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo($(carusel).find(".carousel-items"));
    $(carusel).find(".carousel-items").css({"left": "-" + block_width + "px"});
    $(carusel).find(".carousel-items .carousel-block").eq(-1).remove();
    $(carusel).find(".carousel-items").animate({left: "0px"}, 200);

}
function right_carusel(carusel) {
    var block_width = $(carusel).find('.carousel-block').outerWidth();
    $(carusel).find(".carousel-items").animate({left: "-" + block_width + "px"}, 200, function () {
        $(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo($(carusel).find(".carousel-items"));
        $(carusel).find(".carousel-items .carousel-block").eq(0).remove();
        $(carusel).find(".carousel-items").css({"left": "0px"});
    });
}

$(document).on('mouseenter', '.carousel', function () {
    $(this).addClass('hover')
})
$(document).on('mouseleave', '.carousel', function () {
    $(this).removeClass('hover')
})

//*******  Tab Bar  *********

//**** Horizontal ****

$(document).ready(function () {
    var r = $('#volume__range');
    r.on('mouseenter', function () {
        var p = r.val();
        r.on('click', function () {
            p = r.val();
            bg(p);
        });
        r.on('mousemove', function () {
            p = r.val();
            bg(p);
        });
    });
    function bg(n) {
        r.css({
            'background-image': '-webkit-linear-gradient(left ,#ffae02 0%,#ffae02 ' + n + '%, #e6e6e6 ' + n + '%,#e6e6e6 100%)'
        });
    }
})

//**** Circle diagram ****

$(document).ready(function () {
    function pieSlicer() {
        var percentValue = (volume__range.value / 100) * circumference;
        big.style.strokeDasharray = percentValue + " " + circumference;
        big.style.stroke = "hsl(38 ," + volume__range.value + "%, 50%)";
        percentDisplay.innerHTML = volume__range.value + "%";
    }

    var volume__range = document.getElementById("volume__range"),
        circle = document.getElementById("big"),
        radius = parseInt(circle.getAttribute('r'), 10),
        circumference = 2 * radius * Math.PI,
        percentDisplay = document.querySelector("#diagram output");
    volume__range.addEventListener("input",
        function () {
            pieSlicer();
        }
    )
    pieSlicer();
})

//**** Star rating ****

$(document).ready(function () {
    var el = document.querySelector('#el');
    var currentRating = 0;
    var maxRating = 5;
    var callback = function (rating) {
    };
    var myRating = rating(el, currentRating, maxRating, callback);
    myRating.setRating();
})

// *********************************************************

$(document).ready(function () {
    var i = 0;
    $('.icon__block').click(function () {
        i += 1;
        if (i <= 100) {
            $('.meter').css({'width': i + '%'});
            $('.progress').html(i + '%');
        }
        return i;
    })
})

//******* Popup *********************************

var win_top = 0;
$(document).ready(function () {

    $('#hidden__join').click(function () {
        popup_open('#myPopup');
        $('.popup__centre').css({'display': 'flex'});
    })

    $(document).on('click', '.popup .close, .overflow, .popup__centre', function () {
        popup_close()
        return false;
    })

})
function popup_open(selector) {
    if (selector.length) {
        win_top = $(window).scrollTop();
        $('.container').css({
            'position': 'fixed',
            'left': '0',
            'right': '0',
            'top': '0',
            'margin-top': '-' + win_top + 'px'
        })
        $('.overflow,' + selector).fadeIn();
    }
}
function popup_close() {
    $('.overflow, .popup__centre').hide();
    $('.container').css({
        'position': 'static',
        'margin-top': '0px'
    })
    $(window).scrollTop(win_top);
}

//****** Select2  ******

$(document).ready(function () {
    $('select').select2({
        theme: "classic"
    });
})