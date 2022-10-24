import Router from './utils/Router';
import { LoginPage } from './pages/login/login';
import { RegistrationPage } from './pages/registration/registration';
import { ChatsPage } from './pages/chats/chats';
import { OptionsPage } from './pages/options/options';
import { ErrorPage } from './pages/error/error';
import AuthController from './controllers/AuthController';
import './styles.sass';

/* Mobile viewport height hack */
let timeoutId: NodeJS.Timeout | null = null;
const documentHeight = () => {
  if(timeoutId) clearTimeout(timeoutId); // avoid execution of previous timeouts
  timeoutId = setTimeout(() => {
   const doc = document.documentElement;
   doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }, 200);
};
window.addEventListener('resize', documentHeight);

AuthController.fetchUser();

enum Routes {
  Index = '/',
  Register = '/sign-up',
  Chats = '/messenger',
  Profile = '/settings',
  error404 = '/404',
  error505 = '/500'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Chats, ChatsPage)
    .use(Routes.Profile, OptionsPage)
    .use(Routes.error404, ErrorPage)
    .use(Routes.error505, ErrorPage)
    .start()
  documentHeight();
});
