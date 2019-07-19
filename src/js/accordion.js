import { query } from '@stereorepo/sac';
import { Accordion } from '@stereorepo/accordion';

// HACK: Simulating click
const simulateClick = function(elem) {
    // Create our event (with options)
    const evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    // If cancelled, don't dispatch our event
    const canceled = !elem.dispatchEvent(evt);
};

const accordionHandler = () => {
    const accordions = new Accordion({
        containerSelector: '.js-accordion',
        clickedSelector: '.js-accordion-title',
        contentWrapperSelector: '.js-content-wrapper',
        contentSelector: '.js-content',
        offsetY: 100,
        scrollDelay: 200
    });

    accordions.initializeAccordions();

    // HACK: Testing accordion insides
    // const [click] = query({ selector: '.js-accordion-title' });
    // simulateClick(click);
};

export default accordionHandler;
