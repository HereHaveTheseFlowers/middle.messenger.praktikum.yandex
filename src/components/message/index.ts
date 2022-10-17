import template from './message.hbs';
import Block from '../../utils/Block';
import UserController from '../../controllers/UserController';
import { User } from '../../api/UserAPI';

export interface MessageProps {
    messageDir: string;
    time: string;
    content: string;
    user_id: number;
    avatar?: boolean;
    avatarsrc?: string;
    title?: string;
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
        if(this.props.messageDir === "message__left") {
            this.props.avatar = true;
        }
        if(this.props.user_id) {
            (async () => {
                const user: User | false = await UserController.findUserByID(this.props.user_id)
                if(user && this.props.avatar && user.avatar) {
                    this.props.avatarsrc = 'https://ya-praktikum.tech/api/v2/resources' + user.avatar
                }
                if(user && this.props.messageDir === "message__left") {
                    this.props.title = user.login
                }
            })();
        }
    }
    render() {
        return this.compile(template, this.props);
    }
}