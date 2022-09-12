import template from './options.hbs';
import Block from '../../utils/Block';
import { OptionsRow, OptionsRowProps } from '../../components/options_row';
import { Button } from '../../components/button';
import { Arrow } from '../../components/arrow';
import animateClick from '../../utils/animateClick';
import { simplerouter } from '../../utils/simplerouter';

export const userdata: { [index: string]: string; } = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    firstname: 'Ivan',
    secondname: 'Ivanov',
    displayedname: 'Ivan',
    phone: '+7 (909) 967 30 30',
}

export const titles_editpassword: Array<object>  = [    { input: "true", attr_first: "Old password",         name: "oldPassword", type: "password", placeholder: "•••••••••"    }, 
                                                        { input: "true", attr_first: "New Password",         name: "newPassword", type: "password", placeholder: "•••••••••••"  }, 
                                                        { input: "true", attr_first: "New Password (Again)", name: "newPassword", type: "password", placeholder: "•••••••••••"  }]

export const titles__editinfo: Array<object> = [{ input: "true", attr_first: "Email",          name: "email",          type: "text"}, 
                                                { input: "true", attr_first: "Login",          name: "login",          type: "text"}, 
                                                { input: "true", attr_first: "First Name",     name: "first_name",     type: "text"}, 
                                                { input: "true", attr_first: "Last Name",      name: "second_name",    type: "text"}, 
                                                { input: "true", attr_first: "Displayed Name", name: "display_name",   type: "text"}, 
                                                { input: "true", attr_first: "Phone",          name: "phone",          type: "text"}]

export const titles: Array<object> = [  { attr_first: "Email" }, 
                                        { attr_first: "Login" }, 
                                        { attr_first: "First Name" }, 
                                        { attr_first: "Last Name" }, 
                                        { attr_first: "Displayed Name" }, 
                                        { attr_first: "Phone" }]
interface OptionsPageProps {
    titles: Array<object>;
    titles__editinfo: Array<object>;
    titles_editpassword: Array<object>;
}
    
export class OptionsPage extends Block<OptionsPageProps> {
    constructor(props: OptionsPageProps) {
        super('div', props);
        this.element!.classList.add("flexcontainer")
        this.element!.classList.add("options")
    }
    init() {
        this.children.arrow = new Arrow({ flip: "true" });

        this.children.buttonbacktochats = new Button({
            label: "Back to chats",
            added_class: ["options__button", "options__button__backtochats"],
            type: "button",
            shape_dir: "left",
            bgshape: true,
            events: {
                click: () => { 
                    animateClick(this.children.buttonbacktochats.element);
                    setTimeout(() =>  {
                        simplerouter.temp()
                    }, 400);
                }
            }
        });
        this.children.buttonchangepassword = new Button({
            label: "Change password",
            added_class: ["options__button", "options__button__changepassword"],
            type: "button",
            shape_dir: "right",
            bgshape: true,
            events: {
              click: () => { 
                animateClick(this.children.buttonchangepassword.element);
                setTimeout(() =>  {
                    for(const profile of document.querySelectorAll<HTMLElement>('.options__profile'))
                        profile.style.display = 'none';
                    for(const editpassword of document.querySelectorAll<HTMLElement>('.options__editpassword'))
                        editpassword.style.display = 'block';
                    }, 400);
                }
            }
        });
        this.children.buttoneditinfo  = new Button({
            label: "Edit info",
            added_class: ["options__button", "options__button__editinfo"],
            type: "button",
            shape_dir: "left",
            bgshape: true,
            events: {
                click: () => { 
                    animateClick(this.children.buttoneditinfo.element);
                    setTimeout(() =>  {
                        for(const profile of document.querySelectorAll<HTMLElement>('.options__profile'))
                            profile.style.display = 'none';
                        for(const profile of document.querySelectorAll<HTMLElement>('.options__editinfo'))
                            profile.style.display = 'block';
                    }, 400);
                }
            }
          });

        this.children.buttonavatarupload = new Button({
            label: "Submit",
            added_class: "",
            type: "button",
            events: {
              click: () => { 
                animateClick(this.children.buttonavatarupload.element);
                setTimeout(() =>  {
                  const avatarupload: HTMLElement | null = document.querySelector(".avatarupload")
                  if(avatarupload) {
                    avatarupload.style.opacity = '0';
                    setTimeout(() =>  {
                      avatarupload.style.display = 'none';
                    }, 200);
                  }
                }, 400);
              }
            }
        });

        this.children.buttonsavepassword = new Button({
            label: "Save",
            added_class: ["options__button", "options__button__savepassword"],
            type: "button",
            bgshape: true,
            events: {
              click: () => {
                animateClick(this.children.buttonsavepassword.element);
                setTimeout(() =>  {
                  for(const editpassword of document.querySelectorAll<HTMLElement>('.options__editpassword'))
                      editpassword.style.display = 'none';
                  for(const profile of document.querySelectorAll<HTMLElement>('.options__profile'))
                      profile.style.display = 'block';
                }, 400);
              }
            }
        });

        this.children.buttonsaveinfo = new Button({
            label: "Save",
            added_class: ["options__button", "options__button__saveinfo"],
            type: "button",
            bgshape: true,
            events: {
              click: () => { 
                animateClick(this.children.buttonsaveinfo.element);
                setTimeout(() =>  {
                  for(const editinfo of document.querySelectorAll<HTMLElement>('.options__editinfo'))
                      editinfo.style.display = 'none';
                  for(const profile of document.querySelectorAll<HTMLElement>('.options__profile'))
                      profile.style.display = 'block';
                }, 400);
              }
            }
        });

        this.childrenCollection.titles = this.props.titles.map((title: OptionsRowProps) => new OptionsRow(title))
        this.props.titles = [];
        this.childrenCollection.titles__editinfo = this.props.titles__editinfo.map((title: OptionsRowProps) => new OptionsRow(title))
        this.props.titles__editinfo = [];
        this.childrenCollection.titles_editpassword = this.props.titles_editpassword.map((title: OptionsRowProps) => new OptionsRow(title))
        this.props.titles_editpassword = [];
    }
    render() {
        return this.compile(template, this.props);
    }
}
