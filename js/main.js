jQuery(document).ready(function ($) {

    // animation init

    // AOS.init({
    //     // startEvent: 'DOMContentLoaded',
    //     // once: false,
    //     duration: 1200,
    // });

    // HEADER

    $(window).on('scroll load', function () {
        if ($(this).scrollTop() > 10) {
            $('.header').addClass('scroll');
        } else {
            $('.header').removeClass('scroll');
        }
    });

    // submenu
    $('.menu-item-has-children span').click(function () {
        $(this).toggleClass('active');
        $(this).next('.sub-menu').toggleClass('show');
    });
    $(document).click(function (event) {
        let $target = $(event.target);
        if (!$target.closest('.menu-item-has-children span').length & !$target.closest('.menu-item-has-children .sub-menu').length) {
            $('.header__menu>li>span').removeClass('active');
            $('.sub-menu').removeClass('show');
        }
    });

    // mob
    function openMobileMenu() {
        $('.navcol, .menu-overlay').addClass('open');
        $('body').addClass('menu-open');
    }

    function closeMobileMenu() {
        $('.navcol, .menu-overlay').removeClass('open');
        $('body').removeClass('menu-open');
    }

    $('.mebubtn').click(openMobileMenu);
    $('.closemenu, .menu-overlay').click(closeMobileMenu);

    // textsldier

    var swiper = new Swiper(".textslider", {
        effect: "fade",
        loop: true,
        speed: 700,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    // logo carousel
    var swiper = new Swiper(".logoslider", {
        // slidesPerView: 4.5,
        spaceBetween: 10,
        loop: true,
        speed: 6000,
        allowTouchMove: false,
        slidesPerView: 2,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        breakpoints: {
            575: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            991: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 4.5,
                spaceBetween: 20,
            },
        },
    });

    // inputmask - tel
    $('.telnum').inputmask({
        "mask": "+ 38 (999) 999-99-99",
        showMaskOnHover: false,
        showMaskOnFocus: false,
    });

    // footer міста
    $('.states').on('click', 'button', function (e) {
        e.preventDefault();

        const $button = $(this);
        const $list = $button.next('ul');

        $button.toggleClass('active');
        $button.attr('aria-expanded', $button.hasClass('active'));
        $list.stop(true, true).slideToggle(300);
    });





})