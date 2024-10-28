import { NavLink, NavLinkRenderProps, useParams } from 'react-router-dom';
import classes from './Header.module.css';

const Header: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const navigation = ['Home', 'About', 'Contact'];

  const handleActiveNav = (props: NavLinkRenderProps) => {
    const { isActive } = props;

    if (isActive) {
      return classes['active_nav_item'];
    } else {
      return classes['nav_item'];
    }
  };

  return (
    <header className={classes['header-styles']}>
      <h1 className={classes['header-h1-styles']}>
        {lang === 'ka' ? 'იმოგზაურე საქართველოში' : 'Travel To Georgia'}
      </h1>
      <nav className={classes['header-nav-styles']}>
        {navigation.map((item, index) => (
          <NavLink
            key={index}
            className={handleActiveNav}
            to={
              item === 'Home'
                ? `/${lang}/cities`
                : `/${lang}/${item.toLowerCase()}`
            }
          >
            {lang === 'ka' ? translateToGeorgian(item) : item}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

const translateToGeorgian = (text: string) => {
  switch (text) {
    case 'Home':
      return 'მთავარი';
    case 'About':
      return 'ჩვენს შესახებ';
    case 'Contact':
      return 'კონტაქტი';
    default:
      return text;
  }
};

export default Header;
