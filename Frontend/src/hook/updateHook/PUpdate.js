import axios from 'axios'
import React, { useState } from 'react'

// update passwords 

const PUpdate = () => {
  const [loading, setLoading] = useState(false)
  const [tractP, setTractP] = useState(null)
  const [trackPStatus, setTrackPStatus] = useState(null)

  const updatePassword = async({OldPassword, NewPassword}) => {
    setLoading(true)
    try{
        const token = localStorage.getItem('on-user')
        const res = await axios.post('/api/Update-Edit/password', {
            OldPassword,
            NewPassword
        }, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })
        const data = res.data
        console.log('message :', data.message)
        if(!data){
            throw new Error('missing data')
        }
        setTractP(data.message)
        setTrackPStatus(data.status)
    }catch(error){
        console.log('error:', error.message)
        alert('something went wrong')
    }finally{
        setLoading(false)
    }
  }
  return {loading, tractP, trackPStatus, updatePassword}
}

// focusedInput22 === 'OldPassword' ? 'Type new password then' : focusedInput22 === 'NewPassword' ? 'Getting ready to save' : 

const useUpdateAll = () => {
    const [loading, setLoading] = useState(false)
    const [trackAll, setTrackAll] = useState(null)

    const updateAll = async({First_name, Last_name, userName, Title, Email, Phone_number}) => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.post('/api/Update-Edit/All', {
                First_name,
                Last_name,
                userName,
                Title,
                Email,
                Phone_number
            }, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data
            if(!data){
                throw new Error('missing data')
            }
            setTrackAll(data.message)
        }catch(error){
            console.log('error :', error.message)
            alert('something went wrong')
        }finally{
            setLoading(false)
        }
    }
    return {loading, trackAll, updateAll}
}

const useEditFirstName = () => {
    const [loading, setLoading] = useState(false)
    const [tractEditFirst, setTractEditFirst] = useState(null)

    const EditFirst = async ({First_name}) => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.post('/api/Update-Edit/FirstName', {
                First_name
            }, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data
            if(!data){
                throw new Error('missing data')
            }
            setTractEditFirst(data.message)
        }catch(error){
            console.log('error :', error.message)
            alert('somwthing went wrong')
        }finally{
            setLoading(false)
        }
    }
    return {loading, tractEditFirst, EditFirst}
}

const useEditLastName = () => {
    const [loading, setLoading] = useState(false)
    const [tractEditLastName, setTractEditLastName] = useState(null)

    const EditLastName = async ({Last_name}) => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.post('/api/Update-Edit/Last_name', {
                Last_name
            }, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data
            if(!data){
                throw new Error('missing data')
            }
            setTractEditLastName(data.message)
        }catch(error){
            console.log('error :', error.message)
            alert('somwthing went wrong')
        }finally{
            setLoading(false)
        }
    }
    return {loading, tractEditLastName, EditLastName}
}

const useEditUserName = () => {
    const [loading, setLoading] = useState(false)
    const [tractEditUserName, setTractEditUserName] = useState(null)

    const EditUserName = async ({userName}) => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.post('/api/Update-Edit/UserName', {
                userName
            }, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data
            if(!data){
                throw new Error('missing data')
            }
            setTractEditUserName(data.message)
        }catch(error){
            console.log('error :', error.message)
            alert('somwthing went wrong')
        }finally{
            setLoading(false)
        }
    }
    return {loading, tractEditUserName, EditUserName}
}

const useEditTitle = () => {
    const [loading, setLoading] = useState(false)
    const [tractEditTitle, setTractEditTitle] = useState(null)

    const EditTitle = async ({Title}) => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.post('/api/Update-Edit/Title', {
                Title
            }, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data
            if(!data){
                throw new Error('missing data')
            }
            setTractEditTitle(data.message)
        }catch(error){
            console.log('error :', error.message)
            alert('somwthing went wrong')
        }finally{
            setLoading(false)
        }
    }
    return {loading, tractEditTitle, EditTitle}
}

const useEditEmail = () => {
    const [loading, setLoading] = useState(false)
    const [tractEditEmail, setTractEditEmail] = useState(null)

    const EditEmail = async ({Email}) => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.post('/api/Update-Edit/Email', {
                Email
            }, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data
            if(!data){
                throw new Error('missing data')
            }
            setTractEditEmail(data.message)
        }catch(error){
            console.log('error :', error.message)
            alert('somwthing went wrong')
        }finally{
            setLoading(false)
        }
    }
    return {loading, tractEditEmail, EditEmail}
}

const useEditPhoneNumber = () => {
    const [loading, setLoading] = useState(false)
    const [tractEditPhone, setTractEditPhone] = useState(null)

    const EditPhone = async ({Phone_number}) => {
        setLoading(true)
        try{
            const token = localStorage.getItem('on-user')
            const res = await axios.post('/api/Update-Edit/Phone_number', {
                Phone_number
            }, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
            const data = res.data
            if(!data){
                throw new Error('missing data')
            }
            setTractEditPhone(data.message)
        }catch(error){
            console.log('error :', error.message)
            alert('somwthing went wrong')
        }finally{
            setLoading(false)
        }
    }
    return {loading, tractEditPhone, EditPhone}
}

export { PUpdate, useUpdateAll, useEditFirstName, useEditPhoneNumber, useEditEmail, useEditTitle, useEditUserName, useEditLastName}


// UPDATE EVERYTHING


// import React from 'react'



// export default useUpdateAll