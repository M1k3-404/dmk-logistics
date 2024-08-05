import { useCallback, useState } from "react"

export const useFormState = (initialState) => {
    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState([]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleDateChange = useCallback((name, date) => {
        setState((prevState) => ({
            ...prevState,
            [name]: date,
        }));
    }, []);

    const setErrorStatus = (errorList) => {
        const errorMap = errorList.reduce((acc, { key, error }) => {
            acc[key] = error;
            return acc;
        }, {});
        setErrors(errorMap);
    }

    const setFormState = (newState) => {
        setState(newState);
    }

    return [state, handleChange, handleDateChange, errors, setErrorStatus, setFormState];
}