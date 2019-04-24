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

    const form = $('#form');
    const steps = form.find('.form-step');
    const nbSteps = steps.length;
    const formNav = $('#form-nav');

    const moveForm = (nbStep, dir) => {
        if( steps.eq(nbStep).hasClass('active') ) return;

        if( dir === 'next' ){
            TweenLite.to(form, 0.3, {x: '-=100%'});
            form.find('.active').removeClass('active').next().addClass('active');
        }else if( dir === 'prev'){
            TweenLite.to(form, 0.3, {x: '+=100%'});
            form.find('.active').removeClass('active').prev().addClass('active');
        }
        
        formNav.find('button').removeClass('active').eq(form.find('.active').index()).addClass('active');
    };

    $('#form-next').on('click', function(){
        moveForm(nbSteps - 1, 'next');
    });
    $('#form-prev').on('click', function(){
        moveForm(0, 'prev');
    });
}

if (document.readyState === 'complete') {
   loadHandler();
} else {
   $(window).on('load', loadHandler);
}
