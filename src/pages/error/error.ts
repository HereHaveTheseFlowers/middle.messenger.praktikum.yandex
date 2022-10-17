import template from './error.hbs';
import Block from '../../utils/Block';
import { Button } from '../../components/button';
import animateClick from '../../utils/animateClick';
import Router from '../../utils/Router';

export class ErrorPage extends Block {
    constructor() {
        super('div');
        if(this.element) this.element.classList.add("error__container")
    }
    init() {
        this.props.errorNumber = String(document.location.pathname).replace('/', '');
        if(this.props.errorNumber === '404') {
            this.props.errorDesc = "Wrong page";
        } else {
            this.props.errorDesc = "Working on it";
        }
        this.children.errorButton = new Button({
            label: "Back to chats",
            addedClassList: ["error__button"],
            type: "button",
            bgshape: true,
            events: {
              click: () => {
                animateClick(this.children.errorButton.element);
                setTimeout(() =>  {
                  Router.go('/')
                }, 400);
              }
            }
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}