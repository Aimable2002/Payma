// import axios from 'axios';
// import React, { useState } from 'react'

// const usepostTask = () => {
//   const [loading, setLoading] = useState(false);

//   const [isTrue, setIsTrue] = useState(null)

//   const tasked = async({Agreement, Description, Amount, Currency, Start_date, End_date}) => {
//     const Success = handleErr(Agreement, Description, Currency, Amount, Start_date, End_date)
//     if(!Success)return

//     const startDate = new Date(Start_date);
//     const endDate = new Date(End_date);

//     if (isNaN(startDate) || isNaN(endDate)) {
//       console.error('Invalid dates');
//       alert('Invalid dates');
//       return;
//     }

//     const durationInMs = endDate - startDate;
//     const Duration = Math.round(durationInMs / (1000 * 60 * 60 * 24));

//     if (Duration < 0) {
//       console.error('End date must be after start date');
//       alert('End date must be after start date');
//       return;
//     }
//     setLoading(true)
//     try{
//         const token = localStorage.getItem('on-user')
//         const res = await axios.post('/api/task/assign-task', {
//             Agreement,
//             Amount,
//             Description,
//             Currency,
//             Start_date,
//             End_date,
//             Duration
//         }, {
//             headers: {
//                 Authorization: `${JSON.parse(token).token}`
//             }
//         })
//         const data = res.data;
//         if(!data){
//             throw new Error
//         }
//         console.log('data :', data.message)
//         setIsTrue(data.message)
//     }catch(error){
//         console.error('error:', error.response?.data?.message || error.message)
//         alert('something went wrong check your wallet balance')
//     }finally{
//         setLoading(false)
//     }
//   }
//   return {loading, isTrue, tasked}
// }

// export default usepostTask


// function handleErr (Agreement, Amount, Currency, Start_date, End_date) {
//     if(!Agreement || !Amount || ! Currency || !Start_date || !End_date ){
//         return false
//     }else{
//         return true
//     }
// }



import axios from 'axios';
import React, { useState } from 'react'

const usepostTask = () => {
  const [loading, setLoading] = useState(false);

  const [isTrue, setIsTrue] = useState(null)

  const tasked = async({Job_Category, Description, Specification, Amount, Start_date, End_date}) => {
    const Success = handleErr(Job_Category, Description, Specification, Amount, Start_date, End_date)
    if(!Success)return alert ('fill the field')

    const startDate = new Date(Start_date);
    const endDate = new Date(End_date);

    if (isNaN(startDate) || isNaN(endDate)) {
      console.error('Invalid dates');
      alert('Invalid dates');
      return;
    }

    const durationInMs = endDate - startDate;
    const Duration = Math.round(durationInMs / (1000 * 60 * 60 * 24));

    if (Duration < 0) {
      console.error('End date must be after start date');
      alert('End date must be after start date');
      return;
    }
    setLoading(true)
    try{
        const token = localStorage.getItem('on-user')
        const res = await axios.post('/api/task/assign-task', {
            Agreement: Job_Category,
            Description, 
            Specification, 
            Amount, 
            Start_date, 
            End_date
        }, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })
        const data = res.data;
        if(!data){
            throw new Error
        }
        console.log('data :', data.message)
        setIsTrue(data.message)
    }catch(error){
        console.error('error:', error.response?.data?.message || error.message)
        alert('something went wrong check your wallet balance')
    }finally{
        setLoading(false)
    }
  }
  return {loading, isTrue, tasked}
}

export default usepostTask


function handleErr (Job_Category, Description, Specification, Amount, Start_date, End_date) {
    if(!Job_Category || !Description || ! Specification || !Amount || !Start_date || !End_date ){
        return false
    }else{
        return true
    }
}