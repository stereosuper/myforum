import { query, forEach, superPolyfill } from '@stereorepo/sac';

const io = function() {
    this.resized = true;

    this.init = () => {
        superPolyfill.initializeIntersectionObserver();

        const objectsToIO = query({ selector: '[data-io]' });
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0.15) {
                        this[`${entry.target.dataset.io}In`](entry.target);
                        if (entry.target.hasAttribute('data-io-single'))
                            observer.unobserve(entry.target);
                    } else if (entry.intersectionRatio < 0.15) {
                        this[`${entry.target.dataset.io}Out`](entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '-100px 0px'
            }
        );

        forEach(objectsToIO, obj => {
            if (!obj.hasAttribute('data-io-observed')) {
                observer.observe(obj);
                obj.setAttribute('data-io-observed', '');
            }
        });
    };
};

export default new io();
