import animateClick  from '../../utils/animateClick.js';
import template from './500.hbs';
import '../../components/button';
import '../../components/error';

function pageStartup() {
  for(let el of document.querySelectorAll(".error__button")) {
    el.addEventListener("click", function() {
        setTimeout(() =>  {
            window.location.href='../../index.html'
        }, 400);
    });
  }
  
  for(let el of document.querySelectorAll(".animate-click")) {
      el.addEventListener("click", function() {
          animateClick(el);
      });
  }
}
window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  app.innerHTML = template({});
  pageStartup();
});
