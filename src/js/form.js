const $ = require('jquery-slim');

const initForm = () => {
    const form = $('#form');

    if( !form.length ) return;

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
};

export default initForm;
