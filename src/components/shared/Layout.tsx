import {Outlet} from 'react-router-dom';
import '../../styles/reset.css';

export const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
