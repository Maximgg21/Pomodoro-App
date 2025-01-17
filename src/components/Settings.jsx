
import { IoCloseOutline } from "react-icons/io5";

export default function Settings({timeOptions, setTimeOptions, setShowSettings}) {
    const Title = ({children}) => <div className="flex justify-center uppercase font-semibold tracking-widest">{children}</div>
    const Hr = () => <hr className="border-logo "/>

    function TimeOption({children, value, name}) {
        return (
            <label className="flex justify-between items-center">
                <span className="text-optionText">{children}</span>
                <input 
                    className="bg-optionInput w-1/2 rounded-md px-3 py-2 font-semibold" 
                    name={name}
                    onChange={(e) => setTimeOptions(prev => {
                        return {
                            ...prev,
                            [name]: (e.target.value * 1000 * 60)
                        }
                    })}
                    value={value} 
                    type="number" 
                />
            </label>
        )
    }

    function FontOption({font, selected}) {
        return (
            <div className="grid place-content-center bg-gray-400 rounded-full size-12">Aa</div>
        )
    }

    function ColorOption({color}) {
        return (
            <button className="bg-theme1 size-12 rounded-full"></button>
        )
    }

    return (
        <div className="absolute bg-white w-[90%] text-black rounded-lg">
            <div className="flex justify-between items-center px-6 py-5">
                <span className="text-xl font-semibold">Settings</span>
                <button onClick={() => setShowSettings(false)}><IoCloseOutline className="text-2xl" /></button>
            </div>
            <Hr />
            <div className="flex flex-col gap-5 px-5 pt-7 pb-16">
                <section className="flex flex-col gap-2">
                    <Title>time (minutes)</Title>
                    <TimeOption 
                        name="pomodoro" 
                        value={(timeOptions.pomodoro / 1000 / 60)}
                        >pomodoro
                    </TimeOption>
                    <TimeOption 
                        name="shortBreak" 
                        value={(timeOptions.shortBreak / 1000 / 60)}
                        >short break
                    </TimeOption>
                    <TimeOption 
                        name="longBreak" 
                        value={(timeOptions.longBreak / 1000 / 60)}
                        >long break
                    </TimeOption>
                </section>
                <Hr />
                <section className="flex flex-col gap-3">
                    <Title>font</Title>
                    <div className="flex gap-3 justify-center">
                        <FontOption />
                        <FontOption />
                        <FontOption />
                    </div>
                </section>
                <Hr />
                <section className="flex flex-col gap-3">
                    <Title>color</Title>
                    <div className="flex gap-3 justify-center">
                        <ColorOption />
                        <ColorOption />
                        <ColorOption />
                    </div>
                </section>
            </div>
        </div>
    )
}