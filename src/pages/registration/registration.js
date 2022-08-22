const { animateClick } = require('../../utils/animateClick.js');

for(let el of document.querySelectorAll(".animate-click")) {
    el.addEventListener("click", function() {
        animateClick(el);
    });
}