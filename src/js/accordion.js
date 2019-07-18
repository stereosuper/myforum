import { Accordion } from '@stereorepo/accordion';

const accordionHandler = () => {
    const accordions = new Accordion({
        containerSelector: '.js-accordion',
        clickedSelector: 'h3',
        contentWrapperSelector: '.content-wrapper',
        contentSelector: '.content'
    });

    accordions.initializeAccordions();
};

export default accordionHandler;
