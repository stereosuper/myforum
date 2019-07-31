import '../scss/main.scss';
import { superLoad, query } from '@stereorepo/sac';

import io from './io.js';

import initForm from './form';
import animHome from './animHome';
import accordion from './accordion';

const preloadHandler = () => {
    io.init();

    initForm();
    animHome();
    accordion();

    const [burger] = query({ selector: '#burger' });
    if (burger) {
        burger.addEventListener(
            'click',
            () => {
                document.body.classList.toggle('nav-header-open');
            },
            false
        );
    }

    const [popin] = query({ selector: '#popin' });
    if (popin) {
        popin.addEventListener(
            'click',
            e => {
                if (e.target.classList.contains('popin'))
                    popin.classList.add('off');
            },
            false
        );
    }

    const [closeButton] = query({ selector: '.btn-close', ctx: popin });
    if (closeButton) {
        closeButton.addEventListener(
            'click',
            () => {
                popin.classList.add('off');
            },
            false
        );
    }
};

superLoad.initializeLoadingShit({
    preloadCallback: preloadHandler,
    noTransElementsClass: '.element-without-transition-on-resize'
});
