import {useState, useEffect} from 'react'

const useLocalStorage = (key, initialVal) => {
    const [value, setValue] = useState(() => {
        try {
            const localValue = window.localStorage.getItem(key);
            return localValue ? JSON.parse(localValue) : initialVal;
        } catch (e) {
            return initialVal;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;