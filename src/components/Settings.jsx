import { useState } from "react";
import { MdDone } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

function TimeOption({children, value, setTempSettings, ...rest}) {
    return (
        <label className="flex justify-between items-center">
            <span className="text-optionText">{children}</span>
            <input 
                {...rest}
                className="bg-optionInput w-1/2 rounded-md px-3 py-2 font-semibold" 
                onChange={e => setTempSettings(prev => {
                    const {name, value} = e.target;
                    if (value === "") {
                        return {
                            ...prev,
                            [name]: ""
                        }
                    }
                    else {
                        return {
                            ...prev,
                            [name]: (value * 1000 * 60)
                        }
                    }
                })}
                value={value} 
                onBlur={e => setTempSettings(prev => {
                    const {name, value} = e.target;
                    if (value === "") {
                        return {
                            ...prev,
                            [name]: 0
                        }
                    }
                    else {
                        return prev
                    }
                })}
                type="number"
                min="1"
                step="1"
            />
        </label>
    )
}

function FontOption({font, setTempSettings, tempSettings, ...rest}) {
    return <button className={`grid place-content-center rounded-full size-12 font-${font} ${tempSettings.fontOption === rest.name ? "bg-darkerBackground text-white" : "bg-gray-400"}`} {...rest} onClick={(e) => setTempSettings(prev => ({...prev, fontOption: e.target.name}))}>Aa</button>
}

function ColorOption({color, setTempSettings, tempSettings, ...rest}) {
    return (
        <button className={`${color} size-12 rounded-full flex justify-center items-center`} {...rest} onClick={(e) => setTempSettings(prev => ({...prev, colorOption: e.target.name}))}>
            {tempSettings.colorOption === rest.name && <MdDone className="pointer-events-none" size={24}/>}
        </button>
    )
}

export default function Settings({settings, onApply}) {
    const [showSettings, setShowSettings] = useState(false);
    const [tempSettings, setTempSettings] = useState(settings);
    const {pomodoro, shortBreak, longBreak} = tempSettings;
    const Title = ({children}) => <div className="flex justify-center uppercase font-semibold tracking-widest">{children}</div>
    const Hr = () => <hr className="border-logo "/>
    
    function handleApply() {
        onApply(tempSettings);
        setShowSettings(false);
    }

    return (
        <>
            <button className="touch-manipulation" onClick={() => {setShowSettings(true)}}>
                <IoMdSettings className="size-10 text-optionText" />
            </button>

            {showSettings && 
            <div className="absolute bg-white w-[90%] max-w-[500px] max-h-[90%] text-black rounded-lg pb-8 overflow-visible">
                <div className="flex justify-between items-center px-6 py-5">
                    <span className="text-xl font-semibold">Settings</span>
                    <button className="text-2xl touch-manipulation" onClick={() => setShowSettings(false)}><IoCloseOutline /></button>
                </div>
                <Hr />
                <div className="flex flex-col gap-5 px-5 py-7 w-full">
                    <section className="flex flex-col gap-2 items-center">
                        <Title>time (minutes)</Title>
                        <TimeOption 
                            name="pomodoro" 
                            value={pomodoro === "" ? "" : (pomodoro / 1000 / 60)}
                            setTempSettings={setTempSettings}
                            >pomodoro
                        </TimeOption>
                        <TimeOption 
                            name="shortBreak" 
                            value={shortBreak === "" ? "" : (shortBreak / 1000 / 60)}
                            setTempSettings={setTempSettings}
                            >short break
                        </TimeOption>
                        <TimeOption 
                            name="longBreak" 
                            value={longBreak === "" ? "" : (longBreak / 1000 / 60)}
                            setTempSettings={setTempSettings}
                            >long break
                        </TimeOption>
                    </section>
                    <Hr />
                    <section className="flex flex-col gap-3">
                        <Title>font</Title>
                        <div className="flex gap-5 justify-center">
                            <FontOption 
                            setTempSettings={setTempSettings}
                            tempSettings={tempSettings}
                            font="roboto" name="roboto"/>
                            <FontOption 
                            setTempSettings={setTempSettings}
                            tempSettings={tempSettings}
                            font="merriweather" name="merriweather"/>
                            <FontOption 
                            setTempSettings={setTempSettings}
                            tempSettings={tempSettings}
                            font="lora" name="lora"/>
                        </div>
                    </section>
                    <Hr />
                    <section className="flex flex-col gap-3">
                        <Title>color</Title>
                        <div className="flex gap-5 justify-center">
                            <ColorOption 
                            setTempSettings={setTempSettings}
                            tempSettings={tempSettings}
                            color="bg-theme1" name="theme1"/>
                            <ColorOption 
                            setTempSettings={setTempSettings}
                            tempSettings={tempSettings}
                            color="bg-theme2" name="theme2"/>
                            <ColorOption 
                            setTempSettings={setTempSettings}
                            tempSettings={tempSettings}
                            color="bg-theme3" name="theme3"/>
                        </div>
                    </section>

                    <button 
                        className="absolute bg-orange-300 rounded-full w-52 py-5 bottom-0 translate-y-8 self-center"
                        onClick={handleApply}
                    >Apply Changes</button>
                </div>
            </div>}
        </>
    )
}