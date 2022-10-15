import BaseAPI from './BaseAPI';

export interface ChangeProfileData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}
export interface UserSearchData {
    login: string;
}


export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  update(data: ChangeProfileData) {
    return this.http.put('/profile', data);
  }

  updatePassword(data: ChangePasswordData) {
    return this.http.put('/password', data);
  }
  updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data, true);
  }

  read(identifier: string | number): Promise<User> {
    return this.http.get('/' + String(identifier));
  }

  search(data: UserSearchData): Promise<Array<User>> {
    return this.http.post('/search', data);
  }

  create = undefined;
  delete = undefined;
}

export default new UserAPI();