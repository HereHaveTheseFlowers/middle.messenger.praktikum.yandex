import template from './login.hbs';
import Block from '../../utils/Block';
import { Mainlogo } from '../../components/mainlogo';
import { AuthRow, AuthProps } from '../../components/auth_row';
import { Button } from '../../components/button';

export const authrows: Array<object> = [ {div_class: "", name: "login", type: "text", placeholder: "Login"}, 
                            {div_class: "", name: "password", type: "password", placeholder: "Password"} ]


interface LoginPageProps {
    authrows: Array<object>;
    buttonlogin: Button;
    buttonregister: Button;
}
    
export class LoginPage extends Block<LoginPageProps> {
    constructor(props: LoginPageProps) {
        super('div', props);
        if(this.element) this.element.classList.add("flexcontainer")
    }
    init() {
        this.children.mainlogo = new Mainlogo({});
        this.childrenCollection.authrows = this.props.authrows.map((authrow: AuthProps) => new AuthRow(authrow))
        this.props.authrows = [];
    }
    render() {
        return this.compile(template, this.props );
    }
}

