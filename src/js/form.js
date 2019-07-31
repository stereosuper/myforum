import { query, forEach } from '@stereorepo/sac';
import { TweenMax } from 'gsap';

import $ from 'jquery-slim';

class Form {
    constructor() {
        this.form = null;
        this.stepsWrappers = null;
        this.steps = null;
        this.formNav = null;
        this.activeStep = null;

        this.stepsLength = null;
        this.activeStepIndex = 0;
    }
    setActive() {
        [this.activeStep] = query({ selector: '.active', ctx: this.form });
        forEach(this.steps, (step, index) => {
            if (step.classList.contains('active')) {
                this.activeStepIndex = index;
            }
        });
    }
    followingIndex({ direction, index }) {
        let followingIndex = index;
        if (direction === 'next') {
            followingIndex =
                index !== undefined ? index : this.activeStepIndex + 1;
        } else if (direction === 'prev') {
            followingIndex =
                index !== undefined ? index : this.activeStepIndex - 1;
        }
        return followingIndex;
    }
    moveForm(direction, index) {
        let max = 0;
        switch (direction) {
            case 'prev':
                max = 0;
                break;
            case 'next':
                max = this.stepsLength - 1;
                break;
            default:
                max = 0;
                break;
        }
        if (
            TweenMax.isTweening(this.form) ||
            this.steps[max].classList.contains('active')
        )
            return;

        let newIndex = this.followingIndex({ direction, index });

        if (this.steps[newIndex]) {
            TweenMax.to(this.form, 0.3, { x: newIndex * -100 + '%' });
            this.activeStep.classList.remove('active');
            this.steps[newIndex].classList.add('active');
        }

        this.setActive();

        if (!index) {
            const buttons = query({ selector: 'button', ctx: this.formNav });
            forEach(buttons, button => {
                button.classList.remove('active');
                buttons[this.activeStepIndex].classList.add('active');
            });
        }
    }
    setupArrowNavigation() {
        const [formNext] = query({ selector: '#form-next' });
        if (formNext) {
            formNext.addEventListener(
                'click',
                () => {
                    this.moveForm('next');
                },
                false
            );
        }

        const [formPrev] = query({ selector: '#form-prev' });
        if (formPrev) {
            formPrev.addEventListener(
                'click',
                () => {
                    this.moveForm('prev');
                },
                false
            );
        }
    }
    setupButtonNavigation() {
        const buttonForms = query({ selector: 'button', ctx: this.formNav });
        forEach(buttonForms, (buttonForm, btnIndex) => {
            buttonForm.addEventListener(
                'click',
                () => {
                    const buttons = query({
                        selector: 'button',
                        ctx: this.formNav
                    });
                    forEach(buttons, button => {
                        button.classList.remove('active');
                        button.blur();
                    });
                    buttonForm.classList.add('active');

                    if (btnIndex > this.activeStepIndex) {
                        this.moveForm('next', btnIndex);
                    } else if (btnIndex < this.activeStepIndex) {
                        this.moveForm('prev', btnIndex);
                    }
                },
                false
            );
        });
    }
    setupInternalStepActivation() {
        forEach(this.steps, step => {
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
    }
    setupTitleClick() {
        forEach(this.stepsWrappers, stepsWrapper => {
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
    }
    setStepsSizes() {
        forEach(this.stepsWrappers, (el, index) => {
            const formStep = query({
                selector: '.form-step',
                ctx: this.stepsWrappers[index]
            });
            this.stepsWrappers[index].style.minWidth =
                formStep.length * 100 + '%';
        });
    }
    initialize() {
        [this.form] = query({ selector: '#form' });
        if (!this.form) return;

        this.stepsWrappers = query({
            selector: '.js-form-steps',
            ctx: this.form
        });
        this.steps = query({ selector: '.js-form-step', ctx: this.form });
        this.stepsLength = this.steps.length;
        [this.formNav] = query({ selector: '#form-nav' });

        this.setActive();

        this.setStepsSizes();
        this.setupArrowNavigation();
        this.setupButtonNavigation();
        this.setupInternalStepActivation();
        this.setupTitleClick();
    }
}

export default Form;
