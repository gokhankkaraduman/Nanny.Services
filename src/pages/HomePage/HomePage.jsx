import Header from '../../components/Header/Header.jsx';
import style from './HomePage.module.css';
import Hero from '../../components/Hero/Hero.jsx';

export default function HomePage() {
  return (
    <div className={style.container}>
      <Header />
      <Hero />
    </div>
  )
}
