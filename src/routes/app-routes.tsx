import {createBrowserRouter} from 'react-router-dom';
import {HomePage, InsertData, LoginPage} from '../pages';
import {ErrorPage, Layout} from '../components';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/programmi',
        element: <HomePage />,
      },
      {
        path: '/insertdata',
        element: <InsertData />,
      },
    ],
  },
]);

export {router};
