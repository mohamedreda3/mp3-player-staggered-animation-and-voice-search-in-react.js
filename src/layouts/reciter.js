import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { surasName, recitersApi } from '../api/fetch';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
function Reciter() {
  const { userId } = useParams();
  const [reciterSurasNumber, setRiciterSurasNumber] = useState([]);
  const [surasNames, setSurasNames] = useState([]);
  const [reciterDataa, setReciterDataa] = useState([]);
  const [id, setId] = useState(userId);
  const [played, setPlayed] = useState(false);
  const [source, setSource] = useState('');
  const [audioduration, setAudioduration] = useState(0);
  const [currentSecond, setCurrentSecond] = useState(0);
  const audioPlay = useRef('');
  const playerProgress = useRef();
  const [stragged, setStragged] = useState(true);
  var [time, setTime] = useState({ 'sec': '00', 'min': '00', 'hour': '00' });

  function isPlaying() {
    return !audioPlay.current.paused;
  }

  function playAudio() {
    if (!isPlaying()) {
      if (source != '') {
        setPlayed(true);
        audioPlay.current.play();
      }
    } else {
      if (source != '') {
        setPlayed(false);
        audioPlay.current.pause();
      }
    }
  }

  function getSource(src) {
    setSource(src);
  }



  useEffect(() => {
    audioPlay.current.src = '';
    audioPlay.current.src = source;
    if (source != '') {
      setPlayed(true);
      setTimeout(() => {
        audioPlay.current.play();
        setAudioduration(Math.floor(audioPlay.current.duration))
      }, 1000);
    }


  }, [source]);

  useEffect(() => {

    if (played) {
      setPlayed(true);
      audioPlay.current.play();
    }
  }, [played]);

  // useEffect(() => {
  //   if (audioPlay.current.ended) {
  //     setPlayed(false);
  //   }
  // }, [currentSecond]);

  useEffect(() => {
    const sec = (audioduration % 60);
    const min = Math.floor(((audioduration - sec) / 60));
    const hour = Math.floor(((min) / 60));
    const minute = min % 60;
    setTime({ 'sec': sec < 10 ? `0${sec}` : sec, "min": minute < 10 ? `0${minute}` : minute, "hour": hour < 10 ? `0${hour}` : hour });
  }, [audioduration])

  useEffect(() => { setId(userId) }, []);

  useEffect(() => {
    const getStragged = () => setTimeout(() => setStragged(false), 600);
    clearTimeout(getStragged());
    getStragged()
  }, [stragged]);

  useEffect(() => { setId(userId); setStragged(true); }, [userId]);
  useEffect(() => {
    surasName().then(async data => {
      let reciter__Data = await data;
      setSurasNames(reciter__Data['Suras_Name'])
    })
  }, []);

  useEffect(() => {
    recitersApi().then(data => {
      let reciterData = data['reciters'].filter(item => (item.id) == (id));
      setReciterDataa(reciterData[0])
      setRiciterSurasNumber(reciterData[0].suras.split(','))
    })
  }, [id])

  useEffect(() => {
    var current;
    function falsePalyed() {
      clearInterval(current);
      setCurrentSecond(Math.floor(0))
       setPlayed(false);
    }
    current = setInterval(() => {
        var currTime = Math.floor(audioPlay.current.currentTime);
        var durate = audioduration;
        
        (currTime < (audioPlay.current.duration-1)) ? setCurrentSecond(Math.floor(currTime)) : falsePalyed()
      }, 1000)
  }, [played, currentSecond]);


  return (
    <div className={stragged ? 'suras__container active' : 'suras__container'}>
      <div className={stragged ? 'reciter__data active' : 'reciter__data'}>
        <p>{reciterDataa['name']}</p>
        <p>{reciterDataa['rewaya']}</p>
      </div>
      <div className='reciter__suras'>

        {
          reciterSurasNumber.map(

            (item, index) => {
              return surasNames[item - 1].id == item ?
                <div className={stragged ? "sora-item show" : "sora-item"} key={item} style={{ '--i': item }}>
                  <span>{surasNames[item - 1].name}</span>
                  <span style={{}} data-played={item - 1} id={reciterDataa['Server'] + `/${(item) < 10 ? '00' + (item) : (item) < 100 ? '0' + (item) : (item)}.mp3`} onClick={e => {
                    setPlayed(true);
                    return getSource(e.currentTarget.id);
                  }}><PlayCircleOutlineIcon /></span>
                </div>
                : null;
            }
          )
        }
        <div className={stragged ? 'played__sura active' : 'played__sura'}>
          <span onClick={() => playAudio()}>{!played ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}</span>
          <span className={'play__progress'}>
            {/* <span ref={playerProgress} className="progress__bar" onClick={(e) => e.offsetWidth} style={{ width: currentSecond + "%" }}></span> */}
            <input className="range" type="range" min={0}
              onChange={e => {
                audioPlay.current.currentTime = e.target.value;
                setPlayed(true)
              }}
              value={currentSecond} max={audioPlay.current.duration} />
            <audio ref={audioPlay} src={source} ></audio>
          </span>
          <span>{time.hour + ' : ' + time.min + ' : ' + time.sec}</span>
        </div>
      </div>
    </div>
  );
}

export default Reciter