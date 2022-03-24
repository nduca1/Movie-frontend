import { useState, useEffect } from "react";
import { isEmail } from "validator";

function useIsEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const [onFoces, setOnFoces] = useState(false);

  useEffect(() => {
    if(onBlur || onFoces) {
        if (!isEmail(email)) {
            setError(true);
          } else {
            setError(false);
          }
    }
  }, [email]);

  return [email, setEmail, error, setOnBlur, setOnFoces];
}

export default useIsEmail;
