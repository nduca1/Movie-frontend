import { useState, useEffect } from 'react'
import { isStrongPassword } from 'validator'

function usePasswordHooks() {

    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [onBlur, setOnBlur] = useState(false)
    const [onFocus, setOnFocus] = useState(false)

    useEffect(() => {
        
        if (onBlur || onFocus) {
            if(!isStrongPassword(password)) {
                setError(true)
            } else {
                setError(false)
            }
        }

    }, [password])
    


    return [password, setPassword, error, setOnBlur, setOnFocus]
}


export default usePasswordHooks