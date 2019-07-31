import { query, forEach } from '@stereorepo/sac';
import { TweenMax } from 'gsap';

class Form {
    constructor() {
        this.form = null;
        this.stepsWrappers = null;
        this.steps = null;
        this.formNav = null;
        this.activeStep = null;

        this.stepsLength = null;
        this.activeStepIndex = 0;
        this.followingIndex = 0;
    }
    setActive() {
        [this.activeStep] = query({ selector: '.active', ctx: this.form });
        forEach(this.steps, (step, index) => {
            if (step.classList.contains('active')) {
                this.activeStepIndex = index;
            }
        });
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
            x: this.followingIndex * -100 + '%'
        });
        this.activeStep.classList.remove('active');
        this.steps[this.followingIndex].classList.add('active');

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
    setupButtonNavigation() {
        const buttonForms = query({ selector: 'button', ctx: this.formNav });
        forEach(buttonForms, (buttonForm, index) => {
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
    setupInternalStepActivation() {
        forEach(this.steps, step => {
            step.addEventListener(
                'click',
                function() {
                    if (!step.classList.contains('accordion-active')) {
                        forEach(this.steps, stepToDeactivate => {
                            stepToDeactivate.classList.remove(
                                'accordion-active'
                            );
                        });
                        step.classList.add('accordion-active');
                    }
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
    }
}

export default Form;
