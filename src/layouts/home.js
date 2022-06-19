import React from 'react'
import bg from '../assets/images/logo.png'
import { Link, Routes, Route } from 'react-router-dom';
import Reciter from './reciter';

function Home(props) {
    const [reciters, setReciters] = React.useState([]);
    const [chainReciters, setChainReciters] = React.useState([]);
    const [startRecitersShown, setStartRecitersShown] = React.useState(25);
    const [numberOfReciters, setNumberOfReciters] = React.useState(startRecitersShown);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        setReciters(props.reciters);
        setCurrentIndex(props.reciters.length - startRecitersShown);
    }, [props.reciters]);

    return (
        <div className='reciters__container'>
            <section className='reciters__column'>
                {
                    props.reciters.map(
                        (item, index) => {
                            if (index < numberOfReciters) {
                                return (
                                    <Link to={`./reciter/${item.id}`} className={item.animate ? 'reciter active' : 'reciter'} key={parseInt(item['id'])} id={item.id} onClick={(e) => console.log(e.currentTarget.id)}>
                                        <p>{item['name']}</p>
                                        <p>{item['rewaya']}</p>
                                      
                                    </Link>
                                )
                            } else {
                                return;
                            }
                        }
                    )
                }
            </section>
            <button className={'showmore'} onClick={() => {
                if (numberOfReciters < props.reciters.length) {
                    if (currentIndex > 0) {
                        if (currentIndex > startRecitersShown) {
                            setCurrentIndex(currentIndex - startRecitersShown);
                            setNumberOfReciters(numberOfReciters + startRecitersShown)
                        } else {
                            setNumberOfReciters(numberOfReciters + currentIndex)
                            setCurrentIndex(currentIndex - currentIndex)
                        }
                    }
                }
            }
            }>إظهار المزيد</button>

        </div>
    )
}

export default Home