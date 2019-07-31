import { query, isDisplayed, superWindow } from '@stereorepo/sac';

const animHome = () => {
    const [imgHome] = query({ selector: '#img-home' });
    const [headerHome] = query({ selector: '#header-home' });

    if (!imgHome || !headerHome) return;

    let imgHomeBoundings = imgHome.getBoundingClientRect();
    let imgX = imgHomeBoundings.left;
    let imgWidth = parseInt(imgHomeBoundings.width);
    let cursorX = 0;

    headerHome.addEventListener(
        'mousemove',
        e => {
            if (!isDisplayed(imgHome)) return;

            cursorX = e.pageX - imgX;
            console.log('TCL: animHome -> cursorX', imgX);

            if (cursorX > 0) {
                imgHome.classList.add('on');
            } else {
                imgHome.classList.remove('on');
                cursorX = 0;
            }

            imgHome.style.width = `${imgWidth - cursorX}px`;
        },
        false
    );

    superWindow.addResizeEndFunction(() => {
        imgHome.style.width = '100%';
        imgHomeBoundings = imgHome.getBoundingClientRect();
        imgX = imgHomeBoundings.left;
        imgWidth = parseInt(imgHomeBoundings.width);
    });
};

export default animHome;
