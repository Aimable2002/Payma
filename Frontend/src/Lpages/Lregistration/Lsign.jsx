import React from 'react'

import { Button } from '@nextui-org/react'

const Lsign = () => {
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex justify-between'>
        <div className='w-3/6 flex'>Web App</div>
        <div className='w-3/6 flex flex-row gap-4 justify-end'>
          <p>Already have account</p>
          <div><Button>Signin</Button></div>
        </div>
      </div>
      <div className='w-full flex flex-row mt-10'>
        <div className='w-3/6 flex justify-center'>column 1</div>
        <div className='w-3/6 flex justify-center'>column 2</div>
      </div>
    </div>
  )
}

export default Lsign