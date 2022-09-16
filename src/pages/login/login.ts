import template from './login.hbs';
import Block from '../../utils/Block';
import { MainLogo } from '../../components/mainLogo';
import { Input, InputProps } from '../../components/input';
import { Button } from '../../components/button';
import { inputsList } from './inputsList';
import animateClick from '../../utils/animateClick';
import { simpleRouter } from '../../utils/simpleRouter';
    
export class LoginPage extends Block {
    constructor() {
        super('div');
        if(this.element) this.element.classList.add("flexcontainer")
    }
    init() {
        this.children.mainLogo = new MainLogo();
        this.children.buttonLogin = new Button({
            label: "Sign In",
            addedClassList: ["login__submit"],
            bgshape: true,
            events: {
              click: () => { 
                animateClick(this.children.buttonLogin.element);
              }
            }
        });
        this.children.buttonRegister = new Button({
            label: "Create account",
            addedClassList: ["login__createaccount"],
            type: "button",
            events: {
              click: () => { 
                animateClick(this.children.buttonRegister.element);
                setTimeout(() =>  {
                  simpleRouter.registration()
                }, 400);
              }
            }
        });
        this.childrenCollection.inputsList = inputsList.map((input: InputProps) => new Input(input))
    }
    render() {
        return this.compile(template, this.props );
    }
}

