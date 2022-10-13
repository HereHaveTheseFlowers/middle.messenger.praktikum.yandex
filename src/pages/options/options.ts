import template from './options.hbs';
import Block from '../../utils/Block';
import { OptionsRow, OptionsRowProps } from './optionsRow';
import { Button } from '../../components/button';
import { Arrow } from '../../components/arrow';
import animateClick from '../../utils/animateClick';
import hasClass from '../../utils/hasClass';
import Router from '../../utils/Router';
import { editPasswordList } from './editPasswordList';
import { editInfoList } from './editInfoList';
import { profileList } from './profileList';
import setupForm from '../../utils/setupForm';

// Temporary solution while we dont recieve anything from the server
export const userdata: { [index: string]: string; } = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    firstname: 'Ivan',
    secondname: 'Ivanov',
    displayedname: 'Ivan',
    phone: '+79099673030',
}

export function updateProfileInfo() {
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
          if(!child.lastElementChild || !child.lastElementChild.firstElementChild) return;
          const inputv: HTMLInputElement = <HTMLInputElement>child.lastElementChild.firstElementChild
          inputv.value = Object.entries(userdata)[i][1];
          i++;
        }
      }
    }
  }

export class OptionsPage extends Block {
    constructor() {
        super('div');
        this.element!.classList.add("flexcontainer")
        this.element!.classList.add("options")
    }
    init() {
        this.children.arrow = new Arrow({ flip: true });

        this.children.buttonBackToChats = new Button({
            label: "Back to chats",
            addedClassList: ["options__button", "options__button__backtochats"],
            type: "button",
            shapeDir: "left",
            bgshape: true,
            events: {
                click: () => { 
                    animateClick(this.children.buttonBackToChats.element);
                    setTimeout(() =>  {
                        Router.go('/messenger')
                    }, 400);
                }
            }
        });
        this.children.buttonChangePassword = new Button({
            label: "Change password",
            addedClassList: ["options__button", "options__button__changepassword"],
            type: "button",
            shapeDir: "right",
            bgshape: true,
            events: {
              click: () => { 
                animateClick(this.children.buttonChangePassword.element);
                setTimeout(() =>  {
                    for(const profile of document.querySelectorAll<HTMLElement>('.options__profile'))
                        profile.style.display = 'none';
                    for(const editpassword of document.querySelectorAll<HTMLElement>('.options__editpassword'))
                        editpassword.style.display = 'block';
                    }, 400);
                }
            }
        });
        this.children.buttonEditInfo  = new Button({
            label: "Edit info",
            addedClassList: ["options__button", "options__button__editinfo"],
            type: "button",
            shapeDir: "left",
            bgshape: true,
            events: {
                click: () => { 
                    animateClick(this.children.buttonEditInfo.element);
                    setTimeout(() =>  {
                        for(const profile of document.querySelectorAll<HTMLElement>('.options__profile'))
                            profile.style.display = 'none';
                        for(const profile of document.querySelectorAll<HTMLElement>('.options__editinfo'))
                            profile.style.display = 'block';
                    }, 400);
                }
            }
          });

        this.children.buttonAvatarUpload = new Button({
            label: "Submit",
            type: "button",
            events: {
              click: () => { 
                animateClick(this.children.buttonAvatarUpload.element);
                setTimeout(() =>  {
                  const avatarupload: HTMLElement | null = document.querySelector(".avatarupload")
                  if(avatarupload) {
                    avatarupload.style.display = 'none';
                  }
                }, 400);
              }
            }
        });

        this.children.buttonSavePassword = new Button({
            label: "Save",
            addedClassList: ["options__button", "options__button__savepassword"],
            type: "button",
            bgshape: true,
            events: {
              click: () => {
                animateClick(this.children.buttonSavePassword.element);
                setTimeout(() =>  {
                  for(const editpassword of document.querySelectorAll<HTMLElement>('.options__editpassword'))
                      editpassword.style.display = 'none';
                  for(const profile of document.querySelectorAll<HTMLElement>('.options__profile'))
                      profile.style.display = 'block';
                }, 400);
              }
            }
        });

        this.children.buttonSaveInfo = new Button({
            label: "Save",
            addedClassList: ["options__button", "options__button__saveinfo"],
            type: "button",
            bgshape: true,
            events: {
              click: () => { 
                animateClick(this.children.buttonSaveInfo.element);
                setTimeout(() =>  {
                  for(const editinfo of document.querySelectorAll<HTMLElement>('.options__editinfo'))
                      editinfo.style.display = 'none';
                  for(const profile of document.querySelectorAll<HTMLElement>('.options__profile'))
                      profile.style.display = 'block';
                }, 400);
              }
            }
        });

        this.childrenCollection.profileList = profileList.map((title: OptionsRowProps) => new OptionsRow(title))
        this.childrenCollection.editInfoList = editInfoList.map((title: OptionsRowProps) => new OptionsRow(title))
        this.childrenCollection.editPasswordList = editPasswordList.map((title: OptionsRowProps) => new OptionsRow(title))
    }

    componentDidMount() {
        
      setupForm('options__editpassword');
      setupForm('options__editinfo');
    
      updateProfileInfo();
      const button__goback: HTMLElement | null = document.querySelector(".button__goback")
      if(button__goback) {
        button__goback.addEventListener("click", function() {
          animateClick(button__goback);
          setTimeout(() =>  {
              Router.go('/temp')
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
    }
    render() {
        return this.compile(template, this.props);
    }
}
