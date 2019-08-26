import { superWindow } from '@stereorepo/sac';
import { Accordion } from '@stereorepo/accordion';

// HACK: Simulating click
// const simulateClick = function(elem) {
//     // Create our event (with options)
//     const evt = new MouseEvent('click', {
//         bubbles: true,
//         cancelable: true,
//         view: window
//     });
//     // If cancelled, don't dispatch our event
//     // const canceled = !elem.dispatchEvent(evt);
// };

const accordionHandler = () => {
    const form = document.querySelector('.js-form-accordion');

    if (!form) return;

    const state = {
        accordionsFormInitiated: false
    };
    const accordionsAccount = new Accordion({
        containerSelector: '.js-accordion',
        clickedSelector: '.js-accordion-title',
        contentWrapperSelector: '.js-content-wrapper',
        contentSelector: '.js-content',
        offsetY: 100,
        scrollDelay: 200,
        noScroll: false,
        silent: true
    });

    const accordionsForm = new Accordion({
        containerSelector: '.js-form-accordion',
        clickedSelector: '.js-form-accordion-title',
        contentWrapperSelector: '.js-form-accordion-content-wrapper',
        contentSelector: '.js-form-accordion-content',
        offsetY: 100,
        scrollDelay: 200,
        noScroll: false,
        silent: false
    });

    const accordionsInstanceHandler = accordions => {
        if (superWindow.windowWidth <= 580 && !state.accordionsFormInitiated) {
            //console.log(accordions);
            state.accordionsFormInitiated = true;

            accordions.initializeAccordions();
        } else if (superWindow.windowWidth > 580) {
            state.accordionsFormInitiated = false;

            accordions.destroyAccordions();
        }
    };

    accordionsAccount.initializeAccordions();
    accordionsInstanceHandler(accordionsForm);

    superWindow.addResizeEndFunction(() => {
        accordionsInstanceHandler(accordionsForm);
    });

    // HACK: Testing accordion insides
    // const [click1, click2] = query({ selector: '.js-accordion-title' });
    // const [click3, click4] = query({ selector: '.js-form-accordion-title' });
    // simulateClick(click1);
    // simulateClick(click2);
    // simulateClick(click3);
    // simulateClick(click4);
};

export default accordionHandler;
