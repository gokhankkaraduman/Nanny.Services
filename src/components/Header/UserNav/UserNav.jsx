import { NavLink } from "react-router-dom";
import { FaHome, FaUserNurse, FaUser, FaHeart } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import style from "./UserNav.module.css";

export default function UserNav() {
    return (
        <nav className={style.nav}>
            <ul className={style.list}>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? `${style.listItem} ${style.active}` : style.listItem}
                >
                    <FaHome className={style.linkIcon} />
                    Home
                </NavLink>
                <NavLink 
                    to="/nannies" 
                    className={({ isActive }) => isActive ? `${style.listItem} ${style.active}` : style.listItem}
                >
                    <FaUserNurse className={style.linkIcon} />
                    Nannies
                </NavLink>
                <NavLink 
                    to="/favorites" 
                    className={({ isActive }) => isActive ? `${style.listItem} ${style.active}` : style.listItem}
                >
                    <FaHeart className={style.linkIcon} />
                    Favorites
                </NavLink>
            </ul>
            <div className={style.userInfo}>
                <ul className={style.userList}>
                    <li className={style.userListItem}>
                        <div className={style.userProfile}>
                            <div className={style.userAvatar}>
                                <FaUser className={style.avatarIcon} />
                            </div>
                            <div className={style.userDetails}>
                                <span className={style.userGreeting}>Hello,</span>
                                <span className={style.userName}>John Doe</span>
                            </div>
                        </div>
                    </li>
                    <li className={style.userListItem}>
                        <button className={style.logoutBtn}>
                            <RiLogoutBoxRLine className={style.logoutIcon} />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}