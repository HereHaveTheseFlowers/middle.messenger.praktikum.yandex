import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import store from '../utils/Store';
import Router from '../utils/Router';
//import MessagesController from './MessagesController';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      console.log(data)
      await this.api.signin(data);

      await this.fetchUser();

      Router.go('/messenger');
    } catch (e: any) {
      if(e.reason && e.reason === 'User already in system') {
        // in case we are already logged in we log out and try again
        await this.api.logout();
        await this.api.signin(data);
        await this.fetchUser();
        Router.go('/messenger');
        return;
      }
      console.error(e);
      throw e;
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      Router.go('/settings');
    } catch (e: any) {
      console.error(e.message);
      Router.go('/');
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }

  async logout() {
    try {
      //MessagesController.closeAll();
      store.set('user', undefined);

      await this.api.logout();

      Router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();