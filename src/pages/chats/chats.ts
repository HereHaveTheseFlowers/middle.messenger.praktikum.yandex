import template from './chats.hbs';
import Block from '../../utils/Block';
import { Chat, ChatProps } from './chat';
import { Button } from '../../components/button';
import { Arrow } from '../../components/arrow';
import { chatsList } from './chatsList';
import animateClick from '../../utils/animateClick'
import Router from '../../utils/Router'
import setupForm from '../../utils/setupForm';

type SelectedChat = { name: string, messages: Array<Record<string, string>> }

// Temporary solution while we dont recieve anything from the server
export const selectedChat: SelectedChat = 
{   
    name: "Vadim", 
    messages: [
        { message: "Hello", date: "11:56", authorid: "1234" },
        { message: "Hi!", date: "11:56", authorid: "12345" }
    ]
};

export class ChatsPage extends Block {
    constructor() {
        super('div');
        if(this.element) this.element.classList.add("flexcontainer")
    }
    init() {
        this.children.arrow = new Arrow({});
        this.props.selectedChat = selectedChat;
        this.children.buttonAttachment = new Button({
            label: "",
            addedClassList: ["selectedchat__attachment"],
            type: "button",
            events: {
              click: () => { 
                animateClick(this.children.buttonAttachment.element);
                const selectedchat__attachment = document.querySelector(".selectedchat__attachment")
                if(selectedchat__attachment) {
                  selectedchat__attachment.addEventListener("click", function() {
                    const attachmentmenu: HTMLElement | null = document.querySelector(".attachmentmenu")
                    if(!attachmentmenu) {
                        return;
                    }
                    if(!attachmentmenu.style.display) {
                        attachmentmenu.style.display = "flex"
                    }
                    else {
                        attachmentmenu.style.display = ""
                    }
                  });
                }
              }
            }
        });
        this.children.buttonProfile = new Button({
          label: "Profile >",
          addedClassList: ["chatlist__profilebutton"],
          type: "button",
          events: {
            click: () => { 
              animateClick(this.children.buttonProfile.element);
              setTimeout(() =>  {
                Router.go('/settings')
              }, 400);
            }
          }
        });
        this.children.buttonOptions = new Button({
          label: "",
          addedClassList: ["selectedchat__optionsbutton"],
          type: "button",
          events: {
            click: () => { 
              animateClick(this.children.buttonOptions.element);
            }
          }
        });
        this.childrenCollection.chatsList = chatsList.map((selchat: ChatProps) => new Chat(selchat))
    }
    
    componentDidMount() {
      setupForm('selectedchat__messagefield');
      const selectedchat__buttonsend: HTMLElement | null = document.querySelector(".selectedchat__buttonsend")
      if(selectedchat__buttonsend) {
        selectedchat__buttonsend.addEventListener("click", function() {
          animateClick(selectedchat__buttonsend);
        });
      }
    }
    render() {
        return this.compile(template, this.props);
    }
}
