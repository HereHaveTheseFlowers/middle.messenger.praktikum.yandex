import template from './chat.hbs';
import Block from '../../../utils/Block';
import { ChatInfo } from '../../../api/ChatsAPI';
import store from '../../../utils/Store';
import ChatsControllers from '../../../controllers/ChatsController';

export class Chat extends Block<ChatInfo> {
    constructor(props: ChatInfo) {
        super('div', props);
        if(this.element) this.element.classList.add("chat")
    }
    init() {
        store.on('selectedChat', () => {
            if(!store.getState().selectedChat || !this.element) return;
            if(this.props.id && this.props.id === store.getState().selectedChat) {
                this.element.classList.add("chat__active");
            }
            else {
                this.element.classList.remove("chat__active");
            }
        });
        const that = this;
        if(this.props.last_message) this.props.last_message.time = this.props.last_message.time.substring(11, 16)
        this.element?.addEventListener('click', function() {
            if(!that.props.id) return;
            ChatsControllers.selectChat(that.props.id)
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}