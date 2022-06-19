import React, { useState, useEffect, useRef } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import MicNoneIcon from '@material-ui/icons/MicNone';
import CloseIcon from '@material-ui/icons/Close';
import Dictaphone from './Dictaphone';
import { Link, Routes, Route } from 'react-router-dom';
import { recitersApi } from '../api/fetch.js'
function Main(props) {
    const [search, setSearch] = useState(false);
    var [inputValue, setInputValue] = useState('');
    const [startListen, setStartListen] = useState(false);
    const [reciters, setReciters] = useState([]);
    const [searchedReciters, setSearchedReciters] = useState([]);

    const keeyword = useRef();
    useEffect(() => {
        recitersApi()
            .then(dat => {
                if (React.unmounted) return;

                dat['reciters'].map(item => item.animate = false);

                dat['reciters'].map(item => {
                    item.nickName = setNick();
                    function setNick() {
                        if (item.name.match(/^['ا', 'أ', 'إ','آ']/g)) {
                            let name = item.name.replace(item.name.match(/^['ا', 'أ', 'إ','آ']/g), 'ا');
                            return name;
                        } else {
                            return item.name;
                        }
                    }
                }
                );
                reciters.push(dat['reciters'])
                setReciters(...reciters);
                props.setReciters(...reciters);
            })
    }, [])

    const getNamed = () => keeyword.current.value.length > 0 ? reciters.filter(item => item.name.includes(inputValue) || item.rewaya.includes(inputValue) || item.nickName.includes(inputValue)) : null

    useEffect(

        () => {
            inputValue.length > 0 ? reciters.map(item => { if (!item.name.includes(inputValue) && !item.rewaya.includes(inputValue) && !item.nickName.includes(inputValue)) { item.animate = true } else { item.animate = false } }) : reciters.map(item => { item.animate = false })
            keeyword.current.value = inputValue;
            setSearchedReciters(getNamed());
        }
        , [inputValue])

    useEffect(() => {
        props.setReciters(reciters)
        setTimeout(() => {
            if (inputValue.length > 0) props.setReciters(reciters.filter(item => item.name.includes(inputValue) || item.rewaya.includes(inputValue) || item.nickName.includes(inputValue)))
        }, 600);
    }, [inputValue]);

    return (

        <main>
            <div className='main'>
                <strong>القرآن الكريم</strong>
                <div className='search__box' onClick={() => setSearch(!search)}>
                    <SearchIcon />
                    <p>إلى من تريد الاستماع ؟</p>
                </div>
                <form className={search ? 'search__form active' : 'search__form'}>
                    <div className="jss154" onClick={() => { setSearch(false); setStartListen(false); }}><CloseIcon /></div>
                    <div className='input__field'>
                        <label htmlFor='search'><SearchIcon /></label>
                        <input ref={keeyword} type={'text'} name="search" id='search' placeholder={"إلى من تريد الاستماع ؟"} defaultValue={inputValue} onChange={(e) => { setInputValue(e.target.value); setSearchedReciters(getNamed()); }} />
                        <label className='search__by__mic' onClick={(e) => setStartListen(!startListen)}><MicNoneIcon /></label>
                    </div>
                    {
                        searchedReciters != null ? searchedReciters.length > 0 ? <div className='searched'> {
                            searchedReciters.length > 0 ?
                                searchedReciters.map(
                                    (item) => {
                                        return (
                                            <Link to={`./reciter/${item.id}`} key={item.id} id={item.id}>

                                                <span>{item.name}</span>
                                                <span>برواية: {item['rewaya']}</span>
                                            </Link>
                                        )
                                    }
                                )
                                : <p>عفوا لم نجد القارئ</p>
                        }</div> : '' : ''
                    }
                    <Dictaphone startListen={startListen} setInputValue={setInputValue} style={{ margin: 'auto', }} />
                </form>
            </div>
        </main>
    )
}

export default Main