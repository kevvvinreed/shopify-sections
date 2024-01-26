// Usage: scroll to 100px over 2000ms
// smoothScrollTo(100, 2000);

const smoothScrollTo = (targetY: number, duration: number) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const easeInOutQuad = (time: number, start: number, distance: number, duration: number) => {
        time /= duration / 2;
        if (time < 1) return (distance / 2) * time * time + start;
        time--;
        return (-distance / 2) * (time * (time - 2) - 1) + start;
    };

    const scroll = () => {
        const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        const timeElapsed = currentTime - startTime;
        const nextY = easeInOutQuad(timeElapsed, startY, distance, duration);

        window.scrollTo(0, nextY);

        if (timeElapsed < duration) {
            requestAnimationFrame(scroll);
        } else {
            window.scrollTo(0, targetY);
        }
    };

    requestAnimationFrame(scroll);
}

export default smoothScrollTo;