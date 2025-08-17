import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserNurse } from "react-icons/fa";
import { RiLoginBoxLine, RiUserAddLine } from "react-icons/ri";
import style from "./GuestNav.module.css";

export default function GuestNav() {
    return (
        <nav className={style.nav}>
            <ul className={style.list}>
                <div className={style.left}>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? `${style.listItem} ${style.active}` : style.listItem}
                    >
                        <AiOutlineHome className={style.icon} />
                        Home
                    </NavLink>
                    <NavLink 
                        to="/nannies" 
                        className={({ isActive }) => isActive ? `${style.listItem} ${style.active}` : style.listItem}
                    >
                        <FaUserNurse className={style.icon} />
                        Nannies
                    </NavLink>
                </div>
                <div className={style.right}>
                    <NavLink 
                        to="/login" 
                        className={({ isActive }) => isActive ? `${style.listItem} ${style.active}` : style.listItem}
                    >
                        <RiLoginBoxLine className={style.icon} />
                        Login
                    </NavLink>
                    <NavLink 
                        to="/register" 
                        className={({ isActive }) => isActive ? `${style.listItem} ${style.active}` : style.listItem}
                    >
                        <RiUserAddLine className={style.icon} />
                        Register
                    </NavLink>
                </div>
            </ul>
        </nav>
    );
}