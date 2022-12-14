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
  async findUserByID(identifier: string | number) {
    try {
      return await this.api.read(identifier);
    } catch (e: any) {
      console.error(e.message);
      return false;
    }
  }

  async fetchUser() {
    if(!store.getState().user || !store.getState().user.id) return;
    try {

      const user = await this.api.read(store.getState().user.id);
      store.set('user', user);

    } catch (e: any) {

      console.error(e.message);

    }
  }
}

export default new UserController();