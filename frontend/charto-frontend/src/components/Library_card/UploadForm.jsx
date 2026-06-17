import React, { useState } from 'react'
import { useDropzone } from "react-dropzone";
// import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {FileInput} from 'lucide-react';
import {Loader} from "lucide-react";
import api from "../../services/api";



const UploadForm = ({ close }) => {
  const [dataName, setDataName] = useState("")
  const [asset, setAsset] = useState("indices")
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
      accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"],
    },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0])
      console.log(acceptedFiles[0]);
    },
  })

  const dataNameHandler = async (e)=>{
    setDataName(e.target.value)
      
  }
  const assetHandler = (e)=>{
    console.log(e.target.value);
    setAsset(e.target.value)
    
  }
  const formHandeler = async (e)=>{
    e.preventDefault()
    setLoading(true)
    console.log(loading);
    
    const formData = new FormData();

    formData.append("name", dataName);
    formData.append("file", file);
    formData.append("data_type", asset);

    try {
      
      
      
      const response = await api.post(
        "/user/dataset/",
        formData
      )
      
      close();
      navigate("/upload");
      
      console.log(loading);
    } catch (error) {
      if(error.response?.status == 401){
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login")
      }
      console.log(error.response?.data)
    }finally{
      setLoading(false);
    }

    
    
  }
  


  return (
    <div  onClick={(e)=>e.stopPropagation()} className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-sm border-2
     border-white rounded-2xl p-6 bg-[#0F1217] text-white flex flex-col gap-4'>
      {
 loading && (
   <div className="
   absolute inset-0 
   bg-black/80 
   flex items-center justify-center
   rounded-2xl
   ">
      <Loader color="#28623e"
        size={50}
        className="animate-spin text-[#00BFA0]"
      />
   </div>
 )
}
        <div className='flex flex-col items-start '>
            <p className='font-bold text-2xl'>Upload Dataset</p>
            <p>Import your candelstick data </p>
        </div>
        <form action="" className='flex flex-col gap-3' onSubmit={formHandeler}>
            <div className='border-2 border-dashed outline-0 border-gray-600 
        rounded-lg p-10 text-center flex items-center justify-center relative' 
        {...getRootProps()}
        >
            {<input {...getInputProps()} />}
            <FileInput color="#00BFA0" />
            {file && (
              <p className="text-sm text-gray-600 absolute bottom-1">
                Selected: {file.name}
  </p>
)}
        </div>

        <div className='flex flex-col items-start gap-2'>
            <label className='font-bold text-sm text-gray-600'>Dataset Name</label>
            <input type="text" placeholder='e.g. NIFTY50 JAN FUT' value={dataName} onChange={dataNameHandler} className='outline-0 w-full border border-gray-600 text-sm rounded px-2 py-0.5 caret-transparent
                      bg-[#161B22] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00D4A8]' />
        </div>
        <div className='flex flex-col items-start gap-2'>
            <label className='font-bold text-sm text-gray-600'>Asset Type</label>
            <select name="" id="" onChange={assetHandler}  className='outline-0 w-full border border-gray-600 text-sm rounded px-2 py-0.5 caret-transparent
                      bg-[#161B22] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00D4A8]'>
              <option value="indices">Index</option>
              <option value="stock">Stock</option>
              <option value="forex">Forex</option>
              <option value="commodity">Commodity</option>
              <option value="crypto">Crypto</option>  
            </select>
        </div>
        <div className='w-full flex items-center gap-3'>
          <button className='bg-[#00BFA0] px-22 py-0.5 font-medium text-black text-sm  rounded hover:cursor-pointer hover:bg-[#06a78c]'>Upload</button>
          <button className='bg-[#00BFA0] px-8 py-0.5 font-medium text-black text-sm rounded' type="button" onClick={()=>{
            console.log("clicked");
            
            close()
          }}>Cancel</button>
        </div>
        </form>
    </div>
  )
}

export default UploadForm