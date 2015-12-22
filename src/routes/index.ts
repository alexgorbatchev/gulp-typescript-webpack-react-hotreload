import Application from '../components/application';
import Home from './home';
import About from './about';

export default [
  {
    path: '/', 
    component: Application,
    childRoutes: [
      Home,
      About
    ],
  }
];
