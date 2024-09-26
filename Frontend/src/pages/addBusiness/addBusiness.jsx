import React, { useRef, useState } from 'react';
import { Button } from '@nextui-org/react';
import SummarizeIcon from '@mui/icons-material/Summarize';
import postUploadPhoto from './uploadPhoto';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Link } from 'react-router-dom';
import postBusinessProduct from './postBusinessProduct';



const addBusiness = () => {

    const [isNext, setIsNext] = useState(false)

    const handleNext = (e) => {
      e.preventDefault()
      setIsNext(!isNext)
    }
    const [inputValue, setInputValue] = useState({
      Business_Category: '',
      Business_Name: '',
      Business_Description: '',  
      Business_email: '', 
      Business_phone: '',
      Product_name: '', 
      Product_Description: '',
      Amount: '',
      Quantity: '',
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setInputValue((prev) => ({
        ...prev,
        [name]: value
      }));
    };
    const { loading, postBusiness } = postBusinessProduct()

  

   const handleSubmit = async (e) => {
     e.preventDefault()
     const { 
       Business_Category, 
       Business_Name, 
       Business_Description, 
       Business_email, 
       Business_phone, 
       Product_name, 
       Amount, 
       Quantity, 
       Product_Description 
     } = inputValue;
  
     console.log('inputValue :', inputValue);
     console.log('Business_Category :', Business_Category);
     await postBusiness(inputValue);
   };

   const [imgChange, setImgChange] = useState();

  const addImg = useRef();

  const handleRefProfile = () => {
   addImg.current.click();
  };

   const { upload } = postUploadPhoto();
  const handleProfileChange = async (e) => {
   const file = e.target.files[0];
   await upload(file);
   setImgChange(new Date().getTime());
  };
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex flex-col justify-center items-center'>
        <h1 className='text-center'>{!isNext ? 'Create Business' : 'Add Product'}</h1>
      {!isNext ? (
        <form className='flex flex-col justify-center items-center w-4/5 mt-10' onSubmit={handleSubmit}>
          <div className='w-full'>
            {['Business_Category', 'Business_Name', 'Business_Description',  'Business_email', 'Business_phone'].map((field) => (
              field === 'Business_Category' ? (
                <select
                  key={field}
                  id={`${field}_Business_Category`}
                  name={field}
                  value={inputValue[field]}
                  onChange={handleChange}
                  className="select select-accent outline-none w-full mb-2 p-2 border rounded"
                >
                  <option value="" disabled>Select Business Category</option>
                  <option value="Art">Art</option>
                  <option value="IT Field">IT Field</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Producer">Producer</option>
                  <option value="Agri_business">Agri-business</option>
                  <option value="Services">Services</option>
                  <option value="Others">Others</option>
                </select>
              ) : field === 'Business_Description' ? (
                <textarea
                  key={field}
                  id={`${field}_Business_Description`}
                  name={field}
                  value={inputValue[field]}
                  placeholder={field.replace('_', ' ')}
                  onChange={handleChange}
                  cols={2}
                  className="outline-none w-full mb-2 p-2 border rounded border-accent"
                />
              ) :  (
                <input
                  key={field}
                  id={`${field}_Dates`}                    
                  name={field}
                  value={inputValue[field]}
                  onChange={handleChange}
                  placeholder={field.replace('_', ' ')}
                  type={field === 'Business_email' ? 'email' : field === 'Business_phone' ? 'number' : 'text'}
                  className="mb-2 p-2 w-full border rounded border-accent"
                />
              )
            ))}
            {/* Google Maps Autocomplete Input */}
            {/* <GoogleMaps onChange={(location) => setInputValue(prev => ({ ...prev, Location: location }))} /> */}
          </div>
          <div>
            <Button 
              className='w-2/5 border-accent text-tiny text-accent outline-none bg-base-100 mt-10'
                
                type='submit'
              >
              Submit
            </Button>
          </div>
          <div className='w-full mt-10'>
            <Link to='/'><p>Return Home</p></Link>
          </div>
        </form>
      ) : (



        // not being used
        <form className='flex flex-col justify-center items-center w-4/5 mt-10' onSubmit={handleSubmit}>
          <div className='w-full'>
            {['Product_name', 'Product_Description', 'Amount', 'Quantity', 'Add_photo'].map((field) => (
              field === 'Product_Description' ? (
                <textarea
                  key={field}
                  id={`${field}_Product_Description`}
                  name={field}
                  value={inputValue[field]}
                  placeholder={field.replace('_', ' ')}
                  onChange={handleChange}
                  cols={2}
                  className="outline-none w-full mb-2 p-2 border rounded border-accent"
                />
              ) : field === 'Add_photo' ? (
                <>
                  <input
                    key={field}
                    id={`${field}_pc`}
                    name={field}
                    onChange={handleProfileChange}
                    placeholder={field.replace('_', ' ')}
                    type='file'
                    style={{ display: 'none' }}
                    ref={addImg}
                  />
                  <div className='w-full mb-4 gap-4 flex flex-row' onClick={handleRefProfile}> 
                    <div><SummarizeIcon className={`${imgChange ? 'text-info' : ''}`}/></div>
                    <div><h1 className={`${imgChange ? 'text-info' : ''}`}>{!imgChange ? 'Add Photo' : 'sent'}</h1></div>
                  </div>
                </>
              ) : (
                <input
                  key={field}
                  id={`${field}_Dates`}
                  name={field}
                  value={inputValue[field]}
                  onChange={handleChange}
                  placeholder={field.replace('_', ' ')}
                  type={field === 'Amount' ? 'number' : 'text'}
                  className="mb-2 p-2 w-full border rounded border-accent"
                />
              )
            ))}
            {/* Google Maps Autocomplete Input */}
            {/* <GoogleMaps onChange={(location) => setInputValue(prev => ({ ...prev, Location: location }))} /> */}
          </div>
          <div>
            <Button className='w-2/5 border-accent text-tiny text-accent outline-none bg-base-100 mt-10' type='submit'>Submit</Button>
          </div>
          <div className='w-full mt-10'>
            <p className='flex items-start' onClick={() => setIsNext(!isNext)}>click to reset back</p>
          </div>
        </form>
      )}
    </div>
    </div>
  )
}

export default addBusiness