import template from './registration.hbs';
import Block from '../../utils/Block';
import { MainLogo } from '../../components/mainLogo';
import { Input, InputProps } from '../../components/input';
import { Button } from '../../components/button';
import { inputsList } from './inputsList';
import animateClick from '../../utils/animateClick';
import { simpleRouter } from '../../utils/simpleRouter';
    
export class RegistrationPage extends Block {
    constructor() {
        super('div');
        if(this.element) this.element.classList.add("flexcontainer")
    }
    init() {
        this.children.mainLogo = new MainLogo();
        this.children.buttonLogin = new Button({
          label: "Sign In",
          addedClassList: ["registration__signin"],
          type: "button",
          events: {
            click: () => {
              animateClick(this.children.buttonLogin.element);
              setTimeout(() =>  {
                simpleRouter.login()
              }, 400);
            }
          }
        });
        this.children.buttonRegister = new Button({
          label: "Create account",
          addedClassList: ["registration__submit"],
          type: "button",
          bgshape: true,
          events: {
            click: () => { 
              animateClick(this.children.buttonRegister.element);
            }
          }
        });
        this.childrenCollection.inputsList = inputsList.map((input: InputProps) => new Input(input))
    }
    render() {
        return this.compile(template, this.props);
    }
}

