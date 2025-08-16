// HeroRight.jsx
import { FaCheckCircle } from 'react-icons/fa';
import style from './HeroRight.module.css';

export default function HeroRight() {
    return (
        <div className={style.heroRight}>
            <div className={style.imgContainer}>
                <div className={style.textContent}>
                    <p className={style.title}><span> <FaCheckCircle /></span>Experienced nannies</p>
                    <p className={style.subtitle}>15,000</p>
                </div>
            </div>
            <div className={style.babyImage}></div>
        </div>
    )
}