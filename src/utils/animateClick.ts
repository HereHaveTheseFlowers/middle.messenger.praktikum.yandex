export default function animateClick(el: HTMLElement | null, scale = 0.95) {
	if(!el) { return; }
    el.style.transition = '0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform';
    el.style.transform= `scale(${scale})`;
	setTimeout(() =>  {
		el.style.transform= '';
	}, 200);
}