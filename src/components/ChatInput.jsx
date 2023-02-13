// IMPORT //
import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const ChatInput = ({ sendMessage, loading }) => {
  
 // COMMANDS //
 const commands = [

  // CLEAR TEXT MESSAGE //
  {
    command: "clear",
    callback: () => resetTranscript(value),
  },

  // RESET TEXT MESSAGE //
  {
    command: "reset",
    callback: () => resetTranscript(value),
  },

  // OPEN ANY WEBSITE //
  {
    command: "open *",
    callback: (site) => {
      window.open("http://" + site + ".com");
    },
  },

  {
    command: "open instagram",
    callback: ()=> {
      window.open("https://instagram.com", "_blank");
    }
  },

  {
    command: "open google",
    callback: ()=> {
      window.open("https://google.com", "_blank");
    }
  }
];

// CONST //
  const [value, setValue] = useState("");
  // const { speak } = useSpeechSynthesis();

  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
    //{speak({text: value})}
  };

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  useEffect(() => {
    setValue(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="w-full bg-white bg-opacity-10 max-h-40 rounded-lg px-3 py-3 overflow-auto relative shadow-lg">

      {/* LOADING SCREEN */}
      {loading ? (
        <img src="./loader.gif" className="w-8 m-auto" />
      ) : (
        <>

        {/* MESSAGE AREA */}
          <textarea
            onKeyDown={(e) => {
              e.keyCode === 13 && e.shiftKey === false && handleSubmit();
            }}
            rows={1}
            className="border-0 bg-transparent outline-none w-11/12 resize-none"
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />

          {/* MIC SPEECH TO TEXT */}
          <img
            onClick={() =>
              SpeechRecognition.startListening({
                continuous: true,
                language: "en-IN",
              })
            }
            src="./mic.png"
            alt="mic-button"
            width={20}
            className="absolute top-4 right-10 hover:cursor-pointer ease-in duration-100 hover:scale-125"
          />

          {/* SUBMIT MESSAGE */}
          <img
            onClick={handleSubmit}
            src="./send.png"
            alt="send-button"
            width={20}
            className="absolute top-4 right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125"
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;