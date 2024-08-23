import React, { useRef, useState } from 'react'

import { Button } from '@nextui-org/react'
import SummarizeIcon from '@mui/icons-material/Summarize';
import PostAddBusiness from './PostAddBusiness';
import postUploadPhoto from './uploadPhoto';


const addBusiness = ({ resetView }) => {

  const [inputValue, setInputValue] = useState({
    Business_Category: '',
    Description: '',
    Product: '',
    Amount: '',
    Quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Business_Category, Description, Product, Amount, Quantity, District } = inputValue;

    console.log('inputValue :', inputValue)
    console.log('Business_Category :', Business_Category)
    await postBusiness(inputValue)
};


  const [imgChange, setImgChange] = useState()

  const addImg = useRef()
  
  const handleRefProfile = () => {
    addImg.current.click();
  }
  const {loading, postBusiness} = PostAddBusiness();
  const {upload} = postUploadPhoto()
  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    await upload(file)
    setImgChange(new Date().getTime());
  }

  return (
    <div className="w-full flex flex-col overflow-auto">
        <div className='w-full fixed'>
            <h1 onClick={resetView} style={{ cursor: 'pointer' }}>Back</h1>
        </div>
        <div className='w-full mt-8'>
            <h1 className='w-full flex justify-center'>Form to add Business Product </h1>
            <div className='w-full mt-4'>
              <form onSubmit={handleSubmit}>
                <div className='w-full'>
                  {['Business_Category', 'Description', 'Product', 'Amount', 'Quantity', 'District', 'Add_photo'].map((field) => (
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
                    ) : field === 'Description' ? (
                      <textarea 
                        key={field}
                        id={`${field}_Description`}
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
                          style={{display: 'none'}}
                          ref={addImg}
                        />
                        <div className='w-full gap-4 flex flex-row' onClick={handleRefProfile}>
                          <div><SummarizeIcon /></div>
                          <div><h1>Add Photo</h1></div>
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
                        type={field === 'Start_date' || field === 'End_date' ? 'date' : field === 'Amount' ? 'number' : 'text'}
                        className="mb-2 p-2 w-full border rounded border-accent" 
                      />
                    )
                  ))}
                </div>
              </form>
              <div className='w-full mt-5'>
                <Button className="bg-base-100 btn btn-outline btn-accent" type='submit' onClick={handleSubmit}>Submit</Button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default addBusiness




