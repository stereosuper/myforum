import '../scss/main.scss';
import { superLoad, query } from '@stereorepo/sac';

import io from './components/io';

import Form from './components/form';
import animHome from './components/animHome';
import accordion from './components/accordion';

const preloadHandler = () => {
    io.init();

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

const loadHandler = () => {
    const form = new Form();
    form.initialize();
};

superLoad.initializeLoadingShit({
    preloadCallback: preloadHandler,
    loadCallback: loadHandler,
    noTransElementsClass: '.element-without-transition-on-resize'
});
