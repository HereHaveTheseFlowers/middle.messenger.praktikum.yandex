/* eslint-disable @typescript-eslint/ban-ts-comment */
import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    try {

      await this.api.create(title);
      this.fetchChats();

    } catch (e: any) {

      console.error(e.message);

    }
  }

  async fetchChats() {
    try {
  
      const chats = await this.api.read();

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);

        await MessagesController.connect(chat.id, token);
      });
      store.set('chats', chats);

    } catch (e: any) {

      console.error(e.message);

    }
  }

  async addUserToChat(id: number, userId: number) {
    try {

      await this.api.addUsers(id, [userId]);

    } catch (e: any) {

      console.error(e.message);

    }
  }

  async removeUserFromChat(id: number, userId: number) {
    try {

      await this.api.deleteUsers(id, [userId]);

    } catch (e: any) {

      console.error(e.message);

    }
  }

  async delete(id: number) {
    try {

      await this.api.delete(id);

      this.fetchChats();

    } catch (e: any) {

      console.error(e.message);

    }
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

const controller = new ChatsController();

// @ts-ignore
window.chatsController = controller;

export default controller;