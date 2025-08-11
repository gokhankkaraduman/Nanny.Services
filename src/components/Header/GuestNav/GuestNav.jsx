import { NavLink } from "react-router-dom";
import style from "./GuestNav.module.css";

export default function GuestNav() {
    return (
        <nav className={style.nav}>
            <ul className={style.list}>
                <NavLink to="/" className={style.listItem}>Home</NavLink>
                <NavLink to="/nannies" className={style.listItem}>Nannies</NavLink>
                <NavLink to="/login" className={style.listItem}>Login</NavLink>
                <NavLink to="/register" className={style.listItem}>Registration</NavLink>
            </ul>
        </nav>
    )
}
