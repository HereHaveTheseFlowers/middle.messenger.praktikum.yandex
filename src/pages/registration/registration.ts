import animateClick  from '../../utils/animateClick';
import template from './registration.hbs';
import '../../components/button';
import '../../components/mainlogo';
import '../../components/auth_row';

const data = [  { title: "Email",          name: "email",          type: "text",       placeholder: "Email"}, 
                { title: "Login",          name: "login",          type: "text",       placeholder: "Login"}, 
                { title: "First Name",     name: "first_name",     type: "text",       placeholder: "First Name"}, 
                { title: "Last Name",      name: "second_name",    type: "text",       placeholder: "Last Name"}, 
                { title: "Phone",          name: "phone",          type: "text",       placeholder: "Phone"}, 
                { title: "Password",       name: "password",       type: "password",   placeholder: "Password"},
                { title: "Password (Again)",name: "password",       type: "password",   placeholder: "Password (Again)"}]

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  if(app) app.innerHTML = template({ auth: data });
  for(let el of document.querySelectorAll(".animate-click")) {
      el.addEventListener("click", function() {
          animateClick(el);
      });
  }
  for(let el of document.querySelectorAll(".registration__signin")) {
      el.addEventListener("click", function() {
          setTimeout(() =>  {
              window.location.href='../../pages/login/login.html'
          }, 400);
      });
  }
  
});
