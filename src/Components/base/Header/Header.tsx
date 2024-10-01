import { NavLink, NavLinkRenderProps } from "react-router-dom";
import classes from "./Header.module.css";

const Header: React.FC = () => {
  const navigation = ["Home", "About", "Contact"];

  const handleActiveNav = (props: NavLinkRenderProps) => {
    const { isActive } = props;

    if (isActive) {
      return classes["active_nav_item"];
    } else {
      return classes["nav_item"];
    }
  };

  return (
    <header className={classes["header-styles"]}>
      <h1 className={classes["header-h1-styles"]}>Travel To Georgia</h1>
      <nav className={classes["header-nav-styles"]}>
        {navigation.map((item, index) => (
          <NavLink
            key={index}
            className={handleActiveNav}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
          >
            {item}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
