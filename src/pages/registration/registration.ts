import template from './registration.hbs';
import Block from '../../utils/Block';
import { MainLogo } from '../../components/mainLogo';
import { Input, InputProps } from '../../components/input';
import { Button } from '../../components/button';
import { inputsList } from './inputsList';
import animateClick from '../../utils/animateClick';
import Router from '../../utils/Router';
import setupForm from '../../utils/setupForm';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';

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
                Router.go('/')
              }, 400);
            }
          }
        });
        this.children.buttonRegister = new Button({
          label: "Create account",
          addedClassList: ["registration__submit"],
          bgshape: true,
          events: {
            click: () => { 
              animateClick(this.children.buttonRegister.element);
            }
          }
        });
        this.childrenCollection.inputsList = inputsList.map((input: InputProps) => new Input(input))
    }
    componentDidMount() {
      setupForm('registration__form', this);
    }
    onSubmit(data: SignupData) {
      AuthController.logout();
      AuthController.signup(data);
    }
    render() {
        return this.compile(template, this.props);
    }
}

