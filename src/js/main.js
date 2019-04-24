import '../scss/main.scss';


import { TweenLite, TimelineLite } from 'gsap';


import win from './Window.js';
import io from './io.js';
import scroll from './Scroll.js';
import fallback from './fallback.js';
import $ from 'jquery-slim';

const html = $('html');
const body = $('body');

const loadHandler = () => {
    scroll.init();
    win.noTransitionElts = $('.element-without-transition-on-resize');
    win.init();
    io.init();
    fallback(body, html);

    $('#burger').on('click', function(){
        $('body').toggleClass('nav-header-open');
    });
}

if (document.readyState === 'complete') {
   loadHandler();
} else {
   $(window).on('load', loadHandler);
}
