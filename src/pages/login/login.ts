import template from './login.hbs';
import Block from '../../utils/Block';
import { MainLogo } from '../../components/mainLogo';
import { Input, InputProps } from '../../components/input';
import { Button } from '../../components/button';
import { inputsList } from './inputsList';
import animateClick from '../../utils/animateClick';
import Router from '../../utils/Router';
import setupForm from '../../utils/setupForm';
import AuthController from '../../controllers/AuthController';
import { SigninData } from '../../api/AuthAPI';
import store from '../../utils/Store';
    
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
                  Router.go('/sign-up')
                }, 400);
              }
            }
        });
        this.childrenCollection.inputsList = inputsList.map((input: InputProps) => new Input(input))
    }
    componentDidMount() {
      if(store.getState().user) {
        Router.go('/messenger')
      } else {
        setupForm('login__form', this);
      }
    }
    onSubmit(data: SigninData, submitType: string) {
      (async function() {
        try {
        await AuthController.signin(data);
      } catch(e: any) {
        if(e && e.reason) {
          const errorForm = document.querySelector('.'+submitType);
          if(!errorForm) return;
          const errorDiv = document.createElement("div");
          errorDiv.classList.add("input__error");
          errorDiv.style.left = 'auto';
          errorDiv.style.right = 'auto';
          errorDiv.style.top = 'auto';
          errorDiv.style.bottom = '30%';
          const errorIcon = document.createElement("span");
          errorIcon.innerHTML = "&#9888; ";
          errorDiv.append(errorIcon);
          errorDiv.textContent += e.reason;
          errorDiv.style.zIndex = "6000";
          errorDiv.addEventListener('click', (e) => {
            e.preventDefault();
            errorDiv.style.display = 'none';
          });
          errorForm.append(errorDiv);
          return;
        }
      }
      }());
    }
    render() {
        return this.compile(template, this.props );
    }
}

