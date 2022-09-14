import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { ChatsPage } from '../pages/chats/chats';
import { OptionsPage, updateProfileInfo } from '../pages/options/options';
import { ErrorPage } from '../pages/error/error';
import { TempPage } from '../pages/temp/temp';

import { Button } from '../components/button';
import animateClick from './animateClick';
import setupForm from './setupForm';

//temporary simple router emplementation
export const simpleRouter: Record<string, () => void> = {
  login: function() { 
    const root = document.querySelector('#app');
    if(!root) return;
  
    const loginPage = new LoginPage();
    root.innerHTML = '';
    root.append(loginPage.getContent()!);
    loginPage.dispatchComponentDidMount();
    setupForm('login__form');
  },  
  registration: function() { 
    const root = document.querySelector('#app');
    if(!root) return;
    
    const registrationPage = new RegistrationPage();
    root.innerHTML = '';
    root.append(registrationPage.getContent()!);
    registrationPage.dispatchComponentDidMount();
    setupForm('registration__form');
  },  
  chats: function() { 
    const root = document.querySelector('#app');
    if(!root) return;

    const chatsPage = new ChatsPage();
    root.innerHTML = '';
    root.append(chatsPage.getContent()!);
    chatsPage.dispatchComponentDidMount();
    setupForm('selectedchat__messagefield');
  },  
  options: function() { 
    const root = document.querySelector('#app');
    if(!root) return;

    const optionsPage = new OptionsPage();
    root.innerHTML = '';
    root.append(optionsPage.getContent()!);
    optionsPage.dispatchComponentDidMount();
    setupForm('options__editpassword');
    setupForm('options__editinfo');
  
    updateProfileInfo();
    const button__goback: HTMLElement | null = document.querySelector(".button__goback")
    if(button__goback) {
      button__goback.addEventListener("click", function() {
        animateClick(button__goback);
        setTimeout(() =>  {
            simpleRouter.temp()
        }, 400);
      });
    }
    const avatar__edit = document.querySelector(".avatar__edit")
    if(avatar__edit) {
      avatar__edit.addEventListener("click", function() {
        const avatarupload: HTMLElement | null  = document.querySelector(".avatarupload")
        if(avatarupload) {
          avatarupload.style.display = 'flex';
          setTimeout(() =>  {
            avatarupload.style.opacity = '1';
          }, 1);
        }
      });
    }
    const avatarupload__background = document.querySelector(".avatarupload__background")
    if(avatarupload__background) {
      avatarupload__background.addEventListener("click", function() {
        const avatarupload: HTMLElement | null  = document.querySelector(".avatarupload")
        if(!avatarupload) return;
        if(avatarupload.style.opacity != '1') return;
        avatarupload.style.opacity = '0'
        setTimeout(() =>  {
            avatarupload.style.display = 'none'
        }, 200);
      });
    }
  },  
  error404: function() { 
    const root = document.querySelector('#app');
    if(!root) return;
    const errorbutton = new Button({
      label: "Back to chats",
      addedClassList: ["error__button"],
      type: "button",
      bgshape: true,
      events: {
        click: () => {
          animateClick(errorbutton.element);
          setTimeout(() =>  {
            simpleRouter.temp()
          }, 400);
        }
      }
    });
    const error404Page = new ErrorPage({ 
      errorNumber: "404",
      errorDesc: "Wrong page",
      errorButton: errorbutton
    });
    root.innerHTML = '';
    root.append(error404Page.getContent()!);
    error404Page.dispatchComponentDidMount();

  },
  error500: function() { 
    const root = document.querySelector('#app');
    if(!root) return;
    const errorbutton = new Button({
      label: "Back to chats",
      addedClassList: ["error__button"],
      type: "button",
      bgshape: true,
      events: {
        click: () => {
          animateClick(errorbutton.element);
          setTimeout(() =>  {
            simpleRouter.temp()
          }, 400);
        }
      }
    });
    const error500Page = new ErrorPage({ 
      errorNumber: "500",
      errorDesc: "Working on it",
      errorButton: errorbutton
    });
    root.innerHTML = '';
    root.append(error500Page.getContent()!);
    error500Page.dispatchComponentDidMount();
  },
  temp: function() { 
    const root = document.querySelector('#app');
    if(!root) return;
    const tempPage = new TempPage();
    root.innerHTML = '';
    root.append(tempPage.getContent()!);
    tempPage.dispatchComponentDidMount();
    for(const el of document.querySelectorAll(".temp__links__a")) {
      el.addEventListener("click", function() {
        switch(el.innerHTML) {
          case "Login":
            simpleRouter.login()
            break;
          case "Registration":
            simpleRouter.registration()
            break;
          case "Chats":
            simpleRouter.chats()
            break;
          case "Options":
            simpleRouter.options()
            break;
          case "404":
            simpleRouter.error404()
            break;
          case "500":
            simpleRouter.error500()
            break;
        }
      });
    }
  }
};