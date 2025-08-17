import NannyCard from '../NannyCard/NannyCard.jsx'
import data from '../../data/babysitters.json'
import { useState } from 'react';
import style from './NannyList.module.css';
import { MdExpandMore } from "react-icons/md";

export default function NannyList() {
    const [visibleCount, setVisibleCount] = useState(3);

    const nannies = data;

    const handleLoadMore = () =>{
        setVisibleCount(prevCount => prevCount + 3);
    }

  return (
    <div className={style.nannyList}>
        <div className={style.nannyListContainer}>
            {nannies.slice(0, visibleCount).map((nanny, index) => (
                <NannyCard key={nanny.id ? nanny.id : `nanny-${index}`} nanny={nanny} />
            ))}
        </div>
        <button className={style.loadMoreButton} onClick={handleLoadMore}>
            Load More
            <MdExpandMore className={style.loadIcon} />
        </button>
    </div>
  )
}
