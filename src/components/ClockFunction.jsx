import React, { useState, useEffect } from 'react';

function ClockFunction() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Set up interval to update time every second
        const update = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(update);
    }, []); // Empty dependency array ensures the effect runs only on mount and unmount

    return (
        <div>
            <div className='clockDesign'>
                {/* Print the time string prettily */}
                {time.toLocaleTimeString()}
            </div>
        </div>
    );
}

export default ClockFunction;