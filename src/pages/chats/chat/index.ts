import template from './chat.hbs';
import Block from '../../../utils/Block';

export interface ChatProps {
    name: string;
    lastMessage: string;
    lastMessageDate: string;
    newMessages?: string;
}

export class Chat extends Block<ChatProps> {
    constructor(props: ChatProps) {
        super('div', props);
        if(this.element) this.element.classList.add("chat")
    }

    render() {
        return this.compile(template, this.props);
    }
}