import {createBrowserRouter} from 'react-router-dom';
import {
  AccettazioneLaccatoPage,
  HomePage,
  InsertDataPage,
  LoginPage,
  RistampaETKPage,
} from '../pages';
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
        element: <InsertDataPage />,
      },
      {
        path: '/accetazionelaccato',
        element: <AccettazioneLaccatoPage />,
      },
      {
        path: '/ristampaetk',
        element: <RistampaETKPage />,
      },
    ],
  },
]);

export {router};
