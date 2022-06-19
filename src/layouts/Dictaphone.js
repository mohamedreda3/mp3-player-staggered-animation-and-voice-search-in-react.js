import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  useEffect(() => {
    props.setInputValue(transcript)
  },[transcript]);

  useEffect(() => {
    return () => props.startListen ? SpeechRecognition.startListening({language:'ar'}) : SpeechRecognition.stopListening
  },[props.startListen]);
 
  useEffect(()=>props.startListen ? SpeechRecognition.startListening({language:'ar'}) : SpeechRecognition.stopListening,[])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      {/* <button type='reset' onClick={SpeechRecognition.startListening}>Start</button>
      <button type='reset' onClick={SpeechRecognition.stopListening}>Stop</button>
      <button type='reset' onClick={resetTranscript}>Reset</button> */}
      {/* <p>{transcript}</p> */}
    </div>
  );
};
export default Dictaphone;