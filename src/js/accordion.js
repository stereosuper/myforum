import { Accordion } from '@stereorepo/accordion';

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
};

export default accordionHandler;
