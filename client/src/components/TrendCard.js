import React from 'react'



const TrendData= [
    {
      name: "Minions",
      shares: 97,
    },
    {
      name: "Avangers",
      shares: 80.5,
    },
    {
      name: "Zainkeepscode",
      shares: 75.5,
    },
    {
      name: "Reactjs",
      shares: 72,
    },
    {
      name: "Elon Musk",
      shares: 71.9,
    },
    {
      name: "Need for Speed",
      shares: 20,
    },
  ];
  

const TrendCard = () => {
  return (
    <div className='flex flex-col justify-center  m-3  bg-white rounded-md pl-5'>
        <h2>Trends For Your</h2>
        {TrendData.map((each)=>{
            return(
                <div className='flex flex-col gap-0.5 '>
                    <span className='text-gray-600  font-bold'>#{each.name}</span>
                    <span>{each.shares}</span>
                </div>
            )
        })}
    </div>
  )
}

export default TrendCard