import UserNav from "./UserNav/UserNav.jsx";
import GuestNav from "./GuestNav/GuestNav.jsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.jsx";
import { NavLink } from "react-router-dom";
import { RiUserHeartLine } from "react-icons/ri";
import style from './Header.module.css';

const isLoggedIn = false;

export default function Header() {
  return (
    <header className={style.header}>
        <div className={style.logoContainer}>
            <NavLink to="/" className={style.logo}>
                <div className={style.logoIcon}>
                    <div className={style.iconContainer}>
                        <RiUserHeartLine className={style.mainIcon} />
                        <div className={style.iconGlow}></div>
                        <div className={style.iconRing}></div>
                    </div>
                </div>
                <div className={style.logoText}>
                    <div className={style.brandName}>
                        <span className={style.nanny}>Nanny</span>
                        <span className={style.services}>Services</span>
                    </div>
                    <div className={style.tagline}>Professional Care Network</div>
                </div>
            </NavLink>
        </div>
        <div className={style.navContainer}>
            {isLoggedIn ? <UserNav /> : <GuestNav />}
            <ThemeSwitcher />
        </div>
    </header>
  );
}
