import Router from './utils/Router';
import { LoginPage } from './pages/login/login';
import { RegistrationPage } from './pages/registration/registration';
import { ChatsPage } from './pages/chats/chats';
import { OptionsPage } from './pages/options/options';
import { ErrorPage } from './pages/error/error';
import AuthController from './controllers/AuthController';
import './styles.sass';
import './img/favicon.ico';
import './img/favicon-16x16.png';
import './img/favicon-32x32.png';
import './img/apple-touch-icon.png';
import './img/safari-pinned-tab.svg';
import './img/browserconfig.xml';
import './img/android-chrome-192x192.png';
import './img/android-chrome-512x512.png';
import './img/apple-touch-icon.png';
import './img/mstile-150x150.png';
import './img/site.webmanifest';

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
