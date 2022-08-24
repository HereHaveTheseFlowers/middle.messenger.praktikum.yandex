const { animateClick } = require('../../utils/animateClick.js');

module.exports.setupError = function () {
    for(let el of document.querySelectorAll(".animate-click")) {
        el.addEventListener("click", function() {
            animateClick(el);
        });
    }
    for(let el of document.querySelectorAll(".error__button")) {
        el.addEventListener("click", function() {
            setTimeout(() =>  {
                window.location.href='../../index.html'
            }, 400);
        });
    }
}

