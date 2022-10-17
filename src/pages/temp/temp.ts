import template from './temp.hbs';
import Block from '../../utils/Block';
import Router from '../../utils/Router';

export class TempPage extends Block {
    constructor() {
        super('div');
    }
    componentDidMount() {
        for(const el of document.querySelectorAll(".temp__links__a")) {
            el.addEventListener("click", function() {
              switch(el.innerHTML) {
                case "Login":
                    Router.go('/')
                    break;
                case "Registration":
                    Router.go('/sign-up')
                    break;
                case "Chats":
                    Router.go('/messenger')
                    break;
                case "Options":
                    Router.go('/settings')
                    break;
                case "404":
                    Router.go('/400')
                    break;
                case "500":
                    Router.go('/500')
                    break;
              }
            });
          }
    }
    render() {
        return this.compile(template, this.props);
    }
}
