import { useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import './styles.css';

const MovieRow = ({ title, items }) => {

    const [scrollX, setScrollX] = useState(0);

    const handleLeftScroll = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if( x > 0){
            x = 0;
        }
        setScrollX(x);
    }
    
    const handRighttScroll = () => {
        const windowWidth = Math.round(window.innerWidth / 2);
        let x = scrollX - windowWidth;
        const max = (-1 * items.results.length * 250) + (2 * windowWidth) - 60;
        if( x < max ){
            x = max;
        }

        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--listarea">
                <div className='navigate--before' onClick={handleLeftScroll} ><MdNavigateBefore size={50} /></div>
                <div className='navigate--next' onClick={handRighttScroll} ><MdNavigateNext size={50} /></div>
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 250
                }}>
                    {items.results.length > 0 && items.results.map( (item, key) => (
                        <div className="movieRow--item" key={key}>
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { MovieRow }