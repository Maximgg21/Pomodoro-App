import { useState } from "react";
import { MdDone } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { RiArrowUpSLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";

function TimeOption({children, setTempSettings, settings, ...rest}) {
    return (
        <label className="w-full flex justify-between items-center sm:flex-col sm:items-start">
            <span className="text-optionText font-medium w-full">{children}</span>
            <div className="relative w-full">
                <input 
                    {...rest}
                    className={`bg-timeOptionInput w-full rounded-md outline-none border-2 border-transparent focus:border-${settings.colorOption} px-3 py-2 font-semibold`}
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
                                [name]: (value * 1000 * 60) // converting value from minutes to milliseconds
                            }
                        }
                    })}
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
                <RiArrowUpSLine className="absolute size-8 right-2 -top-1 text-optionText font-semibold" onClick={() => setTempSettings(prev => ({
                    ...prev,
                    [rest.name]: Number(prev[rest.name] || 0) + (1 * 60 * 1000) // increment by 1 minute
                }))} />
                <RiArrowDownSLine className="absolute size-8 right-2 -bottom-1 text-optionText" onClick={() => setTempSettings(prev => ({
                    ...prev,
                    [rest.name]: Math.max((2 * 60 * 1000), Number(prev[rest.name] || 0)) - (1 * 60 * 1000) // decrement by 1 minute
                }))}/>
            </div>
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
    const Hr = () => <hr className="border-logo w-full"/>
    
    function handleApply() {
        onApply(tempSettings);
        setShowSettings(false);
    }

    function handleClose() {
        setShowSettings(false);
        setTempSettings(settings);
    }

    function FontColorSection({children}) {
        return <div className="w-full flex flex-col gap-3 items-center sm:flex-row sm:justify-between">{children}</div>
    }      

    return (
        <>
            <button className="touch-manipulation" onClick={() => {setShowSettings(true)}}>
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
                            setTempSettings={setTempSettings}
                            settings={settings}
                            >pomodoro
                        </TimeOption>
                        <TimeOption 
                            name="shortBreak" 
                            value={shortBreak === "" ? "" : (shortBreak / 1000 / 60)}
                            setTempSettings={setTempSettings}
                            settings={settings}
                            >short break
                        </TimeOption>
                        <TimeOption 
                            name="longBreak" 
                            value={longBreak === "" ? "" : (longBreak / 1000 / 60)}
                            setTempSettings={setTempSettings}
                            settings={settings}
                            >long break
                        </TimeOption>
                    </section>
                    <Hr />
                    <FontColorSection >
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
                    </FontColorSection>
                    <Hr />
                    <FontColorSection >
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