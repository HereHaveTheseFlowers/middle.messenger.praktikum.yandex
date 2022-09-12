import template from './chats.hbs';
import Block from '../../utils/Block';
import { Chat, ChatProps } from '../../components/chat';
import { Button } from '../../components/button';
import { Arrow } from '../../components/arrow';
            
export const selectedchat: { name: string, messages: Array<object> } = { name: "Vadim", messages: [{ message: "Hello", date: "11:56", authorid: "1234" },
{ message: "Hi!", date: "11:56", authorid: "12345" }]};

export const chats: Array<object> = [  { name: "Andrey",     lastmessage: "Image",   lastmessagedate: "10:49", newmessages: "2" }, 
                            { name: "Movieclub",  lastmessage: "Hi!",     lastmessagedate: "12:00", newmessages: ""}, 
                            { name: "Ilia",       lastmessage: "Hello!",  lastmessagedate: "10:49", newmessages: "4"}, 
                            { name: "Vadim",      lastmessage: "Hows it goint?", lastmessagedate: "10:49", newmessages: ""}, 
                            { name: "tet-a-tet",  lastmessage: "Hi!",     lastmessagedate: "15:12", newmessages: ""}, 
                            { name: "1, 2, 3",    lastmessage: "Hi!",     lastmessagedate: "Fr", newmessages: ""},
                            { name: "Ilia",       lastmessage: "Hello!",  lastmessagedate: "We", newmessages: ""}, 
                            { name: "Ilia",       lastmessage: "Hello!",  lastmessagedate: "Mo", newmessages: ""}, 
                            { name: "Ilia",       lastmessage: "Hello!",  lastmessagedate: "Mo", newmessages: ""}, 
                            { name: "Ilia",       lastmessage: "Hello!",  lastmessagedate: "May 1 2020", newmessages: ""}, 
                            { name: "Ilia",       lastmessage: "Hello!",  lastmessagedate: "Apr 13 2020", newmessages: ""}, 
                            { name: "Ilia",       lastmessage: "Hello!",  lastmessagedate: "Apr 13 2020", newmessages: ""}, 
                            { name: "Ilia",       lastmessage: "Hello!",  lastmessagedate: "Apr 13 2020", newmessages: ""}]

interface ChatsPageProps {
  chats: Array<object>;
  buttonprofile: Button;
  arrow: Arrow;
  buttonattachment: Button;
  selectedchat: { name: string, messages: Array<object> };
  buttonoptions: Button;
}
    
export class ChatsPage extends Block<ChatsPageProps> {
    constructor(props: ChatsPageProps) {
        super('div', props);
        if(this.element) this.element.classList.add("flexcontainer")
    }
    init() {
        this.childrenCollection.chats = this.props.chats.map((selchat: ChatProps) => new Chat(selchat))
        this.props.chats = [];
    }
    render() {
        return this.compile(template, this.props);
    }
}
