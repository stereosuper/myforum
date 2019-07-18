const $ = require('jquery-slim');

const rotate = () => {
    const blockFatherArrow = $('.subaccordion-title-check');
    const arrow = $('.icon-arrowright');

    blockFatherArrow.on('click', () => {
        arrow.style.transform = 'rotate90deg';
    });
};
export default rotate;
