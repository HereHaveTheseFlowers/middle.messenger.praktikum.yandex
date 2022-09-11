import { LoginPage, authrows } from './pages/login/login';
import { RegistrationPage, authrows_registration } from './pages/registration/registration';
import { ChatsPage, chats, selectedchat } from './pages/chats/chats';
import { OptionsPage, titles_editpassword, titles__editinfo, titles } from './pages/options/options';
import { ErrorPage } from './pages/error/error';
import { TempPage } from './pages/temp/temp';
import { Mainlogo } from './components/mainlogo/index.ts';
import { AuthRow } from './components/auth_row/index.ts';
import { Button } from './components/button/index.ts';
import { Arrow } from './components/arrow';
import animateClick from './utils/animateClick';

  //temporary simple router emplementation
const simplerouter: Record<string, () => void> = {
  login: function() { 
    const root = document.querySelector('#app')!;
    const mainlogo = new Mainlogo();
    const buttonlogin = new Button({
      label: "Sign In",
      added_class: "login__submit",
      type: "button",
      bgshape: true,
      events: {
        click: () => { 
          animateClick(buttonlogin.element);;
        }
      }
    });
    const buttonregister = new Button({
      label: "Create account",
      added_class: "login__createaccount",
      type: "button",
      events: {
        click: () => { 
          animateClick(buttonregister.element);
          setTimeout(() =>  {
            simplerouter.registration()
          }, 400);
        }
      }
    });
    const loginPage = new LoginPage({ 
      mainlogo: mainlogo, 
      authrows: authrows, 
      buttonlogin: buttonlogin,
      buttonregister: buttonregister
    });
    root.innerHTML = '';
    root.append(loginPage.getContent()!);
    loginPage.dispatchComponentDidMount();
  },  
  registration: function() { 
    const root = document.querySelector('#app')!;
    const mainlogo = new Mainlogo();
    const buttonlogin = new Button({
      label: "Sign In",
      added_class: "registration__signin",
      type: "button",
      events: {
        click: () => {
          animateClick(buttonlogin.element);
          setTimeout(() =>  {
            simplerouter.login()
          }, 400);
        }
      }
    });
    const buttonregister = new Button({
      label: "Create account",
      added_class: "registration__submit",
      type: "button",
      bgshape: true,
      events: {
        click: () => { 
          animateClick(buttonregister.element);
        }
      }
    });
    const registrationPage = new RegistrationPage({ 
      mainlogo: mainlogo, 
      authrows: authrows_registration, 
      buttonlogin: buttonlogin,
      buttonregister: buttonregister
    });
    root.innerHTML = '';
    root.append(registrationPage.getContent()!);
    registrationPage.dispatchComponentDidMount();
  },  
  chats: function() { 
    const root = document.querySelector('#app')!;
    const buttonprofile = new Button({
      label: "Profile >",
      added_class: "chatlist__profilebutton",
      type: "button",
      events: {
        click: () => { 
          animateClick(buttonprofile.element);
          setTimeout(() =>  {
            simplerouter.temp()
          }, 400);
        }
      }
    });
    const buttonoptions = new Button({
      label: "",
      added_class: "selectedchat__optionsbutton",
      type: "button",
      events: {
        click: () => { 
          animateClick(buttonoptions.element);
        }
      }
    });
    const buttonattachment = new Button({
      label: "",
      added_class: "selectedchat__attachment",
      type: "button",
      events: {
        click: () => { 
          animateClick(buttonattachment.element);
          let selectedchat__attachment = document.querySelector(".selectedchat__attachment")
          if(selectedchat__attachment) {
            selectedchat__attachment.addEventListener("click", function() {
              let attachmentmenu = document.querySelector(".attachmentmenu")
              if(attachmentmenu) {
                if(!attachmentmenu.style.display)
                  attachmentmenu.style.display = "flex"
                else
                  attachmentmenu.style.display = ""
              }
            });
          }
        }
      }
    });
    const arrow = new Arrow({});
    const chatsPage = new ChatsPage({ 
      chats: chats, 
      buttonprofile: buttonprofile,
      arrow: arrow,
      buttonattachment: buttonattachment,
      selectedchat: selectedchat,
      buttonoptions: buttonoptions
    });
    root.innerHTML = '';
    root.append(chatsPage.getContent()!);
    chatsPage.dispatchComponentDidMount();

  },  
  options: function() { 
    const root = document.querySelector('#app')!;
    const arrow = new Arrow({ flip: "true"});

    const buttonbacktochats = new Button({
      label: "Back to chats",
      added_class: ["options__button", "options__button__backtochats"],
      type: "button",
      shape_dir: "left",
      bgshape: true,
      events: {
        click: () => { 
          animateClick(buttonbacktochats.element);
          setTimeout(() =>  {
            simplerouter.temp()
          }, 400);
        }
      }
    });
    const buttonchangepassword = new Button({
      label: "Change password",
      added_class: ["options__button", "options__button__changepassword"],
      type: "button",
      shape_dir: "right",
      bgshape: true,
      events: {
        click: () => { 
          animateClick(buttonchangepassword.element);
        }
      }
    });
    const buttoneditinfo = new Button({
      label: "Edit info",
      added_class: ["options__button", "options__button__editinfo"],
      type: "button",
      shape_dir: "left",
      bgshape: true,
      events: {
        click: () => { 
          animateClick(buttoneditinfo.element);
        }
      }
    });

    const buttonsaveinfo = new Button({
      label: "Save",
      added_class: ["options__button", "options__button__saveinfo"],
      type: "button",
      bgshape: true,
      events: {
        click: () => { 
          animateClick(buttonsaveinfo.element);
        }
      }
    });
    const buttonavatarupload = new Button({
      label: "Submit",
      added_class: "",
      events: {
        click: () => { 
          animateClick(buttonavatarupload.element);
        }
      }
    });
    const buttonsavepassword = new Button({
      label: "Save",
      added_class: ["options__button", "options__button__savepassword"],
      type: "button",
      bgshape: true,
      events: {
        click: () => { 
          animateClick(buttonsavepassword.element);
        }
      }
    });
    const optionsPage = new OptionsPage({ 
      titles: titles, 
      titles__editinfo: titles__editinfo,
      titles_editpassword: titles_editpassword,
      arrow: arrow,
      buttonsavepassword: buttonsavepassword,
      buttonavatarupload: buttonavatarupload,
      buttonsaveinfo: buttonsaveinfo,
      buttoneditinfo: buttoneditinfo,
      buttonchangepassword: buttonchangepassword,
      buttonbacktochats: buttonbacktochats
    });
    root.innerHTML = '';
    root.append(optionsPage.getContent()!);
    optionsPage.dispatchComponentDidMount();
    const button__goback = document.querySelector(".button__goback")
    if(button__goback) {
      button__goback.addEventListener("click", function() {
        animateClick(button__goback);
        setTimeout(() =>  {
          simplerouter.temp()
        }, 400);
      });
    }
  },  
  error404: function() { 
    const root = document.querySelector('#app')!;
    const errorbutton = new Button({
      label: "Back to chats",
      added_class: "error__button",
      type: "button",
      bgshape: true,
      events: {
        click: () => {
          animateClick(errorbutton.element);
          setTimeout(() =>  {
            simplerouter.temp()
          }, 400);
        }
      }
    });
    const error404Page = new ErrorPage({ 
      error_number: "404",
      error_desc: "Wrong page",
      errorbutton: errorbutton
    });
    root.innerHTML = '';
    root.append(error404Page.getContent()!);
    error404Page.dispatchComponentDidMount();

  },
  error500: function() { 
    const root = document.querySelector('#app')!;
    const errorbutton = new Button({
      label: "Back to chats",
      added_class: "error__button",
      type: "button",
      bgshape: true,
      events: {
        click: () => {
          animateClick(errorbutton.element);
          setTimeout(() =>  {
            simplerouter.temp()
          }, 400);
        }
      }
    });
    const error500Page = new ErrorPage({ 
      error_number: "500",
      error_desc: "Working on it",
      errorbutton: errorbutton
    });
    root.innerHTML = '';
    root.append(error500Page.getContent()!);
    error500Page.dispatchComponentDidMount();
  },
  temp: function() { 
    const root = document.querySelector('#app')!;
    const tempPage = new TempPage({});
    root.innerHTML = '';
    root.append(tempPage.getContent()!);
    tempPage.dispatchComponentDidMount();
    for(let el of document.querySelectorAll(".temp__links__a")) {
      el.addEventListener("click", function() {
        switch(el.innerHTML) {
          case "Login":
            simplerouter.login()
            break;
          case "Registration":
            simplerouter.registration()
            break;
          case "Chats":
            simplerouter.chats()
            break;
          case "Options":
            simplerouter.options()
            break;
          case "404":
            simplerouter.error404()
            break;
          case "500":
            simplerouter.error500()
            break;
        }
      });
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  simplerouter.temp();
});
