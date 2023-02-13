// IMPORT //
import React, { useEffect, useRef } from "react";
import autoAnimate from '@formkit/auto-animate';

// CONST //
const ChatBody = ({ chat }) => {
  const aiStyle =
    "bg-white bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto block";

    const parent = useRef(null);
    const bottomRef = useRef(null);

    // ONLY FOR AUTO ANIMATION //
    useEffect(()=> {
parent.current && autoAnimate(parent.current);
    }, [parent])


    // FOR SCOLLING BOTTOM //
    useEffect(()=> {
      bottomRef.current?.scrollIntoView({behavior: "smooth"})
    },[chat])
    
    const handleSpeak = () => { 
      const utter = new SpeechSynthesisUtterance(); 
      utter.voice = window.speechSynthesis.getVoices()[0]; 
      window.speechSynthesis.speak(utter); 
    }; 
  
  return (
    <div className="flex flex-col gap-4" ref={parent}>
      {/* AI MESSAGE */}
      {chat.map((message, i) => {
       
        return (
          <div
            key={i}
            className={`border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] ${
              message.sender!== "user" && aiStyle
            }`}
          >
            <pre className="whitespace-pre-wrap">
              <span>{message.message}</span>
            </pre>
          </div>
        );
      })}

      <div ref={bottomRef} className="h-3"></div>
    </div>
  );
};

export default ChatBody;