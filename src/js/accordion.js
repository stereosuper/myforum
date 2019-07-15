const $ = require('jquery');


const accordion = () => {
    // const containerClick = document.getElementsByClassName('accordion-title');
    const containerClick = $('.accordion-title');
    // const subBlockDisplay = document.getElementsByClassName('accordion-content');
    // const subBlockDisplay = $('.accordion-content');
    containerClick.on('click', function(){
        let brother = $(this).next('.accordion-content');
        brother.slideToggle(300);
        console.log(brother);
        
        // $('.accordion-title').siblings().on('click');
        // subBlockDisplay.slideToggle(300);
    });
    // containerClick[0].addEventListener('click', function() {
        
    //     subBlockDisplay[0].style.display = 'block';
    //     console.log('hello');
    //     // document.querySelector('html').classList.toggle('menu-open');
        
    // }, ); 

    // containerClick.addEventListener('click', function() {
        
    //     subBlockDisplay.style.display = 'none';
    //     // document.querySelector('html').classList.toggle('menu-open');
    // } )
}





export default accordion;
