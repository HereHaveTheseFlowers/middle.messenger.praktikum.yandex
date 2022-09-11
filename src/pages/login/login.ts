import template from './login.hbs';
import Block from '../../utils/Block';
import Mainlogo from '../../components/mainlogo/index.ts';
import { AuthRow, AuthProps } from '../../components/auth_row/index.ts';
import { Button } from '../../components/button';

type Nullable<T> = T | null;

export let authrows: Array<any> = [ {div_class: "", name: "login", type: "text", placeholder: "Login"}, 
                            {div_class: "", name: "password", type: "password", placeholder: "Password"} ]


interface LoginPageProps {
    mainlogo: Mainlogo;
    authrows: Array<any>;
    buttonlogin: Button;
    buttonregister: Button;
}
    
export class LoginPage extends Block<LoginPageProps> {
    constructor(props: LoginPageProps) {
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

