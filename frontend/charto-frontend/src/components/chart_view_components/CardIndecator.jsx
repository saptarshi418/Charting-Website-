import React, { useState } from 'react'
import indicatorConfig from '../../services/configIndecatorField'


const CardIndecator = ({indPayload,clickedIndecator,close}) => {

  const fields = indicatorConfig[clickedIndecator]

  
const [settings,setSettings] = useState(
  () =>
    fields.reduce((acc,field)=>{
      acc[field.name] = field.default
      return acc
    },{})
)


  const handleChange = (name,value)=>{
    setSettings(prev=>({
      ...prev,
      [name]:value
    }))
  }


  const submitHandler = ()=>{

  const indicatorData = {
    id: Date.now(),
      indicator_name: clickedIndecator,
      settings
    }

    // console.log(indicatorData)
    indPayload(indicatorData)

    close()
  }


  return (
    <div className='
        fixed 
        inset-0 
        flex 
        items-center 
        justify-center
        bg-black/50
        z-50
    '>

        <div className='
          bg-[#0F1217] 
          border 
          border-gray-700 
          rounded 
          p-10 
          flex 
          flex-col 
          gap-3 
          items-center 
          text-gray-400
        '>

            <h2 className="text-lg font-medium">
              {clickedIndecator}
            </h2>


            {
              fields.map(field=>(

                <div 
                  key={field.name} 
                  className='w-full flex gap-3 text-sm items-center'
                > 

                  <label className="w-24">
                    {field.name}
                  </label>


                  {
                    field.type === "select" ?

                    <select
                      defaultValue={field.default}
                      onChange={(e)=>
                        handleChange(
                          field.name,
                          e.target.value
                        )
                      }
                      className="
                        bg-[#0F1217]
                        border
                        border-gray-600
                        rounded
                        px-2
                        outline-none
                      "
                    >

                      {
                        field.options.map(option=>
                          <option key={option}>
                            {option}
                          </option>
                        )
                      }

                    </select>


                    :

                    field.type === "color" ?

                    <div className="flex gap-2 items-center">

                      <input
                        type="color"
                        defaultValue={field.default}
                        onChange={(e)=>
                          handleChange(
                            field.name,
                            e.target.value
                          )
                        }
                        className="
                          w-10
                          h-8
                          cursor-pointer
                          bg-transparent
                        "
                      />

                      <span>
                        {settings[field.name] || field.default}
                      </span>

                    </div>


                    :


                    <input
                      type={field.type}
                      defaultValue={field.default}
                      onChange={(e)=>
                        handleChange(
                          field.name,
                          e.target.value
                        )
                      }
                      className="
                        border
                        border-gray-600
                        rounded
                        outline-none
                        w-full
                        px-2
                        bg-[#0F1217]
                      "
                    />

                  }

                </div>

              ))
            }


            <div className='w-full flex gap-9 mt-4'>

              <button
                onClick={submitHandler}
                className="
                  px-3
                  border
                  border-gray-400
                  rounded
                  text-sm
                  flex-1
                  bg-green-700
                  font-medium
                  hover:cursor-pointer
                  text-gray-300
                "
              >
                Submit
              </button>


              <button 
                className="
                  px-3
                  border
                  border-gray-400
                  rounded
                  text-sm
                  flex-1
                  bg-red-700
                  font-medium
                  hover:cursor-pointer
                  text-gray-300
                "
                onClick={close}
              >
                Close
              </button>

            </div>


        </div>
         
    </div>
  )
}

export default CardIndecator