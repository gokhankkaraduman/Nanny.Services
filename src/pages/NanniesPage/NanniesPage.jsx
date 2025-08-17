import NannyList from '../../components/NannyList/NannyList';
import style from './NanniesPage.module.css';
import Header from '../../components/Header/Header.jsx';

export default function NanniesPage() {
  return (
    <div className={style.nanniesPage}>
      <Header />
      <NannyList />
    </div>
  )
}


