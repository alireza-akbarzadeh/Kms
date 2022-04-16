import React, {useEffect} from 'react';

const useTimer = ({time = 1000}) => {
    const [state, setState] = React.useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setState(true)
        }, time);
        return () => clearTimeout(timer);
    }, [state, time])

    return state
};

export default useTimer;
