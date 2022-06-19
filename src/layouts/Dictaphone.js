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
    return () => {
      SpeechRecognition.startListening({language:'ar'})
      if(!props.startListen){
       return SpeechRecognition.stopListening;
      }
    };
  },[props.startListen]);
 
  useEffect(()=>props.startListen ? SpeechRecognition.startListening({language:'ar'}) : SpeechRecognition.stopListening,[])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
    </div>
  );
};
export default Dictaphone;