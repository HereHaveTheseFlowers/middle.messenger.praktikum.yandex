import template from './message.hbs';
import Block from '../../utils/Block';

export interface MessageProps {
    messageDir: string;
    time: string;
    content: string;
}

export class Message extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super('div', props);
        if(!this.element) return;
        this.element.classList.add("message")
        this.element.classList.add(this.props.messageDir)

    }
    init() {
        if(this.props.time) {
            this.props.time = this.props.time.substring(11, 16);
        }
    }
    render() {
        return this.compile(template, this.props);
    }
}