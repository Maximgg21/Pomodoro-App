import { useState, useEffect, useMemo } from "react";
import Clock from "./components/Clock";
import { IoMdSettings } from "react-icons/io";
import Settings from "./components/Settings";

function TimeOptionButton({ children, currentOption, name, settings, ...rest }) {
  return (
    <button
      className={`font-semibold rounded-full px-5 py-3 transition-colors duration-500 ${
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
    pomodoro: 1500000,
    shortBreak: 300000,
    longBreak: 900000,
    fontOption: "roboto",
    colorOption: "theme1"
  });
  const [currentTime, setCurrentTime] = useState(settings[option]); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  let percentageFilled = 100 - (currentTime / settings[option]) * 100;

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCurrentTime((time) => {
          if (time > 0) {
            return time - 10;
          } else {
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
      <div className="text-3xl text-logo font-bold">pomodoro</div>
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
      <button className="" onClick={() => {setShowSettings(true); setIsRunning(false)}}>
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
    </div>
  );
}

export default App;
