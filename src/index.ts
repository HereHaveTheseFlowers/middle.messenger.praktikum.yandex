import Router from './utils/Router';
import { LoginPage } from './pages/login/login';
import { TempPage } from './pages/temp/temp';
import { RegistrationPage } from './pages/registration/registration';
import { ChatsPage } from './pages/chats/chats';
import { OptionsPage } from './pages/options/options';
import { ErrorPage } from './pages/error/error';
import AuthController from './controllers/AuthController';

AuthController.fetchUser();

enum Routes {
  Index = '/',
  Temp = '/temp',
  Register = '/sign-up',
  Chats = '/messenger',
  Profile = '/settings',
  error404 = '/404',
  error505 = '/500'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Temp, TempPage)
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Chats, ChatsPage)
    .use(Routes.Profile, OptionsPage)
    .use(Routes.error404, ErrorPage)
    .use(Routes.error505, ErrorPage)
    .start()
});
