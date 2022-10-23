export default function fade(element: HTMLElement | string | null, fadeOption = 'auto', fadeTiming = 200) {
    if(!element) return;
    if(typeof element === 'string') {
        element = document.querySelector(element) as HTMLElement;
    }
    if(fadeOption === 'auto') {
        if(element.classList.contains('hidden')) {
            fade(element, 'in');
        } else {
            fade(element, 'out');
        }
    }
    else if(fadeOption === 'out') {
        const fadeTime = fadeTiming / 1000;
        element.style.transition = `${fadeTime}s opacity`; // 0.2s by default
        element.style.opacity = '0';
        setTimeout(() =>  {
            const timeOutElement = element as HTMLElement;
            timeOutElement.classList.add('hidden')
        }, fadeTiming + 100);
    }
    else if(fadeOption === 'in') {
        const fadeTime = fadeTiming / 1000;
        element.style.opacity = '0';
        element.classList.remove('hidden')
        element.style.transition = `${fadeTime}s opacity`; // 0.2s by default
        setTimeout(() =>  {
            const timeOutElement = element as HTMLElement;
            timeOutElement.style.opacity = '1';
        }, 10);
    }
}