import animateClick from '../../utils/animateClick.js';
import hasClass from '../../utils/hasClass.js';
import template from './options.hbs';
import '../../components/button';
import '../../components/arrow';
import '../../components/options_row';
import avatarsvg from 'url:../../img/avatar.svg';

const titles = [{ title: "Email",          name: "email",          type: "text"}, 
                { title: "Login",          name: "login",          type: "text"}, 
                { title: "First Name",     name: "first_name",     type: "text"}, 
                { title: "Last Name",      name: "second_name",    type: "text"}, 
                { title: "Displayed Name", name: "display_name",   type: "text"}, 
                { title: "Phone",          name: "phone",          type: "text"}]

const titles_editpassword = [   { title: "Old password",         name: "oldPassword", type: "password", placeholder: "•••••••••"    }, 
                                { title: "New Password",         name: "newPassword", type: "password", placeholder: "•••••••••••"  }, 
                                { title: "New Password (Again)", name: "newPassword", type: "password", placeholder: "•••••••••••"  }]
const userdata = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    firstname: 'Ivan',
    secondname: 'Ivanov',
    displayedname: 'Ivan',
    phone: '+7 (909) 967 30 30',
}
let avatarupload,
avatarupload__background;

// updates the .options__profile info
function updateProfileInfo() {
    for(let elName of document.getElementsByClassName('options__attribute__sizebig')) {
        elName.textContent = userdata.displayedname;
    }
    for(let el of document.getElementsByClassName('options__profile')) {
        let i = 0;
        for(let child of el.childNodes) {
            if(hasClass(child, 'options__row')) {
                child.lastElementChild.textContent = Object.entries(userdata)[i][1];
                i++;
            }
        }
    }
    for(let el of document.getElementsByClassName('options__editinfo')) {
        let i = 0;
        for(let child of el.childNodes) {
            if(hasClass(child, 'options__row')) {
                child.lastElementChild.value = Object.entries(userdata)[i][1];
                i++;
            }
        }
    }
}

function pageStartup() {
    document.querySelector('.avatar__image').src = avatarsvg
    for(let el of document.querySelectorAll(".avatarupload")) {
        avatarupload = el;
    }
    for(let el of document.querySelectorAll(".avatarupload__background")) {
        avatarupload__background = el;
    }
    updateProfileInfo();
    
    // Assigning behaviour to buttons
    for(let el of document.querySelectorAll("button")) {
        if(hasClass(el, "animate-click")) {
            el.addEventListener("click", function() {
                animateClick(el);
            });
        }
        if (hasClass(el, "button__goback") || hasClass(el, "options__button__backtochats")) {
            el.addEventListener("click", function() {
                setTimeout(() =>  {
                    window.location.href='../../index.html'
                }, 400);
            });
        }
        if(hasClass(el, "avatar__edit")) {
            el.addEventListener("click", function() {
                avatarupload.style.display = 'flex';
                setTimeout(() =>  {
                    avatarupload.style.opacity = 1;
                }, 1);
            });
        }
        if(hasClass(el, "options__button__editinfo")) {
            el.addEventListener("click", function() {
                for(let profile of document.getElementsByClassName('options__profile'))
                    profile.style.display = 'none';
                for(let profile of document.getElementsByClassName('options__editinfo'))
                    profile.style.display = 'block';
            });
        }
        if(hasClass(el, "options__button__saveinfo")) {
            el.addEventListener("click", function() {
                for(let editinfo of document.getElementsByClassName('options__editinfo'))
                    editinfo.style.display = 'none';
                for(let profile of document.getElementsByClassName('options__profile'))
                    profile.style.display = 'block';
            });
        }
        if(hasClass(el, "options__button__changepassword")) {
            el.addEventListener("click", function() {
                for(let profile of document.getElementsByClassName('options__profile'))
                    profile.style.display = 'none';
                for(let editpassword of document.getElementsByClassName('options__editpassword'))
                    editpassword.style.display = 'block';
            });
        }
        if(hasClass(el, "options__button__savepassword")) {
            el.addEventListener("click", function() {
                for(let editpassword of document.getElementsByClassName('options__editpassword'))
                    editpassword.style.display = 'none';
                for(let profile of document.getElementsByClassName('options__profile'))
                    profile.style.display = 'block';
            });
        }
    }
    avatarupload__background.addEventListener("click", function() {
        if(avatarupload.style.opacity != '1') return;
        avatarupload.style.opacity = 0
        setTimeout(() =>  {
            avatarupload.style.display = 'none'
        }, 200);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#app');
  
    app.innerHTML = template({ titles: titles, titles_editpassword: titles_editpassword});
    pageStartup();
});
  