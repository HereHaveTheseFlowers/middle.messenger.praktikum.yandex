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
import store from '../../utils/Store';
import UserController from '../../controllers/UserController';
import { ChangeProfileData, ChangePasswordData } from '../../api/UserAPI';

export class OptionsPage extends Block {
    constructor() {
        super('div');
        this.element!.classList.add("flexcontainer")
        this.element!.classList.add("options")
    }
    init() {
        store.on('user', () => {
          this.updateProfileInfo();
        });

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
      setupForm('options__editpassword', this);
      setupForm('options__editinfo', this);
      setupForm('avatarupload__form', this, true);
    
      this.updateProfileInfo();
      const button__goback: HTMLElement | null = document.querySelector(".button__goback")
      if(button__goback) {
        button__goback.addEventListener("click", function() {
          animateClick(button__goback);
          setTimeout(() =>  {
            Router.go('/messenger')
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
    public updateProfileInfo() {
      if(!store.getState().user) return;
      const userdata: Record<string, any> | undefined = store.getState().user;
      if(!userdata) return;
      if(!userdata.display_name) userdata.display_name = userdata.first_name;
      if(userdata.avatar) {
        const avatarImage = document.querySelector('.avatar__image') as HTMLImageElement;
        if(avatarImage) avatarImage.src = 'https://ya-praktikum.tech/api/v2/resources' + userdata.avatar;
      }
      for(const elName of document.getElementsByClassName('options__attribute__sizebig')) {
        elName.textContent = userdata.display_name;
      }
      for(const el of document.getElementsByClassName('options__profile')) {
        for(const child of el.children) {
          if(hasClass(child, 'options__row')) {
            if(!child.lastElementChild || !child.firstElementChild) return
            for(const instance of profileList) {
              if(instance.name && instance.attrFirst === child.firstElementChild.textContent) {
                child.lastElementChild.textContent = userdata[instance.name];
              }
            }
          }
        }
      }
      for(const el of document.getElementsByClassName('options__editinfo')) {
        for(const child of el.children) {
          if(hasClass(child, 'options__row')) {
            if(!child.lastElementChild || !child.lastElementChild.firstElementChild || !child.firstElementChild) return;
            const inputv: HTMLInputElement = <HTMLInputElement>child.lastElementChild.firstElementChild
            for(const instance of editInfoList) {
              if(instance.name && instance.attrFirst === child.firstElementChild.textContent) {
                inputv.value = userdata[instance.name]
              }
            }
          }
        }
      }
    }
    onSubmit(data: ChangeProfileData | ChangePasswordData | FormData, submitType: string) {
      if(submitType === 'options__editpassword') {
        UserController.updatePassword(data as ChangePasswordData);
      } else if(submitType === 'options__editinfo') {
        UserController.updateProfile(data as ChangeProfileData);
      } else {
        UserController.updateAvatar(data as FormData)
      }
    }
    render() {
        return this.compile(template, this.props);
    }
}
