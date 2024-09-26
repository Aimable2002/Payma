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
import { Link, useNavigate } from 'react-router-dom';
// import getBusiness from './getBusiness';

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

const GoogleMaps = ({ onChange, business_name }) => {
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
        onChange(newValue ? newValue.description : '');
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

const AddProduct = ({ resetView}) => {
  const [inputValue, setInputValue] = useState({
    Business_Category: '',
    Description: '',
    Product: '',
    Amount: '',
    Quantity: '',
    Location: '',
    photo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const { loading, postBusiness } = PostAddBusiness();
  const { upload, imgUrl } = postUploadPhoto();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructure values from inputValue and include imgUrl
    const { Business_Category, Description, Product, Amount, Quantity, Location } = inputValue;

    const inputData = {
        Business_Category,
        Description,
        Product,
        Amount,
        Quantity,
        Location,
        photo: imgUrl, 
    };

    console.log('inputData:', inputData);

    await postBusiness(inputData); // Submit the data
};


  const [imgChange, setImgChange] = useState();

  const addImg = useRef();

  const handleRefProfile = () => {
    addImg.current.click();
  };

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    await upload(file);
    setImgChange(new Date().getTime());
  };
  const navigate = useNavigate()
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const handleButtonClick = (businessName) => {
    setSelectedBusiness(businessName);
  };
  // const {business} = getBusiness()
  
  return (
    <div className="w-full flex flex-col overflow-auto">
      <div className='w-full fixed'>
        <Link to='/'><h1 style={{ cursor: 'pointer' }}>Back</h1></Link>
      </div>
      <div className='w-full justify-center flex '>
      <div className='w-full flex-col mt-8 justify-center' style={{maxWidth: '600px', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.4)'}}>
        <h1 className='w-full flex justify-center mt-5'>Business Center</h1>
        {/* {!loading && business.length !== 0 ? 
        (
          business.map((busi, idx) => (
            
              <div key={idx} className='flex mt-4 w-full px-4'>
                <Button className="bg-base-100 btn btn-outline btn-accent"
                  onClick={() => handleButtonClick(busi.business_name)}
                >
                  {busi.business_name}
                </Button>
              </div>
            
          )) 
        ) : null }
          {selectedBusiness && ( */}
          <div  className='flex align-middle justify-center mt-4 px-2 py-2' >
          <form onSubmit={handleSubmit}>
            <div className='w-full'>
              {['Business_Category', 'Product', 'Description',  'Amount', 'Quantity', 'Add_photo'].map((field) => (
                field === 'Business_Category' ? (
                  <select
                    key={field}
                    id={`${field}_Business_Category`}
                    name={field}
                    value={inputValue[field]}
                    onChange={handleChange}
                    className="select select-accent outline-none w-full mb-2 p-2 border rounded"
                  >
                    <option value="" disabled>Select Product Category</option>
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
                    <div className='w-full flex flex-col' onClick={handleRefProfile}>
                      <div className=' w-full mb-4 gap-4 flex flex-row'>
                        <div><SummarizeIcon className={`${imgChange ? 'text-info' : ''}`}/></div>
                        <div><h1 className={`${imgChange ? 'text-info' : ''}`}>{!imgChange ? 'Add Photo' : 'sent'}</h1></div>
                      </div>
                        <div>
                          <img style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                          src={imgUrl}/>
                        </div>
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
            <div className='w-full mt-5'>
              <Button className="bg-base-100 btn btn-outline btn-accent" type='submit' onClick={handleSubmit}>Submit</Button>
            </div>
          </form>
        </div>
          {/* )} */}
      </div>

      </div>
    </div>
  );
};

export default AddProduct;
