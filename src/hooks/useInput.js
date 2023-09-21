import { useState } from "react"


const useInput = (validationHandler) => {

    const [ data, setData] = useState('');
    const [ error, setError] = useState(true);
    const [isTouched, setIsTouched] = useState(false);

    function textChangeHandler(e) {
        setData(e.target.value)
        if(validationHandler(data))
            setError(false)            
        else
            setError(true)

    }

    function blurHandler() {
        setIsTouched(true);
        if(!data){
            setError(true);
            return;
        }        
        if(validationHandler(data))
            setError(false)            
        else
            setError(true)
    }


    return {
        data,
        error : error && isTouched,
        showErrorMessage : error,
        blurHandler,
        textChangeHandler
    }

}

export default useInput;