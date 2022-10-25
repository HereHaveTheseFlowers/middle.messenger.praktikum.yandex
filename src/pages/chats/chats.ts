import template from './chats.hbs';
import Block from '../../utils/Block';
import { Chat } from './chat';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Message } from '../../components/message';
import { Arrow } from '../../components/arrow';
import animateClick from '../../utils/animateClick'
import Router from '../../utils/Router';
import setupForm from '../../utils/setupForm';
import store from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import ChatsController from '../../controllers/ChatsController';
import MessagesController from '../../controllers/MessagesController';
import UserController from '../../controllers/UserController';
import { ChatInfo } from '../../api/ChatsAPI';
import { User } from '../../api/AuthAPI';
import makeErrorInForm from '../../utils/makeErrorInForm';
import fade from '../../utils/fade';
import '../../img/add.svg';
import '../../img/attachment.svg';
import '../../img/file.svg';
import '../../img/location.svg';
import '../../img/media.svg';
import '../../img/options.svg';
import '../../img/remove.svg';

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
        this.props.Mobile = window.innerWidth <= 480 ? true : false;
        store.on('chats', () => {
          if(store.getState() && store.getState().chats) {
            this.childrenCollection.chatsList = store.getState().chats.map((chat: ChatInfo) => new Chat(chat))
          } else {
            this.childrenCollection.chatsList =  [];
          }
        });
        store.on('selectedChat', () => {
          this.updateMessageView();
        });
        store.on('messages', () => {
          this.updateMessageView();
        });
        this.children.arrow = new Arrow({});
        this.children.buttonAttachment = new Button({
            label: "",
            addedClassList: ["selectedchat__attachment"],
            type: "button",
            events: {
              click: () => { 
                animateClick(this.children.buttonAttachment.element);
                fade(".attachmentmenu");
              }
            }
        });
        this.children.buttonLogout = new Button({
          label: "Log out",
          addedClassList: ["chatlist__logoutbutton"],
          type: "button",
          events: {
            click: () => { 
              animateClick(this.children.buttonLogout.element);
              setTimeout( async () =>  {
                await AuthController.logout();
              }, 200);
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
              Router.go('/settings')
            }
          }
        });
        this.children.buttonMobileChatList = new Button({
          label: "Chats",
          addedClassList: ["chatlist__mobilechatsbutton"],
          type: "button",
          events: {
            click: () => { 
              animateClick(this.children.buttonMobileChatList.element);
              fade(".chatslistmobile");
            }
          }
        });
        this.children.buttonOptions = new Button({
          label: "",
          addedClassList: ["selectedchat__optionsbutton"],
          type: "button",
          events: {
            click: () => {
              fade(".optionsmenu");
            }
          }
        });
        this.children.buttonAddUserMenu = new Button({
          label: "Add a user",
          addedClassList: ["menu__button"],
          events: {
            click: () => { 
              animateClick(this.children.buttonAddUserMenu.element);
              fade(".addusermenu");
            }
          }
        });
        this.children.inputAddUser = new Input({
          name: "login",
          type: "text",
          placeholder: "Login",
          divClassList: ["auth__field", "modal__field"],
          inputClass: "auth__input",
          events: {}
        });
        this.children.buttonAddUser = new Button({
          label: "Add",
          bgshape: true,
          addedClassList: ["modal__button"],
          events: {
            click: () => {
              animateClick(this.children.buttonAddUser.element);
            }
          }
        });
        this.children.buttonRemoveUserMenu = new Button({
          label: "Delete user",
          addedClassList: ["menu__button"],
          events: {
            click: () => { 
              animateClick(this.children.buttonRemoveUserMenu.element);
              fade(".removeusermenu");
            }
          }
        });
        this.children.inputRemoveUser = new Input({
          name: "login",
          type: "text",
          placeholder: "Login",
          divClassList: ["auth__field", "modal__field"],
          inputClass: "auth__input",
          events: {}
        });
        this.children.buttonRemoveUser = new Button({
          label: "Delete",
          addedClassList: ["modal__button"],
          bgshape: true,
          events: {
            click: () => {
              animateClick(this.children.buttonRemoveUser.element);
            }
          }
        });
        this.children.buttonCreateChatMenu = new Button({
          label: "Create Chat",
          addedClassList: ["menu__button", "chatlist__createbutton"],
          events: {
            click: () => {
              animateClick(this.children.buttonCreateChatMenu.element);
              fade(".createchatmenu");
            }
          }
        });
        this.children.inputCreateChat = new Input({
          name: "chatname",
          type: "text",
          placeholder: "Chat Name",
          divClassList: ["auth__field", "modal__field"],
          inputClass: "auth__input",
          events: {}
        });
        this.children.buttonCreateChat = new Button({
          label: "Create",
          bgshape: true,
          addedClassList: ["modal__button"],
          events: {
            click: () => {
              animateClick(this.children.buttonCreateChat.element);
            }
          }
        });
        this.children.buttonRemoveChatMenu = new Button({
          label: "Delete Chat",
          addedClassList: ["menu__button"],
          events: {
            click: () => {
              animateClick(this.children.buttonRemoveChatMenu.element);
              fade(".removechatmenu");
            }
          }
        });
        this.children.buttonRemoveChat = new Button({
          label: "Yes",
          addedClassList: ["modal__button"],
          bgshape: true,
          events: {
            click: () => {
              animateClick(this.children.buttonRemoveChat.element);
            }
          }
        });
        this.children.buttonCloseAdd = new Button({
          label: "",
          addedClassList: ["modal__button__close"],
          type: "button",
          events: {
            click: () => { 
              animateClick(this.children.buttonCloseAdd.element);
              fade('.addusermenu', 'out');
            }
          }
        });
        this.children.buttonCloseRemove = new Button({
          label: "",
          addedClassList: ["modal__button__close"],
          type: "button",
          events: {
            click: () => { 
              animateClick(this.children.buttonCloseRemove.element);
              fade('.removeusermenu', 'out');
            }
          }
        });
        this.children.buttonCloseCreate = new Button({
          label: "",
          addedClassList: ["modal__button__close"],
          type: "button",
          events: {
            click: () => { 
              animateClick(this.children.buttonCloseCreate.element);
              fade('.createchatmenu', 'out');
            }
          }
        });
        this.children.buttonCloseRemoveChat = new Button({
          label: "",
          addedClassList: ["modal__button__close"],
          type: "button",
          events: {
            click: () => { 
              animateClick(this.children.buttonCloseRemoveChat.element);
              fade('.removechatmenu', 'out');
            }
          }
        });
        this.children.buttonCloseChatsListMobile = new Button({
          label: "",
          addedClassList: ["modal__button__close", "chatslistmobile__button"],
          type: "button",
          events: {
            click: () => { 
              animateClick(this.children.buttonCloseChatsListMobile.element);
              fade('.chatslistmobile', 'out');
            }
          }
        });
    }
    componentDidUpdate() {
      const that = this;
      setTimeout(() =>  {
        setupForm('selectedchat__messagefield', this);
        setupForm('addusermenu', this);
        setupForm('removeusermenu', this);
        setupForm('createchatmenu', this);
        setupForm('removechatmenu', this);
        const inputSearch = document.querySelector('.chatlist__search') as HTMLInputElement;
        inputSearch?.addEventListener('input', function() {
          console.log('input')
          if(!that.childrenCollection.chatsList) return;
          for(const chat of that.childrenCollection.chatsList) {
            if(chat.props.title.includes(inputSearch.value)) {
              chat.show();
            } else {
              chat.hide();
          }
        }
        });
        const selectedchat__buttonsend: HTMLElement | null = document.querySelector(".selectedchat__buttonsend")
        if(selectedchat__buttonsend) {
          selectedchat__buttonsend.addEventListener("click", function() {
            animateClick(selectedchat__buttonsend);
          });
        }
      }, 50);
      return true;
    }
    componentDidMount() {
      (async () => {
        await ChatsController.fetchChats();
        if(store.getState().chats && store.getState().chats[0]) {
          ChatsController.selectChat(store.getState().chats[0].id);
        }
        this.updateMessageView();
      })();
    }
    updateMessageView() {
      if(!store.getState().selectedChat || !store.getState().messages) return;
      this.props.selectedChat = store.getState().selectedChat;
      for(const chat of store.getState().chats) {
        if(chat.id === this.props.selectedChat) {
          const selectedchatName = document.querySelector('.selectedchat__name');
          if(selectedchatName) {
            selectedchatName.textContent = chat.title;
          }
        }
      }
      const chatBody = document.querySelector('.selectedchat__body');
      if(!store.getState().messages[this.props.selectedChat]) return;
      for(const message of store.getState().messages[this.props.selectedChat]) {
        const messageDir = store.getState().user.id === message.user_id ? "message__right" : "message__left"
        const messageBlock = new Message({
          messageDir: messageDir,
          time: message.time,
          content: message.content,
          user_id: message.user_id
        });
        if(messageBlock.element) chatBody?.prepend(messageBlock.element)
      }
    }
    onSubmit(data: Record<string, string>, submitType: string) {
      if(submitType === 'selectedchat__messagefield') {
        if(!store.getState().selectedChat || !data.message) return;
        MessagesController.sendMessage(store.getState().selectedChat, data.message);
      }
      else if (submitType === 'addusermenu') {
        if(!data.login || !store.getState().selectedChat) return;
        (async () => {
          const foundUser: Array<User> | boolean = await UserController.searchUser({ login: data.login });
          if(foundUser && foundUser[0]) {
            console.log(foundUser[0].id)
            ChatsController.addUserToChat(store.getState().selectedChat, foundUser[0].id)
            const menutoclose = document.querySelector(".addusermenu") as HTMLElement;
            if(menutoclose) menutoclose.style.display = 'none';
          } else {
            makeErrorInForm(submitType, "Couldn't find that user")
          }
        })();
      }
      else if (submitType === 'removeusermenu') {
        if(!data.login || !store.getState().selectedChat) return;
        (async () => {
          const foundUser: Array<User> | boolean = await UserController.searchUser({ login: data.login });
          if(foundUser && foundUser[0]) {
            ChatsController.removeUserFromChat(store.getState().selectedChat, foundUser[0].id)
          } else {
            makeErrorInForm(submitType, "Couldn't find that user")
          }
        })();
      }
      else if (submitType === 'createchatmenu') {
        if(!data.chatname) return;
        ChatsController.create(data.chatname);
      }
      else if (submitType === 'removechatmenu') {
        if(!store.getState().selectedChat) return;
        ChatsController.delete(store.getState().selectedChat);
        this.props.selectedChat = '';
      }
    }
    render() {
        return this.compile(template, this.props);
    }
}
