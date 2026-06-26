const indicatorConfig = {

    SMA:[
        {
            name:"period",
            type:"number",
            default:20
        },
        {
            name:"col_name",
            type:"select",
            options:["close","open","high","low"],
            default:"close"
        },
        {
            name:"color",
            type:"color",
            default:"#00ff99"
        }
    ],


    EMA:[
        {
            name:"period",
            type:"number",
            default:20
        },
        {
            name:"col_name",
            type:"select",
            options:["close","open","high","low"],
            default:"close"
        },
        {
            name:"color",
            type:"color",
            default:"#ff9900"
        }
    ],


    RSI:[
        {
            name:"period",
            type:"number",
            default:14
        },
        {
            name:"col_name",
            type:"select",
            options:["close","open","high","low"],
            default:"close"
        },
        {
            name:"smooth_type",
            type:"select",
            options:["EMA","SMA"],
            default:"EMA"
        },
        {
            name:"smooth",
            type:"number",
            default:3
        },
        
    ],


    SUPERTREND:[
        {
            name:"period",
            type:"number",
            default:10
        },
        {
            name:"multiplier",
            type:"number",
            default:3
        },
        
    ]

}


export default indicatorConfig