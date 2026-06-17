import  React , { useState } from 'react'
import { Eye, EyeOff } from "lucide-react";
import { Link }  from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import bgImage from '../assets/candlestick_bg.jpg'
import { API_BASE_URL } from "../services/config";



const Register = () => {
    

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone_no:"",    
        password: "",
        confirmPassword: ""
    })
        const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}

    const formHandle = async (e)=>{
        e.preventDefault();
        // console.log(formData);
        const payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_no: `+91${formData.phone_no}`,
            password: formData.password,
            confirm_password: formData.confirmPassword,
        }
        try {
            const response = await fetch (`${API_BASE_URL}/register/`,{
                method:"POST",
                headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(payload)
            })

            const data = await response.json();
            // console.log(data);
            
            if (response.status==201){
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone_no:"",
                    password: "",
                    confirmPassword: ""
                })

                navigate(`/verify-otp/register/`,{
                    state:{
                        email:formData.email
                    }
                });
            }
            else{
                console.log(data);               

            }
            

            
        } 
        catch (error) {
            console.log(error);
            
        }
        

        
    }



  return (
    <div className='text-white h-screen w-screen flex flex-col justify-center items-center bg-cover bg-center bg-black overflow-hidden' style={{ backgroundImage: `url(${bgImage})` }}>
        <div className='flex flex-col items-center gap-1 mb-10 '>
            <p className='text-3xl font-bold'>ChartMaster</p>
            <p className='text-gray-500'>Professional Charting platform</p>
        </div>
        <div className=' p-7 border outline-0 rounded-2xl bg-[#0A0C0F] opacity-90 '>
               <div className='flex w-sm bg-[#161B22] rounded p-px'>
                <Link to="/login" className='w-1/2 bg-[#161B22] rounded py-1.5 flex justify-center items-center hover:cursor-pointer  '>sign in</Link>
                <p className='w-1/2  rounded py-1.5 flex justify-center items-center hover:cursor-pointer bg-[#1C2330] '>Create Account</p>
               </div>
               <form action="" method="post" className='flex flex-col gap-0.5  ' onSubmit={formHandle}>
                <div className='w-full flex gap-7 mt-5'>
                    <div className='flex flex-col'>
                        <label className='text-sm text-gray-500'>First Name</label>
                        <input name='firstName' type="text" placeholder='John' value={formData.firstName} onChange={handleChange}
                        className='outline-0 border border-gray-600 text-sm rounded px-2 py-0.5 caret-transparent
                        bg-[#161B22] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00D4A8]' />
                    </div>
                    <div className='flex flex-col'>
                    <label className='text-sm text-gray-500'>Last Name</label>
                    <input name='lastName' type="text" placeholder='Doe' value={formData.lastName} onChange={handleChange}
                     className='outline-0 border border-gray-600 text-sm rounded px-2 py-0.5 caret-transparent
                      bg-[#161B22] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00D4A8]' />
                </div>
                </div>
                
                <div className='flex flex-col gap-1 mt-5'>
                    <label className='text-sm text-gray-500'>Mail ID</label>
                    <input name='email' type="text" placeholder='john.doe@example.com' value={formData.email} onChange={handleChange}
                     className='outline-0 border border-gray-600 text-sm rounded px-2 py-0.5 caret-transparent
                      bg-[#161B22] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00D4A8]' />
                </div>
                <div className='flex flex-col gap-1 mt-5'>
                    <label className='text-sm text-gray-500'>Phone Number</label>
                    <input name="phone_no" type="text" placeholder='123-456-7890' value={formData.phone_no} onChange={handleChange}
                     className='outline-0 border border-gray-600 text-sm rounded px-2 py-0.5 caret-transparent
                      bg-[#161B22] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00D4A8]' />
                </div>
                <div className='w-full flex  gap-7 mt-5'>
                    <div className='flex flex-col relative '>
                        <label className='text-sm text-gray-500'>Password</label>
                        <input name='password' type={showPassword ? "text" : "password"} placeholder='••••••••' value={formData.password} onChange={handleChange}
                        className='outline-0 border border-gray-600 text-sm rounded px-2 py-0.5 caret-transparent
                         bg-[#161B22] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00D4A8]' />
                         <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-8 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>
                    <div className='flex flex-col relative'>
                        <label className='text-sm text-gray-500'>Confirm Password</label>
                        <input name='confirmPassword' type={showConfirmPassword ? "text" : "password"} placeholder='••••••••' value={formData.confirmPassword} onChange={handleChange}
                        className='outline-0 border border-gray-600 text-sm rounded px-2 py-0.5 caret-transparent
                        bg-[#161B22] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00D4A8]' />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-8 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>

                    

                </div>
                <button className='w-full bg-[#00D4A8] rounded-lg py-1.5 flex justify-center items-center hover:cursor-pointer active:bg-[#00B38F] text-sm font-medium mt-5'>Create Account</button>
                

               </form>
        </div>
    </div>
  )
}

export default Register