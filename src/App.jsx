import { useState, useEffect, useMemo, useRef } from "react";
import Clock from "./components/Clock";
import { IoMdSettings } from "react-icons/io";
import Settings from "./components/Settings";

function TimeOptionButton({ children, currentOption, name, settings, ...rest }) {
  return (
    <button
      className={`font-semibold rounded-full px-5 py-3 transition-colors duration-500 touch-manipulation ${
        currentOption === name ? "bg-" + settings.colorOption : "bg-transparent text-optionText"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

function App() {
  const [option, setOption] = useState("pomodoro");
  const [settings, setSettings] = useState({
    pomodoro: 180000,
    shortBreak: 300000,
    longBreak: 900000,
    fontOption: "font-roboto",
    colorOption: "theme1"
  });
  const [currentTime, setCurrentTime] = useState(settings[option]); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const audioRef = useRef(null);

  let percentageFilled = 100 - (currentTime / settings[option]) * 100;

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCurrentTime((time) => {
          if (time > 0) {
            return time - 10;
          } else {
            audioRef.current && audioRef.current.play(); 
            clearInterval(timer);
            return 0;
          }
        });
      }, 10);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className={`min-h-screen flex flex-col items-center gap-10 py-10 relative ${settings.fontOption}`}>
      <div className="text-logo font-bold text-center uppercase grid gap-2 -my-5">
        <div className="text-3xl tracking-[10px]">Brass</div>
        <hr className="bg-gray-300 w-full"/>
        <div className="tracking-widest">Birmingham</div>
      </div>
      <div className="max-w- flex p-2 bg-slate-900 rounded-full tracking-tight">
        <TimeOptionButton
          settings={settings}
          currentOption={option}
          name="pomodoro"
          onClick={() => {
            setOption("pomodoro");
            setCurrentTime(settings.pomodoro);
            setIsRunning(false);
          }}
        >
          pomodoro
        </TimeOptionButton>
        <TimeOptionButton
          settings={settings}
          currentOption={option}
          name="shortBreak"
          onClick={() => {
            setOption("shortBreak");
            setCurrentTime(settings.shortBreak);
            setIsRunning(false);
          }}
        >
          short break
        </TimeOptionButton>
        <TimeOptionButton
          settings={settings}
          currentOption={option}
          name="longBreak"
          onClick={() => {
            setOption("longBreak");
            setCurrentTime(settings.longBreak);
            setIsRunning(false);
          }}
        >
          long break
        </TimeOptionButton>
      </div>
      <Clock
        timeMs={currentTime}
        percentageFilled={percentageFilled}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        settings={settings}
      />
      <button className="touch-manipulation" onClick={() => {setShowSettings(true); setIsRunning(false)}}>
        <IoMdSettings className="size-10 text-optionText" />
      </button>
      {showSettings && (
        <Settings
          settings={settings}
          setSettings={setSettings}
          setShowSettings={setShowSettings}
          setCurrentTime={() => setCurrentTime(settings[option])}
        />
      )}
      <audio ref={audioRef} src="public\dingSound.mp3" />
    </div>
  );
}

export default App;
