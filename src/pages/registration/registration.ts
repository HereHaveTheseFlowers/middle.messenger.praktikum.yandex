import template from './registration.hbs';
import Block from '../../utils/Block';
import { Mainlogo } from '../../components/mainlogo';
import { AuthRow, AuthProps } from '../../components/auth_row';
import { Button } from '../../components/button/index.ts';

export const authrows_registration: Array<object> = [ {div_class: "registration__field", name: "email", type: "text", placeholder: "Email"}, 
                            {div_class: "registration__field", name: "login", type: "text", placeholder: "Login"}, 
                            {div_class: "registration__field", name: "first_name", type: "text", placeholder: "First Name"}, 
                            {div_class: "registration__field", name: "second_name", type: "text", placeholder: "Last Name"}, 
                            {div_class: "registration__field", name: "phone", type: "text", placeholder: "Phone"}, 
                            {div_class: "registration__field", name: "password", type: "password", placeholder: "Password"}, 
                            {div_class: "registration__field", name: "password", type: "password", placeholder: "Password (Again)"}]


interface RegistrationPageProps {
    authrows: Array<object>;
    buttonlogin: Button;
    buttonregister: Button;
}
    
export class RegistrationPage extends Block<RegistrationPageProps> {
    constructor(props: RegistrationPageProps) {
        super('div', props);
        if(this.element) this.element.classList.add("flexcontainer")
    }
    init() {
        this.children.mainlogo = new Mainlogo();
        this.childrenCollection.authrows = this.props.authrows.map((authrow: AuthProps) => new AuthRow(authrow))
        this.props.authrows = [];
    }
    render() {
        return this.compile(template, this.props);
    }
}

