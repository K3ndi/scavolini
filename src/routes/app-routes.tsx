import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import {LoginPage} from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // loader: rootLoader,
  },
  {
    path: '/login',
    element: <LoginPage />,
    // loader: teamLoader,
  },
]);

export {router};
