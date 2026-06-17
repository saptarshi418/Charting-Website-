import React, { useState } from 'react'
import { useRef } from 'react'
import { useParams , useLocation , useNavigate  , Navigate } from 'react-router-dom'

import bgImage from '../assets/candlestick_bg.jpg'
import { API_BASE_URL } from "../services/config";

const VerifyOtp = () => {
     const inputs = useRef([]);
     const { purpose } = useParams();
     const location = useLocation()
     const [Email, setEmail] = useState("")
     const [otpTotal, setOtpTotal] = useState(["", "", "", "", "", ""])
     const navigate = useNavigate()
     
     

     if(!location.state?.email){
        return <Navigate to="/login" replace />
     }
     const parseEmail = location.state.email
     const endpoint = purpose == "register" ? "/register/verify-otp/" : "/login/verify-otp/"

     const handleKeyDown = (e, index) => {
            if (
                e.key === "Backspace" &&
                !e.target.value &&
                index > 0
            ) {
                const newOtp = [...otpTotal]
                newOtp[index] = ''
                setOtpTotal(newOtp)
                inputs.current[index - 1].focus();
            }
        };
    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^\d*$/.test(value)) {
            e.target.value = "";
            return;
        }
        const newOtp = [...otpTotal];
        newOtp[index] = value
        setOtpTotal(newOtp);    

        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
        };
    const handleMail = (e)=>{
        setEmail(e.target.value)
    }

    const formHandler = async (e)=>{
        e.preventDefault();
        if (Email != parseEmail){
            return alert("Put the right email")
        }
        const payload = {
            email : Email,
            otp: otpTotal.join("")
        }
        try {
            const response = await fetch (`${API_BASE_URL}${endpoint}`,{
                method:"POST",
                headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(payload)
            })

            const data = await response.json()
            console.log(data);
            

            if (response.ok) {
                localStorage.setItem("access", data.access);
                localStorage.setItem("refresh", data.refresh);

                setEmail("");
                setOtpTotal(["", "", "", "", "", ""]);

                navigate("/upload");
            } else {
                alert(data.error || "OTP verification failed");
            }


        } catch (error) {
            console.log(error)
        }

       
        
    }

  return (
    <div className='text-white h-screen w-screen flex flex-col justify-center items-center bg-cover bg-center' style={{ backgroundImage: `url(${bgImage})` }}>
        <div className='flex flex-col items-center gap-1 mb-10'>
            <p className='text-3xl font-bold'>ChartMaster</p>
            <p className='text-gray-500'>Professional Charting platform</p>
        </div>
        <div className=' p-7 border outline-0 rounded-2xl bg-[#0A0C0F] opacity-90 '>
               
               <form action="" method="post" className='flex flex-col gap-0.5' onSubmit={formHandler}>
                
                
                <div className='flex flex-col gap-1 mt-5'>
                    <label className='text-sm text-gray-500 ' >Mail ID</label>
                    <input type="text" placeholder='john.doe@example.com' required onChange={handleMail}
                     className='outline-0 border border-gray-600 text-sm rounded px-2 py-0.5 caret-transparent
                      bg-[#161B22] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00D4A8]' />
                </div>
                
                <div className='w-full flex flex-col relative  gap-1 mt-5'>  
                    
                        <label className='text-sm text-gray-500'>OTP</label>
                        <div className="flex gap-3" >
                            {[...Array(6)].map((_, index) => (
                                <input
                                key={index}
                                ref={(el) => (inputs.current[index] = el)}
                                type="text"
                                maxLength={1}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onChange={(e) => handleChange(e, index)}
                                required    
                                className="w-12 h-12 text-center text-lg rounded border border-gray-600
                                bg-[#161B22] focus:outline-none focus:ring-1 focus:ring-[#00D4A8]"
                                />
                            ))}
                        </div>
                    

                </div>
                <button onClick={() => {}} className='w-full bg-[#00D4A8] rounded-lg py-1.5 flex justify-center items-center hover:cursor-pointer active:bg-[#00B38F] text-sm font-medium mt-5'>Submit</button>
                

               </form>
        </div>
    </div>
  )
}

export default VerifyOtp