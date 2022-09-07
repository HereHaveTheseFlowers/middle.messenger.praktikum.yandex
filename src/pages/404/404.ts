import animateClick  from '../../utils/animateClick';
import template from './404.hbs';
import '../../components/button';
import '../../components/error';

type Nullable<T> = T | null;

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
  const app: Nullable<HTMLDivElement> = document.querySelector('#app');
  if(app)
    app.innerHTML = template({});
  pageStartup();
});
