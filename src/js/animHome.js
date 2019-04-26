const $ = require('jquery-slim');

const animHome = () => {
    const imgHome = $('#img-home');

    if( !imgHome.length ) return;

    const imgX = imgHome.offset().left;
    const imgWidth = parseInt(imgHome.css('width'));
    let cursorX = 0;
    
    $('#header-home').on('mousemove', function(e){
        if( !imgHome.is(':visible') ) return;

        cursorX = e.pageX - imgX;

        if( cursorX > 0 ){
            imgHome.addClass('on');
        }else{
            imgHome.removeClass('on');
            cursorX = 0;
        }

        imgHome.css('width', (imgWidth - cursorX) + 'px');
    });
};

export default animHome;
