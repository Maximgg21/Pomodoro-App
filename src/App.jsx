import { useState, useEffect, useMemo } from "react";
import Clock from "./components/Clock";
import { IoMdSettings } from "react-icons/io";
import Settings from "./components/Settings";

function TimeOptionButton({ children, currentOption, name, ...rest }) {
  return (
    <button
      className={`font-semibold rounded-full px-5 py-3 transition-colors duration-500 ${
        currentOption === name ? "bg-theme1" : "bg-transparent text-optionText"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

function App() {
  const [option, setOption] = useState("pomodoro");
  const [timeOptions, setTimeOptions] = useState({
    pomodoro: 1500000,
    shortBreak: 300000,
    longBreak: 900000,
  });
  const [currentTime, setCurrentTime] = useState(timeOptions[option]); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  let percentageFilled = 100 - (currentTime / timeOptions[option]) * 100;

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
    <div className="min-h-screen flex flex-col items-center gap-10 py-10 relative">
      <div className="text-3xl text-logo font-bold">pomodoro</div>
      <div className="max-w- flex p-2 bg-slate-900 rounded-full tracking-tight">
        <TimeOptionButton
          currentOption={option}
          name="pomodoro"
          onClick={() => {
            setOption("pomodoro");
            setCurrentTime(timeOptions.pomodoro);
            setIsRunning(false);
          }}
        >
          pomodoro
        </TimeOptionButton>
        <TimeOptionButton
          currentOption={option}
          name="shortBreak"
          onClick={() => {
            setOption("shortBreak");
            setCurrentTime(timeOptions.shortBreak);
            setIsRunning(false);
          }}
        >
          short break
        </TimeOptionButton>
        <TimeOptionButton
          currentOption={option}
          name="longBreak"
          onClick={() => {
            setOption("longBreak");
            setCurrentTime(timeOptions.longBreak);
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
      />
      <button className="" onClick={() => setShowSettings(true)}>
        <IoMdSettings className="size-10 text-optionText" />
      </button>
      {showSettings && (
        <Settings
          timeOptions={timeOptions}
          setTimeOptions={setTimeOptions}
          setShowSettings={setShowSettings}
        />
      )}
    </div>
  );
}

export default App;
