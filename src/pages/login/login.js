const { animateClick } = require('../../utils/animateClick.js');

for(let el of document.querySelectorAll(".animate-click")) {
    el.addEventListener("click", function() {
        animateClick(el);
    });
}
for(let el of document.querySelectorAll(".login__createaccount")) {
    el.addEventListener("click", function() {
        setTimeout(() =>  {
            window.location.href='../../pages/registration/registration.html'
        }, 400);
    });
}
