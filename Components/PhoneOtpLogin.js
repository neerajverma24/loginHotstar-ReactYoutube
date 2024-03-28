import React, { useState } from 'react'
import OtpInput from './OtpInput'

const PhoneOtpLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [showOtpInput, setShowOtpInput] = useState(false)

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        // phone validation
        const regex = /[^0-9]/g;
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert("Invalid Phone Number");
            return;
        }
        // call BackEnd API
        // show OTP Input       (to get this, we have created an another state)
        setShowOtpInput(true);
    }

    const onOtpSubmit = (otp) => {
        console.log("Login Successfully", otp)
    }

    return (
        <div>
            {
                !showOtpInput
                    ?
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            value={phoneNumber}
                            onChange={handlePhoneNumber}
                            placeholder='Enter Phone Number'
                        />
                        <button type='submit'>
                            Submit
                        </button>
                    </form>
                    :
                    <div>
                        <p>Enter OTP sent to {phoneNumber}</p>
                        <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                    </div>
            }
        </div>
    )
}

export default PhoneOtpLogin
