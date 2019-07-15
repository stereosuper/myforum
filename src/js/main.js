import '../scss/main.scss';
import { TweenMax } from 'gsap';
import win from './Window.js';
import io from './io.js';
import scroll from './Scroll.js';
import fallback from './fallback.js';
import $ from 'jquery-slim';


import initForm from './form';
import animHome from './animHome';
import accordion from './accordion';
import accordion2 from './accordion2';
import rotate from './rotate';


const html = $('html');
const body = $('body');

const loadHandler = () => {
    scroll.init();
    win.noTransitionElts = $('.element-without-transition-on-resize');
    win.init();
    io.init();
    fallback(body, html);

    initForm();
    animHome();
    accordion();
    accordion2();
    rotate();

    $('#burger').on('click', function(){
        $('body').toggleClass('nav-header-open');
    });

    const popin = $('#popin');

    popin.on('click', function(e){
        if( $(e.target).hasClass('popin') )
            popin.addClass('off');
    }).on('click', '.btn-close', function(){
        popin.addClass('off');
    });
}

if (document.readyState === 'complete') {
   loadHandler();
} else {
   $(window).on('load', loadHandler);
}
