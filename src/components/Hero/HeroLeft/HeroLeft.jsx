import style from './HeroLeft.module.css';

export default function HeroLeft() {
    return (
        <div className={style.heroLeft}>
            <h1 className={style.title}>Make Life Easier for the Family:</h1>
            <p className={style.subtitle}>Find Babysitters Online for All Occasions</p>
            <button className={style.ctaButton}>Get started</button>
        </div> 
    )
}

