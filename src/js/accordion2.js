const $ = require('jquery');



const accordion2 = () => {
    // const containerClick = document.getElementsByClassName('accordion-title');
    const containerClick2 = $('.subaccordion-title');
    
    // const subBlockDisplay = document.getElementsByClassName('accordion-content');
    // const subBlockDisplay = $('.accordion-content');
    containerClick2.on('click', function(){
        let brother2 = $(this).next('.content-content');
        brother2.slideToggle(300);
        console.log(brother2);

    
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








export default accordion2;
