export default function Clock({timeMs=0, percentageFilled=0, isRunning=false, setIsRunning, settings}) {
    const timeSec = Math.ceil(timeMs / 1000);
    const clockSec = timeSec % 60;
    let clockMin = Math.floor(timeSec / 60);
    clockMin = clockMin > 59 ? clockMin % 60 : clockMin;
    const clockHr = Math.floor(timeSec / 3600);

    const colors = {
        theme1: 'rgb(248 112 111)',
        theme2: 'rgb(112 243 248)',
        theme3: 'rgb(217 129 247)',
    };

    return (
        <div className="size-80 rounded-full bg-gradient-to-br from-darkerBackground from-20% to-lighterBackground max-w-96 flex justify-center items-center">
            <div className="size-[85%] flex flex-col justify-center items-center rounded-full bg-darkerBackground">
                <div className={`flex flex-col justify-center items-center size-[93%] rounded-full`} style={{background: `conic-gradient(${colors[settings.colorOption]} ${percentageFilled}%, rgba(21, 25, 50, 1) 0)`}}>
                    <button className="size-[93%] rounded-full bg-darkerBackground flex flex-col justify-center items-center text-clockText" onClick={() => setIsRunning(prev => !prev)}>
                        <div className={`${clockHr > 0 ? "text-6xl" : 'text-7xl'} font-bold translate-y-2`}>
                            {clockHr > 0 && clockHr < 10 ? '0' : ''}{clockHr === 0 ? '' : clockHr + ':'}
                            {clockMin < 10 ? '0' : ''}{clockMin}
                            :{clockSec < 10 ? '0' : ''}{clockSec}
                        </div>
                        <div className="text-3xl tracking-[.3em] font-extralight translate-y-7">{isRunning ? "pause" : "start"}</div>
                    </button>
                </div>
            </div>
        </div>
    )
}