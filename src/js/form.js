const $ = require('jquery-slim');
import { TweenMax } from 'gsap';

const initForm = () => {
    const form = $('#form');

    if (!form.length) return;

    const stepsWrappers = form.find('.form-steps');
    const steps = form.find('.form-step');
    const nbSteps = steps.length;
    const formNav = $('#form-nav');
    let active,
        activeIndex = 0,
        btnIndex;

    const setActive = () => {
        active = form.find('.active');
        activeIndex = steps.index(active);
    };

    const moveForm = (max, dir, index) => {
        if (TweenMax.isTweening(form) || steps.eq(max).hasClass('active'))
            return;

        let newIndex = index;

        setActive();
        active.removeClass('active');

        if (dir === 'next') {
            newIndex = newIndex !== undefined ? newIndex : activeIndex + 1;
            TweenMax.to(form, 0.3, { x: newIndex * -100 + '%' });
            steps.eq(newIndex).addClass('active');
        } else if (dir === 'prev') {
            newIndex = newIndex !== undefined ? newIndex : activeIndex - 1;
            TweenMax.to(form, 0.3, { x: newIndex * -100 + '%' });
            steps.eq(newIndex).addClass('active');
        }

        setActive();

        if (!index)
            formNav
                .find('button')
                .removeClass('active')
                .eq(activeIndex)
                .addClass('active');
    };

    setActive();

    stepsWrappers.each(i => {
        stepsWrappers
            .eq(i)
            .css(
                'min-width',
                stepsWrappers.eq(i).find('.form-step').length * 100 + '%'
            );
    });

    $('#form-next').on('click', function() {
        moveForm(nbSteps - 1, 'next');
    });
    $('#form-prev').on('click', function() {
        moveForm(0, 'prev');
    });

    formNav.on('click', 'button', function() {
        btnIndex = $(this)
            .parent()
            .index();

        formNav
            .find('button')
            .removeClass('active')
            .blur();
        $(this).addClass('active');

        if (btnIndex > activeIndex) {
            moveForm(nbSteps - 1, 'next', btnIndex);
        } else if (btnIndex < activeIndex) {
            moveForm(0, 'prev', btnIndex);
        }
    });

    steps.on('click', function() {
        if (!$(this).hasClass('accordion-active'))
            $(this)
                .toggleClass('accordion-active')
                .siblings()
                .removeClass('accordion-active');
    });
    stepsWrappers.on('click', '.form-step-title', function() {
        if (!$(this).hasClass('open'))
            $(this)
                .parent()
                .addClass('open')
                .siblings()
                .removeClass('open');
    });
};

export default initForm;
