// import React, { useState } from 'react'

// import { Button } from '@nextui-org/react'
// import usepostTask from '../../hook/postTaskReport/postTask';


// const addJob = ({ resetView }) => {

//   const [inputValue, setInputValue] = useState({
//     Job_Category: '',
//     Description: '',
//     Specification: '',
//     Amount: '',
//     Start_date: '',
//     End_date: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputValue((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };
//   const {loading, isTrue, tasked} = usepostTask();
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const {Job_Category, Description, Specification, Amount, Start_date, End_date} = inputValue
//     console.log('input value :', inputValue)
//     await tasked(inputValue)
//   }

//   return (
//     <div className="w-full flex flex-col overflow-auto">
//         <div className='w-full fixed'>
//             <h1 onClick={resetView} style={{ cursor: 'pointer' }}>Back</h1>
//         </div>
//         <div className='w-full mt-8'>
//             <h1 className='w-full flex justify-center'>Form to add Job </h1>
//             <div className='w-full mt-4'>
//               <form onSubmit={handleSubmit}>
//                 <div className='w-full'>
//                   {['Job_Category', 'Description', 'Specification', 'Amount', 'Start_date', 'End_date'].map((field) => (
//                     field === 'Job_Category' ? (
//                       <select 
//                         key={field}
//                         id={field}
//                         name={field}
//                         value={inputValue[field]}
//                         onChange={handleChange}
//                         className="select select-accent outline-none w-full max-w-xs mb-2 p-2 border rounded"
//                       >
//                         <option value="" disabled>Select Job Category</option>
//                         <option value="Art">Art</option>
//                         <option value="IT Field">IT Field</option>
//                         <option value="Delivery">Delivery</option>
//                         <option value="Producer">Producer</option>
//                         <option value="Agri_business">Agri-business</option>
//                         <option value="Services">Services</option>
//                       </select>
//                     ) : field === 'Description' || field === 'Specification' ? (
//                       <textarea 
//                         key={field}
//                         id={field}
//                         name={field}
//                         type={field === 'Description' ? 'number': 'text'}
//                         value={inputValue[field]}
//                         placeholder={field.replace('_', ' ')} 
//                         onChange={handleChange}
//                         cols={2}
//                         className="outline-none w-full max-w-xs mb-2 p-2 border rounded border-accent"
//                       />
//                       ) : field === 'Amount' ? (
//                       <input 
//                         key={field}
//                         id={field}
//                         name={field}
//                         value={inputValue[field]} 
//                         onChange={handleChange}
//                         placeholder={field.replace('_', ' ')} 
//                         type={field === 'Amount' ? 'number' : null}
//                         className="mb-2 p-2 w-full flex flex-col border rounded border-accent" 
//                       />
//                     ) : field === 'Start_date' ? (
//                       <input 
//                         key={field}
//                         id={field}
//                         name={field}
//                         value={inputValue[field]} 
//                         onChange={handleChange}
//                         placeholder={field.replace('_', ' ')} 
//                         type={field === 'Start_date' ? 'date' :  null}
//                         className="mb-2 p-2 w-full flex flex-col border rounded border-accent" 
//                       />
//                     ) : field === 'End_date' ? (
//                       <input 
//                         key={field}
//                         id={field}
//                         name={field}
//                         value={inputValue[field]} 
//                         onChange={handleChange}
//                         placeholder={field.replace('_', ' ')} 
//                         type={field === 'End_date' ? 'date' : null}
//                         className="mb-2 p-2 w-full flex flex-col border rounded border-accent" 
//                       />
//                     ) : null
//                   ))}
//                 </div>
//               </form>
//               <div className='w-full mt-5'>
//                 <Button className="bg-base-100 btn btn-outline btn-accent" type='submit' onClick={handleSubmit}>Submit</Button>
//               </div>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default addJob





import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import usepostTask from '../../hook/postTaskReport/postTask';

const AddJob = ({ resetView }) => {
  const [inputValue, setInputValue] = useState({
    Job_Category: '',
    Description: '',
    Specification: '',
    Amount: '',
    Start_date: '',
    End_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const { loading, isTrue, tasked } = usepostTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('input value:', inputValue);
    await tasked(inputValue);
  };

  return (
    <div className="w-full flex flex-col overflow-auto">
      <div className="w-full fixed">
        <h1 onClick={resetView} style={{ cursor: 'pointer' }}>Back</h1>
      </div>
      <div className="w-full mt-8">
        <h1 className="w-full flex justify-center">Form to Add Job</h1>
        <div className="w-full mt-4">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              {['Job_Category', 'Description', 'Specification', 'Amount', 'Start_date', 'End_date'].map((field) => {
                if (field === 'Job_Category') {
                  return (
                    <select
                      key={field}
                      id={field}
                      name={field}
                      value={inputValue[field]}
                      onChange={handleChange}
                      className="select select-accent outline-none w-full mb-2 p-2 border rounded"
                    >
                      <option value="" disabled>Select Job Category</option>
                      <option value="Art">Art</option>
                      <option value="IT Field">IT Field</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Producer">Producer</option>
                      <option value="Agri_business">Agri-business</option>
                      <option value="Services">Services</option>
                    </select>
                  );
                }

                if (field === 'Description' || field === 'Specification') {
                  return (
                    <textarea
                      key={field}
                      id={field}
                      name={field}
                      value={inputValue[field]}
                      placeholder={field.replace('_', ' ')}
                      onChange={handleChange}
                      cols={30}
                      rows={2}
                      className="outline-none w-full  mb-2 p-2 border rounded border-accent"
                    />
                  );
                }

                if (field === 'Amount') {
                  return (
                    <input
                      key={field}
                      id={field}
                      name={field}
                      value={inputValue[field]}
                      onChange={handleChange}
                      placeholder={field.replace('_', ' ')}
                      type="number"
                      className="mb-2 p-2 w-full border rounded border-accent"
                    />
                  );
                }

                if (field === 'Start_date' || field === 'End_date') {
                  return (
                    <>
                      <label>
                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        key={field}
                        id={field}
                        name={field}
                        value={inputValue[field]}
                        onChange={handleChange}
                        placeholder={field.replace('_', ' ')}
                        type="date"
                        className="mb-2 p-2 flex flex-col w-full border rounded border-accent"
                      />
                    </>
                  );
                }

                return null;
              })}
            </div>
            <div className="w-full mt-5">
              <Button className="bg-base-100 btn btn-outline btn-accent" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;

