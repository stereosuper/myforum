import { query, forEach, superWindow } from '@stereorepo/sac';
import { TweenMax } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import ThrowPropsPlugin from '../plugins/ThrowPropsPlugin';

// NOTE: We need to use ThrowPropsPlugin in order to ensure that the plugin won't be tree-shaked
const ensureThrowProps = ThrowPropsPlugin;

class Form {
    constructor() {
        this.form = null;
        this.stepsWrappers = null;
        this.steps = null;
        this.formNav = null;
        this.buttonForms = null;
        this.activeStep = null;

        this.stepsLength = 0;
        this.activeStepIndex = 0;
        this.followingIndex = 0;

        this.resizeHandler = this.resizeHandler.bind(this);
    }
    setActive() {
        [this.activeStep] = query({ selector: '.active-step', ctx: this.form });
        forEach(this.steps, (step, index) => {
            if (step.classList.contains('active-step')) {
                this.activeStepIndex = index;
            }
        });
    }
    initializeActive() {
        if (superWindow.windowWidth > 580) {
            this.dataStepIndex = this.form.dataset.section
                ? parseInt(this.form.dataset.section, 10) - 1
                : 0;
            if (this.steps[this.dataStepIndex]) {
                this.steps[this.dataStepIndex].classList.add('active-step');
                TweenMax.to(this.form, 0.3, {
                    x: `${this.dataStepIndex * -100}%`
                });
                TweenMax.to(document.querySelector('.js-form-nav-steps'), 0.3, {
                    x: `${this.dataStepIndex * -55}px`
                });
                const height =
                    this.steps[this.dataStepIndex].querySelector(
                        '.js-form-accordion-content'
                    ).clientHeight + 'px';

                this.steps[this.dataStepIndex].closest(
                    '.js-form-steps'
                ).style.height = height;
                this.form.style.height = height;
            }
        }

        this.setActive();

        this.activateButton();
    }
    setFollowingIndex({ direction, index }) {
        if (direction === 'next') {
            this.followingIndex =
                index !== undefined ? index : this.activeStepIndex + 1;
        } else if (direction === 'prev') {
            this.followingIndex =
                index !== undefined ? index : this.activeStepIndex - 1;
        }
    }
    checkHasFollowing({ direction, index, callback }) {
        this.setFollowingIndex({
            direction,
            index
        });
        if (
            this.steps[this.followingIndex] &&
            !TweenMax.isTweening(this.form)
        ) {
            callback();
        }
    }
    moveForm() {
        TweenMax.to(this.form, 0.3, {
            x: `${this.followingIndex * -100}%`
        });
        this.activeStep.classList.remove('active-step');
        this.steps[this.followingIndex].classList.add('active-step');
        TweenMax.to(document.querySelector('.js-form-nav-steps'), 0.3, {
            x: `${this.followingIndex * -55}px`
        });

        const height =
            this.steps[this.followingIndex].querySelector(
                '.js-form-accordion-content'
            ).clientHeight + 'px';

        this.steps[this.followingIndex].closest(
            '.js-form-steps'
        ).style.height = height;

        this.form.style.height = height;

        this.setActive();
    }
    activateButton() {
        const buttons = query({ selector: 'button', ctx: this.formNav });
        forEach(buttons, button => {
            button.classList.remove('active');
            buttons[this.activeStepIndex].classList.add('active');
        });
    }
    setupArrowNavigation() {
        const [formNext] = query({ selector: '#form-next' });
        if (formNext) {
            formNext.addEventListener(
                'click',
                () => {
                    this.checkHasFollowing({
                        direction: 'next',
                        callback: () => {
                            this.moveForm();
                            this.activateButton();
                        }
                    });
                },
                false
            );
        }

        const [formPrev] = query({ selector: '#form-prev' });
        if (formPrev) {
            formPrev.addEventListener(
                'click',
                () => {
                    this.checkHasFollowing({
                        direction: 'prev',
                        callback: () => {
                            this.moveForm();
                            this.activateButton();
                        }
                    });
                },
                false
            );
        }
    }
    draggableButtonNavigation() {
        Draggable.create('.js-form-nav-steps', {
            type: 'x',
            edgeResistance: 0.9,
            bounds: '#form-nav',
            lockAxis: true,
            throwProps: true,
            throwResistance: 900,
            maxDuration: 0.75
        });
    }
    setupButtonNavigation() {
        this.buttonForms = query({ selector: 'button', ctx: this.formNav });
        forEach(this.buttonForms, (buttonForm, index) => {
            buttonForm.addEventListener(
                'click',
                () => {
                    if (index === this.activeStepIndex) return;
                    let direction = '';
                    if (index > this.activeStepIndex) {
                        direction = 'next';
                    } else if (index < this.activeStepIndex) {
                        direction = 'prev';
                    }

                    this.checkHasFollowing({
                        direction,
                        index,
                        callback: () => {
                            const buttons = query({
                                selector: 'button',
                                ctx: this.formNav
                            });
                            forEach(buttons, button => {
                                button.classList.remove('active');
                                button.blur();
                            });
                            buttonForm.classList.add('active');

                            this.moveForm();
                        }
                    });
                },
                false
            );
        });
    }
    setStepsSizes() {
        forEach(this.stepsWrappers, stepsWrapper => {
            const formStep = query({
                selector: '.form-step',
                ctx: stepsWrapper
            });
            TweenMax.set(stepsWrapper, {
                minWidth: `${formStep.length * 100}%`
            });
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

        setTimeout(() => {
            this.initializeActive();
        }, 100);

        this.setStepsSizes();
        this.setupArrowNavigation();
        this.setupButtonNavigation();
        this.draggableButtonNavigation();

        superWindow.addResizeFunction(this.resizeHandler);
    }
    resizeHandler() {
        forEach(this.stepsWrappers, stepsWrapper => {
            const formStep = query({
                selector: '.form-step',
                ctx: stepsWrapper
            });
            if (superWindow.windowWidth > 580) {
                TweenMax.set(stepsWrapper, {
                    minWidth: `${formStep.length * 100}%`
                });
            } else {
                TweenMax.set(stepsWrapper, {
                    clearProps: 'all'
                });
                TweenMax.set(this.form, {
                    clearProps: 'all'
                });
                forEach(this.buttonForms, button => {
                    button.classList.remove('active');
                    button.blur();
                });
                this.activeStepIndex = 0;
                this.activateButton();
            }
        });
    }
}

export default Form;
