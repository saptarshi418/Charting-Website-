    import React from 'react'
    import { useState } from 'react'
    import { Eye, EyeOff } from "lucide-react";
    import { Link } from 'react-router-dom';
    import { useNavigate } from 'react-router-dom';
    import bgImage from '../assets/candlestick_bg.jpg'
    import { API_BASE_URL } from '../services/config';

    const Login = () => {
        const [showPassword, setShowPassword] = useState(false);
        const [Email, setEmail] = useState("")
        const [Password, setPassword] = useState("")
        const navigate = useNavigate()

        const formHandler = async function (e) {
            e.preventDefault();
            console.log(Email)
            console.log(Password)
            const payload = {
                email : Email,
                password : Password
            }
            try {
                    const response = await fetch(`${API_BASE_URL}/login/`,{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                        }, body:JSON.stringify(payload)
                    })

                const data = await response.json()
                console.log(data)
                if(response.ok){
                    setEmail("")
                    setPassword("")
                    navigate(`/verify-otp/login/`,{
                        state:{
                            email:Email
                        }
                    });
                }else{
                    alert(data.error || "Invalid credentials");
                }
            } catch (error) {
                console.log(error)
            }

            
        }
        
    return (
        <div className='text-white h-screen w-screen overflow-hidden flex flex-col justify-center items-center bg-cover bg-center' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='flex flex-col items-center gap-1 mb-10'>
                <p className='text-3xl font-bold'>ChartMaster</p>
                <p className='text-gray-500'>Professional Charting platform</p>
            </div>
            <div className=' p-7 border outline-0 rounded-2xl bg-[#0A0C0F] opacity-90 '>
                <div className='flex w-sm bg-[#161B22] rounded p-px'>
                    <p className='w-1/2  rounded py-1.5 flex justify-center items-center hover:cursor-pointer bg-[#1C2330] '>sign in</p>
                    <Link to="/register" className='w-1/2 bg-[#161B22] rounded py-1.5 flex justify-center items-center hover:cursor-pointer '>Create Account
                    
                    </Link>
                </div>
                <form action="" method="post" className='flex flex-col gap-0.5' onSubmit={formHandler} >
                    
                    
                    <div className='flex flex-col gap-1 mt-5'>
                        <label className='text-sm text-gray-500'>Mail ID</label>
                        <input type="text" placeholder='john.doe@example.com'
                        className='outline-0 border border-gray-600 text-sm rounded px-2 py-0.5 caret-transparent
                        bg-[#161B22] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00D4A8]' 
                        value={Email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                            
                            
                        }}    
                        />
                    </div>
                    
                    <div className='w-full flex flex-col relative  gap-1 mt-5'>  
                        
                            <label className='text-sm text-gray-500'>Password</label>
                            <input type={showPassword ? "text" : "password"} placeholder='••••••••'
                            className='w-full outline-0 border border-gray-600 text-sm rounded px-2 py-0.5 caret-transparent
                            bg-[#161B22] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00D4A8]'
                            value={Password}
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }} 
                            
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-7 transform text-gray-500 hover:text-gray-700 focus:outline-none"
                            >{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                        
                    

                        

                    </div>
                    <button onClick={() => {}} className='w-full bg-[#00D4A8] rounded-lg py-1.5 flex justify-center items-center hover:cursor-pointer active:bg-[#00B38F] text-sm font-medium mt-5' >Sign In</button>
                    

                </form>
            </div>
        </div>
    )
    }

    export default Login