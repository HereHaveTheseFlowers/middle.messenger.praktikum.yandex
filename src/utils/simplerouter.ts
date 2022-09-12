import { LoginPage, authrows } from '../pages/login/login';
import { RegistrationPage, authrows_registration } from '../pages/registration/registration';
import { ChatsPage, chats, selectedchat } from '../pages/chats/chats';
import { OptionsPage, titles_editpassword, titles__editinfo, titles, userdata } from '../pages/options/options';
import { ErrorPage } from '../pages/error/error';
import { TempPage } from '../pages/temp/temp';
import { Button } from '../components/button';
import { Arrow } from '../components/arrow';
import animateClick from '../utils/animateClick';
import hasClass from '../utils/hasClass';

//temporary simple router emplementation
export const simplerouter: Record<string, () => void> = {
  login: function() { 
    const root = document.querySelector('#app');
    if(!root) return;
    const buttonlogin = new Button({
      label: "Sign In",
      added_class: "login__submit",
      type: "button",
      bgshape: true,
      events: {
        click: () => { 
          animateClick(buttonlogin.element);
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
      authrows: authrows, 
      buttonlogin: buttonlogin,
      buttonregister: buttonregister
    });
    root.innerHTML = '';
    root.append(loginPage.getContent()!);
    loginPage.dispatchComponentDidMount();
  },  
  registration: function() { 
    const root = document.querySelector('#app');
    if(!root) return;
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
      authrows: authrows_registration, 
      buttonlogin: buttonlogin,
      buttonregister: buttonregister
    });
    root.innerHTML = '';
    root.append(registrationPage.getContent()!);
    registrationPage.dispatchComponentDidMount();
  },  
  chats: function() { 
    const root = document.querySelector('#app');
    if(!root) return;
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
          const selectedchat__attachment = document.querySelector(".selectedchat__attachment")
          if(selectedchat__attachment) {
            selectedchat__attachment.addEventListener("click", function() {
              const attachmentmenu: HTMLElement | null = document.querySelector(".attachmentmenu")
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
    const root = document.querySelector('#app');
    if(!root) return;

    function updateProfileInfo() {
      for(const elName of document.getElementsByClassName('options__attribute__sizebig')) {
          elName.textContent = userdata.displayedname;
      }
      for(const el of document.getElementsByClassName('options__profile')) {
        let i = 0;
        for(const child of el.children) {
          if(hasClass(child, 'options__row')) {
            if(!child.lastElementChild) return
            child.lastElementChild.textContent = Object.entries(userdata)[i][1];
            i++;
          }
        }
      }
      for(const el of document.getElementsByClassName('options__editinfo')) {
        let i = 0;
        for(const child of el.children) {
          if(hasClass(child, 'options__row')) {
            if(!child.lastElementChild) return
            const inputv: HTMLInputElement = <HTMLInputElement>child.lastElementChild
            inputv.value = Object.entries(userdata)[i][1];
            i++;
          }
        }
      }
    }
    const optionsPage = new OptionsPage({ 
      titles: titles, 
      titles__editinfo: titles__editinfo,
      titles_editpassword: titles_editpassword
    });
    root.innerHTML = '';
    root.append(optionsPage.getContent()!);
    optionsPage.dispatchComponentDidMount();
    updateProfileInfo();
    const button__goback: HTMLElement | null = document.querySelector(".button__goback")
    if(button__goback) {
      button__goback.addEventListener("click", function() {
        animateClick(button__goback);
        setTimeout(() =>  {
            simplerouter.temp()
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
    const root = document.querySelector('#app');
    if(!root) return;
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