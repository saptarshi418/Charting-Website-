  import { useDropzone } from "react-dropzone";
  import { useState } from "react";
  import UploadForm from "./Library_card/UploadForm";

  export default function FileUpload() {
    
    const [showPopup , setShowPopup] = useState(false)

    return (
      <div
        
        className="border-2 border-dashed outline-0 border-gray-600 rounded-lg p-10 text-center 
        cursor-pointer mr-4 ml-4 bg-[#0F1217] transition-all duration-300 hover:shadow-[inset_0_0_40px_rgba(6,182,212,0.15)]
        hover:border-green-500
        hover:bg-cyan-600/20"
          onClick={()=>{setShowPopup(true)}}
      >
        { <input /> }
        <p className="font-bold text-white">Drag & drop an Excel file here</p>
        <p className="text-sm text-gray-400">
          or click to browse
        </p>
        <p className="text-sm text-gray-500">Expected Columns: Datetime , Open , High , Low , Close , Volume</p>
        <p className="text-sm text-gray-500">Time frame supported || 1m , 5m, 15m , 30m , 1h , 4h , 1D</p>
        {showPopup &&  <UploadForm close={() => setShowPopup(false)}  />}

      </div>  
    );
  }