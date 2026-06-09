jQuery(document).ready(function ($) {

    // animation init

    AOS.init({
        // startEvent: 'DOMContentLoaded',
        // once: false,
        duration: 1200,
    });

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










    // $('.has-animation').each(function () {
    //     const el = this;

    //     const observer = new IntersectionObserver(([entry]) => {
    //         if (entry.isIntersecting) {
    //             $(el).delay($(el).data('delay') || 0).queue(function () {
    //                 $(this).addClass('animate-in');
    //             });
    //             observer.disconnect(); // запускаємо тільки раз
    //         }
    //     }, { threshold: 0.1 });

    //     observer.observe(el);
    // });
    // // -----------
    // function splitText(selector) {
    //     const els = document.querySelectorAll(selector);

    //     els.forEach(el => {
    //         const targets = el.querySelectorAll('span').length > 0
    //             ? el.querySelectorAll('span')
    //             : [el];

    //         targets.forEach((span, spanIndex) => {
    //             const words = span.textContent.trim().split(' ');

    //             span.innerHTML = words.map(word => {
    //                 const letters = word.split('').map(char =>
    //                     `<span class="char">${char}</span>`
    //                 ).join('');
    //                 return `<span class="word">${letters}</span>`;
    //             }).join(' ');

    //             span.querySelectorAll('.char').forEach(char => {
    //                 char.style.transitionDelay = `${spanIndex * 0.2}s`;
    //             });
    //         });

    //         const observer = new IntersectionObserver(([entry]) => {
    //             if (entry.isIntersecting) {
    //                 el.querySelectorAll('.char').forEach(char => {
    //                     char.classList.add('is-visible');
    //                 });
    //             }
    //         }, { threshold: 0.1 });

    //         observer.observe(el);
    //     });
    // }

    // splitText('.reveal-title');



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


    function splitText(selector) {
        const els = document.querySelectorAll(selector);

        els.forEach(el => {
            const children = Array.from(el.childNodes);

            children.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent.replace(/\s+/g, ' ').trim();
                    if (!text) return;

                    const words = text.split(' ');
                    const wrapper = document.createElement('span');
                    wrapper.classList.add('text-node');

                    wrapper.innerHTML = words.map(word => {
                        const letters = word.split('').map(char =>
                            `<span class="char">${char}</span>`
                        ).join('');
                        return `<span class="word">${letters}</span>`;
                    }).join(' ');

                    node.replaceWith(wrapper);

                } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
                    const words = node.textContent.trim().split(' ');

                    node.innerHTML = words.map(word => {
                        const letters = word.split('').map(char =>
                            `<span class="char">${char}</span>`
                        ).join('');
                        return `<span class="word">${letters}</span>`;
                    }).join(' ');
                }
            });

            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    const delay = parseInt(el.dataset.delay) || 0;
                    setTimeout(() => {
                        el.querySelectorAll('.char').forEach(char => {
                            char.classList.add('is-visible');
                        });
                    }, delay);
                } else {
                    el.querySelectorAll('.char').forEach(char => {
                        char.classList.remove('is-visible');
                    });
                }
            }, {
                threshold: 0,
                rootMargin: '0px 0px -15% 0px'
            });

            observer.observe(el);
        });
    }

    splitText('.reveal-title');
})