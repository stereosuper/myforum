import { query, nodeIndex, forEach } from '@stereorepo/sac';
import { TweenMax } from 'gsap';

import $ from 'jquery-slim';

const initForm = () => {
    const [form] = query({ selector: '#form' });

    if (!form) return;

    const stepsWrappers = query({ selector: '.form-steps', ctx: form });
    const steps = query({ selector: '.form-step', ctx: form });
    const nbSteps = steps.length;
    const [formNav] = query({ selector: '#form-nav' });
    let active,
        activeIndex = 0,
        btnIndex;

    const setActive = () => {
        [active] = query({ selector: '.active', ctx: form });
        activeIndex = nodeIndex(active);
    };

    const moveForm = (max, dir, index) => {
        if (
            TweenMax.isTweening(form) ||
            steps[max].classList.contains('active')
        )
            return;

        let newIndex = index;

        setActive();
        active.classList.remove('active');

        if (dir === 'next') {
            newIndex = newIndex !== undefined ? newIndex : activeIndex + 1;
            TweenMax.to(form, 0.3, { x: newIndex * -100 + '%' });
            steps[newIndex].classList.add('active');
        } else if (dir === 'prev') {
            newIndex = newIndex !== undefined ? newIndex : activeIndex - 1;
            TweenMax.to(form, 0.3, { x: newIndex * -100 + '%' });
            steps[newIndex].classList.add('active');
        }

        setActive();

        if (index) {
            const buttons = query({ selector: 'button', ctx: formNav });
            forEach(buttons, button => {
                button.classList.remove('active');
                buttons[activeIndex].classList.add('active');
            });
        }
    };

    setActive();

    forEach(stepsWrappers, (el, index) => {
        const [formStep] = query({
            selector: '.form-step',
            ctx: stepsWrappers[index]
        });
        stepsWrappers[index].style.minWidth = formStep.length * 100 + '%';
    });

    const [formNext] = query({ selector: '#form-next' });
    if (formNext) {
        formNext.addEventListener(
            'click',
            () => {
                moveForm(nbSteps - 1, 'next');
            },
            false
        );
    }

    const [formPrev] = query({ selector: '#form-prev' });
    if (formPrev) {
        formPrev.addEventListener(
            'click',
            () => {
                moveForm(0, 'prev');
            },
            false
        );
    }

    const buttonForms = query({ selector: 'button', ctx: formNav });
    forEach(buttonForms, buttonForm => {
        buttonForm.addEventListener(
            'click',
            () => {
                btnIndex = nodeIndex(buttonForm.parentElement);

                const buttons = query({ selector: 'button', ctx: formNav });
                forEach(buttons, button => {
                    button.classList.remove('active');
                    button.blur();
                });
                buttonForm.classList.add('active');

                if (btnIndex > activeIndex) {
                    moveForm(nbSteps - 1, 'next', btnIndex);
                } else if (btnIndex < activeIndex) {
                    moveForm(0, 'prev', btnIndex);
                }
            },
            false
        );
    });

    forEach(steps, step => {
        step.addEventListener(
            'click',
            function() {
                if (!$(this).hasClass('accordion-active'))
                    $(this)
                        .toggleClass('accordion-active')
                        .siblings()
                        .removeClass('accordion-active');
            },
            false
        );
    });

    forEach(stepsWrappers, stepsWrapper => {
        const [formStepTitle] = query({
            selector: '.form-step-title',
            ctx: stepsWrapper
        });

        formStepTitle.addEventListener(
            'click',
            function() {
                if (!$(this).hasClass('open'))
                    $(this)
                        .parent()
                        .addClass('open')
                        .siblings()
                        .removeClass('open');
            },
            false
        );
    });
};

export default initForm;
