import animateClick  from '../../utils/animateClick';
import template from './chats.hbs';
import '../../components/button';
import '../../components/chat';
import '../../components/arrow';

type Nullable<T> = T | null;

const chats: Array<object> = [  { name: "Andrey",     lastmessage: "Image",   lastmessagedate: "10:49", newmessages: "2" }, 
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

const selectedchat: { name: string, messages: Array<object> } = { name: "Vadim", messages: [{ message: "Hello", date: "11:56", authorid: "1234" },
                                                                                            { message: "Hi!", date: "11:56", authorid: "12345" }]};

function pageStartup() {
  for(let el of document.querySelectorAll(".animate-click")) {
    el.addEventListener("click", function() {
      animateClick(el);
    });
  }
  let selectedchat__attachment = document.querySelector(".selectedchat__attachment")
  if( selectedchat__attachment ) {
    selectedchat__attachment.addEventListener("click", function() {
      let attachmentmenu = document.querySelector(".attachmentmenu")
      if(attachmentmenu) {
        
        if(!attachmentmenu.style.display)
          attachmentmenu.style.display = "flex"
        else
          attachmentmenu.style.display = ""
      }
    });
  }
  for(let el of document.querySelectorAll(".chatlist__profilebutton")) {
    el.addEventListener("click", function() {
        setTimeout(() =>  {
            window.location.href='../../pages/options/options.html'
        }, 400);
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app: Nullable<HTMLDivElement> = document.querySelector('#app');
  if(app) app.innerHTML = template({chats: chats, selectedchat: selectedchat});
  pageStartup();
});
