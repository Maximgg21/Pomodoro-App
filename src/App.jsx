import React, { useState, useEffect, useMemo, useRef } from "react";
import Clock from "./components/Clock";
import Settings from "./components/Settings";
import TimeOptionButton from "./components/TimeOptionButton";
import { DEFAULT_SETTINGS } from "./config/defaultSettings";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [timerMode, setTimerMode] = useState("pomodoro");
  const [settings, setSettings] = useLocalStorage("settings", DEFAULT_SETTINGS);
  const [remainingTime, setRemainingTime] = useState(settings[timerMode]); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    function handleVisibilityChange() {
      if (!isRunning) return;

      if (document.hidden) {
        localStorage.setItem("timeWindowHidden", new Date().getTime());
      }
      else {
        const now = new Date().getTime();
        const timeWindowHidden = localStorage.getItem("timeWindowHidden") || "0";
        const timePassed = now - Number(timeWindowHidden);

        setRemainingTime(prev => timePassed > prev ? 0 : prev - timePassed);
      }
    }

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }, [isRunning]) 

  const percentageFilled = 100 - (remainingTime / settings[timerMode]) * 100;

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setRemainingTime((time) => {
          if (time > 0) {
            return time - 10;
          } else {
            audioRef.current && audioRef.current.play(); 
            clearInterval(intervalId);
            return 0;
          }
        });
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleApply = (newSettings) => {
    setSettings(newSettings);
    setRemainingTime(newSettings[timerMode]);
    setIsRunning(false);
  }

  return (
    <div className={`touch-manipulation min-h-screen overflow-auto flex flex-col items-center justify-center gap-10 sm:gap-[3vh] py-[3vh] relative font-${settings.fontOption}`}>
      <div className="text-logo font-bold text-center uppercase grid ">
        <div className="text-2xl tracking-[10px]">Pomodoro</div>
      </div>
      <div className="max-w- flex p-2 bg-slate-900 rounded-full tracking-tight">
        <TimeOptionButton
          settings={settings}
          currentOption={timerMode}
          name="pomodoro"
          onClick={() => {
            setTimerMode("pomodoro");
            setRemainingTime(settings.pomodoro);
            setIsRunning(false);
          }}
        >
          pomodoro
        </TimeOptionButton>
        <TimeOptionButton
          settings={settings}
          currentOption={timerMode}
          name="shortBreak"
          onClick={() => {
            setTimerMode("shortBreak");
            setRemainingTime(settings.shortBreak);
            setIsRunning(false);
          }}
        >
          short break
        </TimeOptionButton>
        <TimeOptionButton
          settings={settings}
          currentOption={timerMode}
          name="longBreak"
          onClick={() => {
            setTimerMode("longBreak");
            setRemainingTime(settings.longBreak);
            setIsRunning(false);
          }}
        >
          long break
        </TimeOptionButton>
      </div>
      <Clock
        timeMs={remainingTime}
        percentageFilled={percentageFilled}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        settings={settings}
      />

      <Settings
        settings={settings}
        onApply={handleApply}
      />

      <audio ref={audioRef} src="dingSound.mp3" />
    </div>
  );
}

export default App;
