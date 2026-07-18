jQuery(document).ready(function ($) {

    // AOS init

    // AOS.init({
    //     // startEvent: 'DOMContentLoaded',
    //     // once: false,
    //     duration: 1200,
    // });

    // ------------------------------------- Фіксований HEADER -------------------------------------

    $(window).on('scroll load', function () {
        if ($(this).scrollTop() > 10) {
            $('.header').addClass('scroll');
        } else {
            $('.header').removeClass('scroll');
        }
    });

    // ------------------------------------- Submenu (HEADER) -------------------------------------
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

    // ------------------------------------- Mobile Menu (HEADER) -------------------------------------
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

    // ------------------------- Textsldier - Головна сторінка (.workwithtemp) ------------------------------

    if (document.querySelector('.textslider')) {
        new Swiper('.textslider', {
            effect: 'fade',
            loop: true,
            speed: 700,
            pagination: {
                el: '.swiper-pagination',
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
    }

    // ------------------------------------- Слайдер Логотипів -------------------------------------
    if (document.querySelector('.logoslider')) {
        new Swiper('.logoslider', {
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
    }

    // ------------------------------------- Інпут маска для телефону -------------------------------------
    $('.telnum').inputmask({
        "mask": "+ 38 (999) 999-99-99",
        showMaskOnHover: false,
        showMaskOnFocus: false,
    });

    // footer міста
    // ------------------------------------- Footer - Міста, де ми працюємо: -------------------------------------
    $('.states').on('click', 'button', function (e) {
        e.preventDefault();

        const $button = $(this);
        const $list = $button.next('ul');

        $button.toggleClass('active');
        $button.attr('aria-expanded', $button.hasClass('active'));
        $list.stop(true, true).slideToggle(300);
    });

    // картинки анімація
    // -------------------- Анімація блоку - як на головній картинка в Hero секції ------------------------
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

    // ------------------------------------- Плавний скрол сторінок -------------------------------------
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
    // --------------------------- Анімація текстів (букви вилазять знизу вверх) ---------------------------
    Splitting();

    document.querySelectorAll('[data-splitting]').forEach(el => {
        if (el.classList.contains('benefits__service-anim')) {
            return;
        }

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

    // benefits__service: desktop — splitting, mobile — fade left/right
    (function initBenefitsServiceAnim() {
        const section = document.querySelector('.benefits__service');

        if (!section) {
            return;
        }

        const items = section.querySelectorAll('.benefits__service-anim');
        const mq = window.matchMedia('(min-width: 768px)');
        let mobileObserver = null;
        let desktopObserver = null;

        function setupDesktop() {
            if (mobileObserver) {
                mobileObserver.disconnect();
                mobileObserver = null;
            }

            items.forEach((el) => {
                el.classList.remove('is-fade-in');
            });

            if (desktopObserver) {
                desktopObserver.disconnect();
            }

            desktopObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = parseInt(entry.target.dataset.delay, 10) || 0;
                        setTimeout(() => {
                            entry.target.classList.add('in-view');
                        }, delay);
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -15% 0px' });

            items.forEach((el) => desktopObserver.observe(el));
        }

        function setupMobile() {
            if (desktopObserver) {
                desktopObserver.disconnect();
                desktopObserver = null;
            }

            items.forEach((el) => {
                el.classList.remove('in-view');
            });

            if (mobileObserver) {
                mobileObserver.disconnect();
            }

            mobileObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = parseInt(entry.target.dataset.delay, 10) || 0;
                        setTimeout(() => {
                            entry.target.classList.add('is-fade-in');
                        }, delay);
                    } else {
                        entry.target.classList.remove('is-fade-in');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -15% 0px' });

            items.forEach((el) => mobileObserver.observe(el));
        }

        function update() {
            if (mq.matches) {
                setupDesktop();
            } else {
                setupMobile();
            }
        }

        mq.addEventListener('change', update);
        update();
    })();

    // specialization__list: пункти з'являються по черзі зправа наліво
    (function initSpecializationListAnim() {
        const items = document.querySelectorAll('.specialization__list [data-fade]');

        if (!items.length) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.delay, 10) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('is-fade-in');
                    }, delay);
                } else {
                    entry.target.classList.remove('is-fade-in');
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

        items.forEach((el) => observer.observe(el));
    })();

    // об'єкти анімація
    // ---------------------- Анімація об'єктів при скролі (секція - .objects) ------------------------------
    // GSAP-анімація тільки якщо елемент є на сторінці
    function gsapScrollFrom(selector, vars) {
        if (!document.querySelector(selector)) {
            return;
        }

        gsap.from(selector, {
            scrollTrigger: {
                trigger: selector,
                start: 'top 90%',
                end: 'top 20%',
                scrub: 1,
            },
            ...vars,
        });
    }

    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
        gsapScrollFrom('.gsap1', { x: -400, y: -50 });
        gsapScrollFrom('.gsap2', { x: 250, y: -200 });
        gsapScrollFrom('.gsap3', { x: 400, y: 50 });
    });
    mm.add('(max-width: 767px)', () => {
        gsapScrollFrom('.gsap1', { x: -100, y: 30 });
        gsapScrollFrom('.gsap2', { x: 100, y: 50 });
        gsapScrollFrom('.gsap3', { x: -100, y: 30 });
    });
    // technology
    mm.add('(min-width: 992px)', () => {
        gsapScrollFrom('.gsaptec1', { x: -200, y: 200 });
        gsapScrollFrom('.gsaptec2', { x: 0, y: 200 });
        gsapScrollFrom('.gsaptec3', { x: 400, y: 100 });
        gsapScrollFrom('.gsaptec4', { x: -200, y: 100 });
        gsapScrollFrom('.gsaptec5', { x: 0, y: 200 });
        gsapScrollFrom('.gsaptec6', { x: 200, y: 150 });
    });
    mm.add('(min-width: 768px) and (max-width: 991.8px)', () => {
        gsapScrollFrom('.gsaptec1', { x: -150, y: 100 });
        gsapScrollFrom('.gsaptec2', { x: 150, y: 100 });
        gsapScrollFrom('.gsaptec3', { x: -150, y: 100 });
        gsapScrollFrom('.gsaptec4', { x: 150, y: 100 });
        gsapScrollFrom('.gsaptec5', { x: -150, y: 100 });
        gsapScrollFrom('.gsaptec6', { x: 150, y: 100 });
    });
    mm.add('(max-width: 767px)', () => {
        gsapScrollFrom('.gsaptec1', { x: -100, y: 100 });
        gsapScrollFrom('.gsaptec2', { x: 100, y: 100 });
        gsapScrollFrom('.gsaptec3', { x: -100, y: 100 });
        gsapScrollFrom('.gsaptec4', { x: 100, y: 100 });
        gsapScrollFrom('.gsaptec5', { x: -100, y: 100 });
        gsapScrollFrom('.gsaptec6', { x: 100, y: 100 });
    });


    // --------------------------- Слайдер з картинками - сторінка сервісів --------------------------------
    if (document.querySelector('.imageslider')) {
        new Swiper('.imageslider', {
            loop: true,
            speed: 900,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        });
    }

    // ----------------------------------------- Акордеони ----------------------------------------------
    $('.accordeon-wrap').on('click', '.accordeon__header', function () {
        const $header = $(this);
        const $row = $header.closest('.accordeon__row');
        const $body = $row.find('.accordeon__body');
        const $wrap = $header.closest('.accordeon-wrap');
        const isOpen = $header.hasClass('active');

        $wrap.find('.accordeon__row').not($row).each(function () {
            const $item = $(this);
            $item.removeClass('active');
            $item.find('.accordeon__header').removeClass('active');
            $item.find('.accordeon__body').stop(true, true).slideUp(300);
        });

        if (isOpen) {
            $row.removeClass('active');
            $header.removeClass('active');
            $body.stop(true, true).slideUp(300);
        } else {
            $row.addClass('active');
            $header.addClass('active');
            $body.stop(true, true).slideDown(300);
        }
    });
    // Відкриваємо перший айтем по замовчуванню в кожному .accordeon-wrap
    $('.accordeon-wrap').each(function () {
        const $firstRow = $(this).find('.accordeon__row').first();

        if (!$firstRow.length) {
            return;
        }

        $firstRow.addClass('active');
        $firstRow.find('.accordeon__header').addClass('active');
        $firstRow.find('.accordeon__body').show();
    });

    // ---------------------------------- Fancybox - галереї ---------------------------------------
    if (document.querySelector('.hidden-gallery [data-fancybox]')) {
        Fancybox.bind('.hidden-gallery [data-fancybox]', {
            // Your custom options
        });
    }

    $('.js-gallery-open').on('click', function (e) {
        e.preventDefault();

        const $firstLink = $(this)
            .closest('.accordeon__body')
            .find('.hidden-gallery [data-fancybox]')
            .first();

        if ($firstLink.length) {
            $firstLink[0].click();
        }
    });

    // ------------------------- Кнопка "Переглянути більше" (секція .price) ---------------------------
    $('.showmorebtn').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });

    // ------------------------------------- TECHNOLOGY -------------------------------------
    // Masonry-сітка: блоки йдуть 1-2-3 / 4-5-6, у колонках підтягуються вгору
    let technologyResizeTimer;

    // Кількість колонок залежно від ширини екрана
    function getTechnologyColCount() {
        if (window.innerWidth >= 992) {
            return 3;
        }

        if (window.innerWidth >= 768) {
            return 2;
        }

        return 1;
    }

    // Розкладає .technology__item по колонках по черзі (1→col1, 2→col2, 3→col3, 4→col1...)
    function buildTechnologyGrid() {
        const $grid = $('.technology__grid');

        if (!$grid.length) {
            return;
        }

        let $items = $grid.children('.technology__item');

        // Після першої збірки блоки вже в колонках — відновлюємо порядок через data-order
        if (!$items.length) {
            $items = $grid.find('.technology__item').sort(function (a, b) {
                return (+$(a).data('order') || 0) - (+$(b).data('order') || 0);
            });
        } else {
            $items.each(function (index) {
                $(this).attr('data-order', index);
            });
        }

        const colCount = getTechnologyColCount();
        const $columns = [];

        for (let i = 0; i < colCount; i++) {
            $columns.push($('<div class="technology__col"></div>'));
        }

        $items.detach().each(function (index) {
            $columns[index % colCount].append(this);
        });

        $grid.empty().append($columns);
    }

    // Ховає plusbtn, якщо текст повністю вміщується без розгортання
    function updateTechnologyButtons() {
        $('.technology__item').each(function () {
            const $item = $(this);
            const $descr = $item.find('.descr');
            const $btn = $item.find('.plusbtn');

            if (!$descr.length || !$btn.length) {
                return;
            }

            if ($btn.hasClass('active')) {
                $btn.removeClass('is-hidden');
                return;
            }

            const el = $descr[0];
            const isOverflowing = el.scrollHeight > el.clientHeight + 1;

            $btn.toggleClass('is-hidden', !isOverflowing);
        });
    }

    // Розгортання / згортання тексту в блоці
    $('.technology__item').on('click', '.plusbtn', function () {
        const $btn = $(this);

        if ($btn.hasClass('is-hidden')) {
            return;
        }

        $btn.toggleClass('active');
        $btn.attr('aria-expanded', $btn.hasClass('active'));

        if (!$btn.hasClass('active')) {
            updateTechnologyButtons();
        }
    });

    buildTechnologyGrid();
    updateTechnologyButtons();

    // Перебудова сітки та перевірка кнопок при зміні розміру вікна
    $(window).on('load resize', function () {
        clearTimeout(technologyResizeTimer);
        technologyResizeTimer = setTimeout(function () {
            buildTechnologyGrid();
            updateTechnologyButtons();
        }, 100);
    });

    // ----------------------------------------- Відгуки ----------------------------------------------
    // Слайдер відгуків + кнопка "Читати більше" / "Показати менше"
    // Текст обрізається до 4 рядків у CSS; кнопку ховаємо, якщо текст коротший

    let testimonialsResizeTimer; // таймер для debounce при resize вікна
    const testimonialReadMoreText = 'Читати більше';
    const testimonialReadLessText = 'Показати менше';

    // Перевіряє, чи текст довший за 4 рядки
    function isTestimonialOverflowing($descr) {
        const el = $descr[0];
        const contentEl = $descr.find('p')[0] || el;
        const styles = window.getComputedStyle(contentEl);
        const lineHeight = parseFloat(styles.lineHeight);
        const maxLines = 4;

        // Порівнюємо висоту тексту з line-height × 4 (надійніше, ніж scrollHeight + line-clamp)
        if (lineHeight && !Number.isNaN(lineHeight)) {
            return contentEl.scrollHeight > lineHeight * maxLines + 1;
        }

        // Запасний варіант, якщо line-height не вдалося отримати
        return el.scrollHeight > el.clientHeight + 1;
    }

    // Проходить по всіх відгуках і ховає кнопку, якщо текст вміщується в 4 рядки
    function updateTestimonialReadmore() {
        $('.testimonial__item').each(function () {
            const $item = $(this);
            const $descr = $item.find('.testimonial__descr');
            const $btn = $item.find('.testimonial__readmore');
            const $body = $item.find('.testimonial__body');

            if (!$descr.length || !$btn.length) {
                return;
            }

            // Якщо текст розгорнутий — кнопку лишаємо видимою (для "Показати менше")
            if ($body.hasClass('is-expanded')) {
                $btn.removeClass('is-hidden');
                return;
            }

            const isOverflowing = isTestimonialOverflowing($descr);

            $btn.toggleClass('is-hidden', !isOverflowing);
        });
    }

    // Ініціалізація слайдера відгуків

    if ($('.testimonials-slider').length > 0) {
        const testimonialsSwiper = new Swiper('.testimonials-slider', {
            loop: true,
            speed: 700,
            slidesPerView: 1,
            spaceBetween: 20,
            autoHeight: true, // висота слайдера підлаштовується під контент (важливо при розгортанні тексту)
            pagination: {
                el: '.testimonials-slider .swiper-pagination',
                clickable: true,
            },
            on: {
                // Після ініціалізації / зміни розміру слайдера — перевіряємо кнопки знову
                init: function () {
                    updateTestimonialReadmore();
                },
                resize: function () {
                    updateTestimonialReadmore();
                },
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            breakpoints: {

                575: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 4,
                },
            },
        });

        // Клік по "Читати більше" — розгортає текст, міняє підпис на "Показати менше"
        $('.testimonials-slider').on('click', '.testimonial__readmore', function () {
            const $btn = $(this);

            if ($btn.hasClass('is-hidden')) {
                return;
            }

            const $body = $btn.closest('.testimonial__body');
            const isExpanded = $body.hasClass('is-expanded');

            $body.toggleClass('is-expanded', !isExpanded);
            $btn.toggleClass('active', !isExpanded);
            $btn.text(isExpanded ? testimonialReadMoreText : testimonialReadLessText);

            testimonialsSwiper.update(); // перерахувати висоту слайдера після зміни тексту

            if (isExpanded) {
                updateTestimonialReadmore(); // після згортання — знову перевірити, чи потрібна кнопка
            }
        });

        updateTestimonialReadmore(); // перша перевірка при завантаженні сторінки

        // При зміні розміру вікна — перевірка кнопок + оновлення слайдера (debounce 100ms)
        $(window).on('load resize', function () {
            clearTimeout(testimonialsResizeTimer);
            testimonialsResizeTimer = setTimeout(function () {
                updateTestimonialReadmore();
                testimonialsSwiper.update();
            }, 100);
        });
    }

    // ------------------------- CASE SLIDER --------------------------------
    if (document.querySelector('.case-slider')) {
        new Swiper('.case-slider', {
            speed: 900,
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next.orange',
                prevEl: '.swiper-button-prev.orange',
            },
        });
    }

    // ------------------------- CASE VIDEO --------------------------------
    // Кастомна кнопка play по центру + poster; після старту — нативні controls
    (function initCaseVideo() {
        const blocks = document.querySelectorAll('.case-video__blox');

        if (!blocks.length) {
            return;
        }

        blocks.forEach((block) => {
            const video = block.querySelector('video');
            const playBtn = block.querySelector('.case-video__play');

            if (!video || !playBtn) {
                return;
            }

            function playVideo() {
                video.setAttribute('controls', '');
                block.classList.add('is-playing');

                const playPromise = video.play();

                if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(() => {
                        block.classList.remove('is-playing');
                        video.removeAttribute('controls');
                    });
                }
            }

            function showPlayButton() {
                if (!video.paused && !video.ended) {
                    return;
                }

                block.classList.remove('is-playing');
            }

            playBtn.addEventListener('click', playVideo);

            // Клік по самому відео, поки воно ще не грає
            video.addEventListener('click', function (e) {
                if (block.classList.contains('is-playing')) {
                    return;
                }

                e.preventDefault();
                playVideo();
            });

            video.addEventListener('pause', showPlayButton);
            video.addEventListener('ended', function () {
                block.classList.remove('is-playing');
                video.removeAttribute('controls');
                video.load(); // повертає poster після закінчення
            });
        });
    })();

})
