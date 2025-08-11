import { NavLink } from "react-router-dom";
import style from "./UserNav.module.css";
import { FaUser } from "react-icons/fa";

export default function UserNav() {
    return (
        <nav className={style.nav}>
            <ul className={style.list}>
                <NavLink to="/" className={style.listItem}>Home</NavLink>
                <NavLink to="/nannies" className={style.listItem}>Nannies</NavLink>
                <NavLink to="/favorites" className={style.listItem}>Favorites</NavLink>
            </ul>
            <div className={style.userInfo}>
                <ul className={style.userList}>
                    <li className={style.userListItem}>
                        <p className={style.userName}>
                            <span className={style.icon}><FaUser/></span>username
                        </p>
                    </li>
                    <li className={style.userListItem}>
                        <button className={style.logoutBtn}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

