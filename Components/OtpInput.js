import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({ length = 4, onOtpSubmit }) => {

    const [otp, setOpt] = useState(new Array(length).fill(""));

    // console.log(otp)

    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [])

    // console.log(inputRefs)

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return

        const newOtp = [...otp]

        // allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOpt(newOtp);

        // submit trigger
        const combineOtp = newOtp.join("")
        if (combineOtp.length === length) onOtpSubmit(combineOtp);  // we are getting this otp inside the PhoneOtpLogin file , at the line number 49 and 27 for the console


        // Move to the next input if current field is filled
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus()
        }

    }

    // Move focus to the previous input field on backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            inputRefs.current[index - 1].focus()
        }
    }


    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1)
        // it will select from the range of the selected index range in the field... and end with that range of index

        /*
        // optional validation
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
        */
    }

    return (
        <div>
            {otp.map((value, index) => {
                return (
                    <input
                        key={index}
                        type='text'
                        value={value}
                        ref={(input) => (inputRefs.current[index] = input)}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className='otp-input'
                    />
                )
            })

            }
        </div>
    )
}

export default OtpInput
