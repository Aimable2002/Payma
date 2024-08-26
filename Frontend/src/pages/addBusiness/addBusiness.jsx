// import React, { useRef, useState } from 'react'

// import { Button } from '@nextui-org/react'
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import PostAddBusiness from './PostAddBusiness';
// import postUploadPhoto from './uploadPhoto';


// const addBusiness = ({ resetView }) => {

//   const [inputValue, setInputValue] = useState({
//     Business_Category: '',
//     Description: '',
//     Product: '',
//     Amount: '',
//     Quantity: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputValue((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { Business_Category, Description, Product, Amount, Quantity, District } = inputValue;

//     console.log('inputValue :', inputValue)
//     console.log('Business_Category :', Business_Category)
//     await postBusiness(inputValue)
// };


//   const [imgChange, setImgChange] = useState()

//   const addImg = useRef()
  
//   const handleRefProfile = () => {
//     addImg.current.click();
//   }
//   const {loading, postBusiness} = PostAddBusiness();
//   const {upload} = postUploadPhoto()
//   const handleProfileChange = async (e) => {
//     const file = e.target.files[0];
//     await upload(file)
//     setImgChange(new Date().getTime());
//   }

//   return (
//     <div className="w-full flex flex-col overflow-auto">
//         <div className='w-full fixed'>
//             <h1 onClick={resetView} style={{ cursor: 'pointer' }}>Back</h1>
//         </div>
//         <div className='w-full mt-8'>
//             <h1 className='w-full flex justify-center'>Form to add Business Product </h1>
//             <div className='w-full mt-4'>
//               <form onSubmit={handleSubmit}>
//                 <div className='w-full'>
//                   {['Business_Category', 'Description', 'Product', 'Amount', 'Quantity', 'District', 'Add_photo'].map((field) => (
//                     field === 'Business_Category' ? (
//                       <select 
//                         key={field}
//                         id={`${field}_Business_Category`}
//                         name={field}
//                         value={inputValue[field]}
//                         onChange={handleChange}
//                         className="select select-accent outline-none w-full mb-2 p-2 border rounded"
//                       >
//                         <option value="" disabled>Select Business Category</option>
//                         <option value="Art">Art</option>
//                         <option value="IT Field">IT Field</option>
//                         <option value="Delivery">Delivery</option>
//                         <option value="Producer">Producer</option>
//                         <option value="Agri_business">Agri-business</option>
//                         <option value="Services">Services</option>
//                         <option value="Others">Others</option>
//                       </select>
//                     ) : field === 'Description' ? (
//                       <textarea 
//                         key={field}
//                         id={`${field}_Description`}
//                         name={field}
//                         value={inputValue[field]}
//                         placeholder={field.replace('_', ' ')} 
//                         onChange={handleChange}
//                         cols={2}
//                         className="outline-none w-full mb-2 p-2 border rounded border-accent"
//                       />
//                     ) : field === 'Add_photo' ? (
//                       <>
//                         <input 
//                           key={field}
//                           id={`${field}_pc`}
//                           name={field}
//                           onChange={handleProfileChange}
//                           placeholder={field.replace('_', ' ')}
//                           type='file' 
//                           style={{display: 'none'}}
//                           ref={addImg}
//                         />
//                         <div className='w-full gap-4 flex flex-row' onClick={handleRefProfile}>
//                           <div><SummarizeIcon /></div>
//                           <div><h1>Add Photo</h1></div>
//                         </div>
//                       </>
//                     ) : (
//                       <input 
//                         key={field}
//                         id={`${field}_Dates`}
//                         name={field}
//                         value={inputValue[field]} 
//                         onChange={handleChange}
//                         placeholder={field.replace('_', ' ')} 
//                         type={field === 'Start_date' || field === 'End_date' ? 'date' : field === 'Amount' ? 'number' : 'text'}
//                         className="mb-2 p-2 w-full border rounded border-accent" 
//                       />
//                     )
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

// export default addBusiness








import React, { useRef, useState } from 'react';
import { Button } from '@nextui-org/react';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PostAddBusiness from './PostAddBusiness';
import postUploadPhoto from './uploadPhoto';
//import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = 'AIzaSyCIRjn9GL-E-eKxxsrgq2jiT0ux0tRNFjM';

function loadScript(src, position, id, callback) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('defer', '');
  script.setAttribute('id', id);
  script.src = src;

  script.onload = () => {
    if (callback) callback();
  };

  position.appendChild(script);
}


const autocompleteService = { current: null };

const GoogleMaps = ({ onChange }) => {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: '100%' }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        onChange(newValue ? newValue.description : ''); // Pass the selected value to parent
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );
        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

const AddBusiness = ({ resetView }) => {
  const [inputValue, setInputValue] = useState({
    Business_Category: '',
    Description: '',
    Product: '',
    Amount: '',
    Quantity: '',
    Location: '' // Adding Location to track the selected place
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

    const { Business_Category, Description, Product, Amount, Quantity, Location } = inputValue;

    console.log('inputValue :', inputValue);
    console.log('Business_Category :', Business_Category);
    await postBusiness(inputValue);
  };

  const [imgChange, setImgChange] = useState();

  const addImg = useRef();

  const handleRefProfile = () => {
    addImg.current.click();
  };

  const { loading, postBusiness } = PostAddBusiness();
  const { upload } = postUploadPhoto();
  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    await upload(file);
    setImgChange(new Date().getTime());
  };

  return (
    <div className="w-full flex flex-col overflow-auto">
      <div className='w-full fixed'>
        <h1 onClick={resetView} style={{ cursor: 'pointer' }}>Back</h1>
      </div>
      <div className='w-full mt-8'>
        <h1 className='w-full flex justify-center'>Form to add Business Product</h1>
        <div className='w-full mt-4'>
          <form onSubmit={handleSubmit}>
            <div className='w-full'>
              {['Business_Category', 'Description', 'Product', 'Amount', 'Quantity', 'Add_photo'].map((field) => (
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
                      style={{ display: 'none' }}
                      ref={addImg}
                    />
                    <div className='w-full mb-4 gap-4 flex flex-row' onClick={handleRefProfile}>
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
                    type={field === 'Amount' ? 'number' : 'text'}
                    className="mb-2 p-2 w-full border rounded border-accent"
                  />
                )
              ))}
              {/* Google Maps Autocomplete Input */}
              <GoogleMaps onChange={(location) => setInputValue(prev => ({ ...prev, Location: location }))} />
            </div>
            <div className='w-full mt-5'>
              <Button className="bg-base-100 btn btn-outline btn-accent" type='submit' onClick={handleSubmit}>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBusiness;





