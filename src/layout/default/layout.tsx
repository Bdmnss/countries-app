import { Outlet } from 'react-router-dom';
import Header from '../../Components/base/Header/Header';

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
