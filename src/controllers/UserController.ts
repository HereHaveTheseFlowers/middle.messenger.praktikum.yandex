import API, { UserAPI, ChangeProfileData, ChangePasswordData, UserSearchData } from '../api/UserAPI';
import store from '../utils/Store';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async updateProfile(data: ChangeProfileData) {
    try {
      await this.api.update(data);

      await this.fetchUser();

    } catch (e: any) {
      console.error(e);
    }
  }
  async updateAvatar(data: FormData) {
    try {
      await this.api.updateAvatar(data);
      
      await this.fetchUser();

    } catch (e: any) {
      console.error(e);
    }
  }

  async updatePassword(data: ChangePasswordData) {
    try {
      await this.api.updatePassword(data);

      await this.fetchUser();

    } catch (e: any) {
      console.error(e.message);
    }
  }
  async searchUser(data: UserSearchData) {
    try {
      return await this.api.search(data);
    } catch (e: any) {
      console.error(e.message);
      return false;
    }
  }

  async fetchUser() {
    if(!store.getState().user || !store.getState().user.id) return;
    const user = await this.api.read(store.getState().user.id);
    store.set('user', user);
  }
}

export default new UserController();