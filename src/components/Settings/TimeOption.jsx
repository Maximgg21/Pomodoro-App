import { RiArrowUpSLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";

export default function TimeOption({children, setTempSettings, tempSettings, ...rest}) {
    return (
        <label className="w-full flex justify-between items-center sm:flex-col sm:items-start">
            <span className="text-optionText font-medium w-full">{children}</span>
            <div className="relative w-full">
                <input 
                    {...rest}
                    className={`bg-timeOptionInput w-full rounded-md outline-none border-2 border-transparent focus:border-${tempSettings.colorOption} px-3 py-2 font-semibold`}
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