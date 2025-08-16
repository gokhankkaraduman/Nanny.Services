// HeroRight.jsx
import { FaCheck  } from 'react-icons/fa';
import style from './HeroRight.module.css';

export default function HeroRight() {
    return (
        <div className={style.heroRight}>
            <div className={style.textContent}>
                <span className={style.icon}><FaCheck  /></span>
                <div className={style.textContainer}>
                    <p className={style.title}>
                        Experienced nannies
                    </p>
                    <p className={style.subtitle}>15,000</p>
                </div>
            </div>
        </div>
    )
}