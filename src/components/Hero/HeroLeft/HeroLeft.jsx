import style from './HeroLeft.module.css';
import { FiArrowUpRight } from "react-icons/fi";

export default function HeroLeft() {
    return (
        <div className={style.heroLeft}>
            <div className={style.textContent}>
                <h1 className={style.title}>Make Life Easier for the Family:</h1>
                <p className={style.subtitle}>Find Babysitters Online for All Occasions</p>
                <button className={style.ctaButton}>Get started<FiArrowUpRight className={style.ctaIcon} /></button>
            </div>
        </div>
    )
}
