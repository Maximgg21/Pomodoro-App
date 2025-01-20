import { MdDone } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

function TimeOption({children, value, setSettings, ...rest}) {
    return (
        <label className="flex justify-between items-center">
            <span className="text-optionText">{children}</span>
            <input 
                {...rest}
                className="bg-optionInput w-1/2 rounded-md px-3 py-2 font-semibold" 
                onChange={e => setSettings(prev => {
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
                onBlur={e => setSettings(prev => {
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
            />
        </label>
    )
}

export default function Settings({settings, setSettings, setShowSettings, setCurrentTime}) {
    const {pomodoro, shortBreak, longBreak} = settings;
    const Title = ({children}) => <div className="flex justify-center uppercase font-semibold tracking-widest">{children}</div>
    const Hr = () => <hr className="border-logo "/>
    
    function FontOption({font, ...rest}) {
        return <button className={`grid place-content-center rounded-full size-12 ${font} ${settings.fontOption === rest.name ? "bg-darkerBackground text-white" : "bg-gray-400"}`} {...rest} onClick={(e) => setSettings(prev => ({...prev, fontOption: e.target.name}))}>Aa</button>
    }

    function ColorOption({color, ...rest}) {
        return (
            <button className={`${color} size-12 rounded-full flex justify-center items-center`} {...rest} onClick={(e) => setSettings(prev => ({...prev, colorOption: e.target.name}))}>
                {settings.colorOption === rest.name && <MdDone size={24}/>}
            </button>
        )
    }

    return (
        <div className="absolute bg-white w-[90%] text-black rounded-lg">
            <div className="flex justify-between items-center px-6 py-5">
                <span className="text-xl font-semibold">Settings</span>
                <button className="text-2xl touch-manipulation" onClick={() => {setShowSettings(false); setCurrentTime()}}><IoCloseOutline /></button>
            </div>
            <Hr />
            <div className="flex flex-col gap-5 px-5 pt-7 pb-16">
                <section className="flex flex-col gap-2">
                    <Title>time (minutes)</Title>
                    <TimeOption 
                        name="pomodoro" 
                        value={pomodoro === "" ? "" : (pomodoro / 1000 / 60)}
                        setSettings={setSettings}
                        >pomodoro
                    </TimeOption>
                    <TimeOption 
                        name="shortBreak" 
                        value={shortBreak === "" ? "" : (shortBreak / 1000 / 60)}
                        setSettings={setSettings}
                        >short break
                    </TimeOption>
                    <TimeOption 
                        name="longBreak" 
                        value={longBreak === "" ? "" : (longBreak / 1000 / 60)}
                        setSettings={setSettings}
                        >long break
                    </TimeOption>
                </section>
                <Hr />
                <section className="flex flex-col gap-3">
                    <Title>font</Title>
                    <div className="flex gap-5 justify-center">
                        <FontOption font="font-roboto" name="font-roboto"/>
                        <FontOption font="font-robotoMono" name="font-robotoMono"/>
                        <FontOption font="font-playwriteIN" name="font-playwriteIN"/>
                    </div>
                </section>
                <Hr />
                <section className="flex flex-col gap-3">
                    <Title>color</Title>
                    <div className="flex gap-5 justify-center">
                        <ColorOption color="bg-theme1" name="theme1"/>
                        <ColorOption color="bg-theme2" name="theme2"/>
                        <ColorOption color="bg-theme3" name="theme3"/>
                    </div>
                </section>
            </div>
        </div>
    )
}