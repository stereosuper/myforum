import { Accordion } from '@stereorepo/accordion';

const accordionHandler = () => {
    const accordions = new Accordion({
        containerSelector: '.js-accordion',
        clickedSelector: '.js-accordion-title',
        contentWrapperSelector: '.js-content-wrapper',
        contentSelector: '.js-content'
    });

    accordions.initializeAccordions();
};

export default accordionHandler;
