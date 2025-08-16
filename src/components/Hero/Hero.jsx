// Hero.jsx
import HeroLeft from "./HeroLeft/HeroLeft"
import HeroRight from "./HeroRight/HeroRight"
import style from './Hero.module.css';

export default function Hero() {
    return (
        <section className={style.hero}>
            <HeroLeft />
            <HeroRight />
        </section>
    )
}