import UserNav from "./UserNav/UserNav.jsx"
import GuestNav from "./GuestNav/GuestNav.jsx"
import { NavLink } from "react-router";
import style from './Header.module.css';


const isLoggedIn = true;

export default function Header() {
  return (
    <header className={style.header}>
        <div className={style.logoContainer}>
            <NavLink to="/" className={style.logo}>Nanny.Services</NavLink>
        </div>
        <div className={style.navContainer}>
            {isLoggedIn ? <UserNav /> : <GuestNav />}
        </div>
    </header>
  )
}
