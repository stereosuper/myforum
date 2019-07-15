const $ = require('jquery');

const rotate = () => {
    const blockFatherArrow = $('.subaccordion-title-check');
    const arrow = $('.icon-arrowright');
    
    blockFatherArrow.on('click', function(){
        arrow.style.transform = 'rotate90deg';
    })
    
}
console.log(rotate);
export default rotate;