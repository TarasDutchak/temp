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





    // картинки анімація
    $('.has-animation').each(function () {
        const el = this;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                $(el).delay($(el).data('delay') || 0).queue(function () {
                    $(this).addClass('animate-in');
                });
            } else {
                $(el).removeClass('animate-in').clearQueue();
            }
        }, { threshold: 0.1 });

        observer.observe(el);
    });

    // -----------




    // плавинй скрол
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);



    // тексти анімація
    Splitting();

    document.querySelectorAll('[data-splitting]').forEach(el => {
        new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                const delay = parseInt(el.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, delay);
            } else {
                entry.target.classList.remove('in-view');
            }
        }, { threshold: 0.1, rootMargin: '0px 0px -15% 0px' }).observe(el);
    });




    // об'єкти анімація
    gsap.registerPlugin(ScrollTrigger); // спочатку реєструємо

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    let mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
        gsap.from('.gsap1', {
            scrollTrigger: { trigger: '.gsap1', start: 'top 90%', end: 'top 20%', scrub: 1 },
            x: -400, y: -50,
        });
        gsap.from('.gsap2', {
            scrollTrigger: { trigger: '.gsap2', start: 'top 90%', end: 'top 20%', scrub: 1 },
            x: 250, y: -200,
        });
        gsap.from('.gsap3', {
            scrollTrigger: { trigger: '.gsap3', start: 'top 90%', end: 'top 20%', scrub: 1 },
            x: 400, y: 50,
        });
    });
    mm.add('(max-width: 767px)', () => {
        gsap.from('.gsap1', {
            scrollTrigger: { trigger: '.gsap1', start: 'top 90%', end: 'top 20%', scrub: 1 },
            x: -100, y: 30,
        });
        gsap.from('.gsap2', {
            scrollTrigger: { trigger: '.gsap2', start: 'top 90%', end: 'top 20%', scrub: 1 },
            x: 100, y: 50,
        });
        gsap.from('.gsap3', {
            scrollTrigger: { trigger: '.gsap3', start: 'top 90%', end: 'top 20%', scrub: 1 },
            x: -100, y: 30,
        });
    });







})



