import { useState, useEffect } from 'react'
import { isAlphanumeric } from 'validator'

function useInputHooks() {

    const [input, setInput] = useState("")
    const [error, setError] = useState(false)
    const [onBlur, setOnBlur] = useState(false)
    const [onFocus, setOnFocus] = useState(false)

    useEffect(() => {
        
        if (onBlur || onFocus) {
            if(!isAlphanumeric(input)) {
                setError(true)
            } else {
                setError(false)
            }
        }

    }, [input])

    return [input, setInput, error, setOnBlur, setOnFocus]
}


export default useInputHooks