import template from './options.hbs';
import Block from '../../utils/Block';
import { OptionsRow, OptionsRowProps } from '../../components/options_row';
import { Button } from '../../components/button';
import { Arrow } from '../../components/arrow';

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
    arrow: Arrow;
    buttonsavepassword: Button;
    buttonavatarupload: Button;
    buttonsaveinfo: Button;
    buttoneditinfo: Button;
    buttonchangepassword: Button;
    buttonbacktochats: Button;
}
    
export class OptionsPage extends Block<OptionsPageProps> {
    constructor(props: OptionsPageProps) {
        super('div', props);
        this.element!.classList.add("flexcontainer")
        this.element!.classList.add("options")
    }
    init() {
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
