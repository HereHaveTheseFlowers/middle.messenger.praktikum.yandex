import template from './chat.hbs';
import Block from '../../utils/Block';

export interface ChatProps {
    name: string;
    lastmessage: string;
    lastmessagedate: string;
    newmessages?: string;
}

export class Chat extends Block<ChatProps> {
    constructor(props: ChatProps) {
        super('div', props);
        this.element!.classList.add("chat")
    }

    render() {
        return this.compile(template, this.props);
    }
}