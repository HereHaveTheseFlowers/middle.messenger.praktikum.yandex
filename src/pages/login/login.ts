import animateClick  from '../../utils/animateClick';
import template from './login.hbs';
import '../../components/button';
import '../../components/mainlogo';
import '../../components/auth_row';

type Nullable<T> = T | null;

let data: Array<object> = [ { title: "Login",          name: "login",          type: "text",        placeholder: "Login"}, 
                            { title: "Password",       name: "password",       type: "password",    placeholder: "Password"}]

window.addEventListener('DOMContentLoaded', () => {
  const app: Nullable<HTMLDivElement> = document.querySelector('#app');

  if(app) app.innerHTML = template({ auth: data });

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
});
