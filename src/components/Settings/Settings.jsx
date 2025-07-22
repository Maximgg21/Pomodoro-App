import { useState, useRef } from "react";
import { MdDone } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import TimeOption from "./TimeOption"

function FontOption({font, setSettings, settings, ...rest}) { 
    return <button className={`grid place-content-center rounded-full size-12 font-${font} ${settings.fontOption === rest.name ? "bg-darkerBackground text-white" : "bg-gray-400"}`} {...rest} onClick={(e) => setSettings(prev => ({...prev, fontOption: e.target.name}))}>Aa</button>
}

function ColorOption({color, setSettings, settings, ...rest}) {
    return (
        <button className={`${color} size-12 rounded-full flex justify-center items-center`} {...rest} onClick={(e) => setSettings(prev => ({...prev, colorOption: e.target.name}))}>
            {settings.colorOption === rest.name && <MdDone className="pointer-events-none" size={24}/>}
        </button>
    )
}

export default function Settings({settings, setSettings, onApply}) {
    const [showSettings, setShowSettings] = useState(false);
    const prevSettings = useRef(settings);
    const {pomodoro, shortBreak, longBreak} = settings;
    const Title = ({children}) => <div className="flex justify-center uppercase font-semibold tracking-widest">{children}</div>
    const Hr = () => <hr className="border-logo w-full"/>
    
    function handleApply() {
        onApply(settings);
        setShowSettings(false);
    }

    function handleClose() {
        setShowSettings(false);
        setSettings(prevSettings.current);
    }

    function handleOpen() {
        setShowSettings(true);
        prevSettings.current = settings;
    }

    function FontColorSection({children}) {
        return <div className="w-full flex flex-col gap-3 items-center sm:flex-row sm:justify-between">{children}</div>
    }      

    return (
        <>
            <button className="touch-manipulation" onClick={handleOpen}>
                <IoMdSettings className="size-10 text-optionText" />
            </button>

            {showSettings && 
            <div className="absolute w-[90%] max-w-[600px] max-h-[90%] bg-white text-black rounded-3xl overflow-visible">
                <div className="relative size-full px-6 sm:px-10 ">
                    <div className="flex justify-between items-center py-5 sm:py-8">
                        <span className="text-3xl font-bold">Settings</span>
                        <button className="text-3xl touch-manipulation text-optionText" onClick={handleClose}><IoCloseOutline /></button>
                    </div>
                    <hr className="absolute left-0 bottom-0 w-full border-logo" />
                </div>
                <div className="flex flex-col sm:items-start gap-5 sm:gap-8 pt-7 pb-14 sm:pb-20 px-6 sm:px-10 w-full">
                    <Title className="">time (minutes)</Title>
                    <section className="flex flex-col sm:flex-row gap-2 sm:gap-8 sm:justify-between">
                        <TimeOption 
                            name="pomodoro" 
                            value={pomodoro === "" ? "" : (pomodoro / 1000 / 60)}
                            setSettings={setSettings}
                            settings={settings}
                            >pomodoro
                        </TimeOption>
                        <TimeOption 
                            name="shortBreak" 
                            value={shortBreak === "" ? "" : (shortBreak / 1000 / 60)}
                            setSettings={setSettings}
                            settings={settings}
                            >short break
                        </TimeOption>
                        <TimeOption 
                            name="longBreak" 
                            value={longBreak === "" ? "" : (longBreak / 1000 / 60)}
                            setSettings={setSettings}
                            settings={settings}
                            >long break
                        </TimeOption>
                    </section>
                    <Hr />
                    <FontColorSection >
                        <Title>font</Title>
                        <div className="flex gap-5 justify-center">
                            <FontOption 
                            setSettings={setSettings}
                            settings={settings}
                            font="roboto" name="roboto"/>
                            <FontOption 
                            setSettings={setSettings}
                            settings={settings}
                            font="merriweather" name="merriweather"/>
                            <FontOption 
                            setSettings={setSettings}
                            settings={settings}
                            font="lora" name="lora"/>
                        </div>
                    </FontColorSection>
                    <Hr />
                    <FontColorSection >
                        <Title>color</Title>
                        <div className="flex gap-5 justify-center">
                            <ColorOption 
                            setSettings={setSettings}
                            settings={settings}
                            color="bg-theme1" name="theme1"/>
                            <ColorOption 
                            setSettings={setSettings}
                            settings={settings}
                            color="bg-theme2" name="theme2"/>
                            <ColorOption 
                            setSettings={setSettings}
                            settings={settings}
                            color="bg-theme3" name="theme3"/>
                        </div>
                    </FontColorSection>

                    <button 
                        className={`bg-${settings.colorOption} text-white text-2xl font-normal absolute rounded-full w-48 py-4 bottom-0 translate-y-8 self-center`}
                        onClick={handleApply}
                    >Apply</button>
                </div>
            </div>}
        </>
    )
}