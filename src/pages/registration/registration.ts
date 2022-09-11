import template from './registration.hbs';
import Block from '../../utils/Block';
import Mainlogo from '../../components/mainlogo/index.ts';
import { AuthRow, AuthProps } from '../../components/auth_row/index.ts';
import { Button } from '../../components/button/index.ts';

type Nullable<T> = T | null;

export let authrows_registration: Array<any> = [ {div_class: "registration__field", name: "email", type: "text", placeholder: "Email"}, 
                            {div_class: "registration__field", name: "login", type: "text", placeholder: "Login"}, 
                            {div_class: "registration__field", name: "first_name", type: "text", placeholder: "First Name"}, 
                            {div_class: "registration__field", name: "second_name", type: "text", placeholder: "Last Name"}, 
                            {div_class: "registration__field", name: "phone", type: "text", placeholder: "Phone"}, 
                            {div_class: "registration__field", name: "password", type: "password", placeholder: "Password"}, 
                            {div_class: "registration__field", name: "password", type: "password", placeholder: "Password (Again)"}]


interface RegistrationPageProps {
    mainlogo: Mainlogo;
    authrows: Array<any>;
    buttonlogin: Button;
    buttonregister: Button;
}
    
export class RegistrationPage extends Block<RegistrationPageProps> {
    constructor(props: RegistrationPageProps) {
        super('div', props);
        this.element!.classList.add("flexcontainer")
    }
    init() {
        this.childrenCollection.authrows = this.props.authrows.map((authrow: AuthProps) => new AuthRow(authrow))
    }
    render() {
        return this.compile(template, { mainlogo: this.props.mainlogo, buttonlogin: this.props.buttonlogin, buttonregister: this.props.buttonregister });
    }
}

