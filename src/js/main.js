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
    const stepsWrappers = form.find('.form-steps');
    const steps = form.find('.form-step');
    const nbSteps = steps.length;
    const formNav = $('#form-nav');
    let active, activeIndex = 0;

    const moveForm = (nbStep, dir) => {
        if( steps.eq(nbStep).hasClass('active') ) return;

        active = form.find('.active');
        activeIndex = steps.index(active);
        active.removeClass('active');

        if( dir === 'next' ){
            TweenLite.to(form, 0.3, {x: '-=100%'});
            steps.eq(activeIndex + 1).addClass('active');
        }else if( dir === 'prev'){
            TweenLite.to(form, 0.3, {x: '+=100%'});
            steps.eq(activeIndex - 1).addClass('active');
        }
        
        formNav.find('button').removeClass('active').eq(form.find('.active').index()).addClass('active');
    };

    stepsWrappers.each(i => {
        stepsWrappers.eq(i).css('min-width', (stepsWrappers.eq(i).find('.form-step').length * 100) + '%');
    });

    $('#form-next').on('click', function(){
        moveForm(nbSteps - 1, 'next');
    });
    $('#form-prev').on('click', function(){
        moveForm(0, 'prev');
    });

    steps.on('click', function(){
        if( !$(this).hasClass('accordion-active') )
            $(this).toggleClass('accordion-active').siblings().removeClass('accordion-active');
    });
    stepsWrappers.on('click', '.form-step-title', function(){
        if( !$(this).hasClass('open') )
            $(this).parent().addClass('open').siblings().removeClass('open');
    });

    $('#popin').on('click', function(e){
        if( $(e.target).hasClass('popin') )
            $('#popin').addClass('off');
    }).on('click', '.btn-close', function(){
        $('#popin').addClass('off');
    });
}

if (document.readyState === 'complete') {
   loadHandler();
} else {
   $(window).on('load', loadHandler);
}
