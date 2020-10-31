import { useState } from "react";


export const useForm = initialValue => {
    const [values, setValues] = useState(initialValue);
    return [
        values, (formType,formValue) => {
            if (formType === 'reset') {
                return setValues(initialValue);
            }
            return setValues({...values, [formType] : formValue});
        },
    ];
};

// Maksud ...value / ...props ialah untuk mengkopi value yang lama
// Firebase adalah sebuah infrastruktur atau service yang akan membantu kerja kita.