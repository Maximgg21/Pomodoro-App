export default function Clock({timeMs=0, percentageFilled=0, isRunning=false, setIsRunning, settings}) {
    const timeSec = Math.ceil(timeMs / 1000);
    const clockSec = timeSec % 60;
    const clockMin = Math.floor((timeSec % 3600) / 60);
    const clockHr = Math.floor(timeSec / 3600);

    const colors = {
        theme1: 'rgb(248 112 111)',
        theme2: 'rgb(112 243 248)',
        theme3: 'rgb(217 129 247)',
    };

    return (
        <div className="size-80 rounded-full bg-gradient-to-br from-darkerBackground from-20% to-lighterBackground flex shrink-0 justify-center items-center">
            <div className="size-[85%] flex flex-col justify-center items-center rounded-full bg-darkerBackground">
                <div className={`flex flex-col justify-center items-center size-[93%] rounded-full`} style={{background: `conic-gradient(${colors[settings.colorOption]} ${percentageFilled}%, rgba(21, 25, 50, 1) 0)`}}>
                    <button className="size-[93%] rounded-full bg-darkerBackground grid grid-rows-[1fr_auto_1fr] text-clockText touch-manipulation" onClick={() => setIsRunning(prev => !prev)}>
                        <div className={`${clockHr > 0 ? "text-6xl" : 'text-[5.5rem]'} font-bold row-start-2 -m-2`}>
                            {clockHr > 0 && clockHr < 10 ? '0' : ''}{clockHr === 0 ? '' : clockHr + ':'}
                            {clockMin < 10 ? '0' : ''}{clockMin}
                            :{clockSec < 10 ? '0' : ''}{clockSec}
                        </div>
                        <div className={`text-3xl tracking-[.3em] font-thin row-start-3 ${clockHr > 0 ? "place-self-center" : ""}`}>{isRunning ? "pause" : "start"}</div>
                    </button>
                </div>
            </div>
        </div>
    )
}