import React from 'react'

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';


const LGraph = () => {

    const data = [
        { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
        { name: 'Page C', uv: 200, pv: 1398, amt: 2400 },
        { name: 'Page D', uv: 278, pv: 3908, amt: 2400 },
        { name: 'Page E', uv: 189, pv: 4800, amt: 2400 },
        { name: 'Page F', uv: 239, pv: 3800, amt: 2400 },
        { name: 'Page G', uv: 349, pv: 4300, amt: 2400 }
      ];

  return (
    <div className='w-full align-middle justify-center text-center self-center flex flex-col'>
        <div className='flex flex-row'>
            <div className='flex align-middle text-center justify-center self-center'>
                <h1>This is the graph of task u published <br /> Y-axis show Time <br /> X-axis show rate of task</h1>
            </div>
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
        </div>
        <div className='flex flex-row gap-5'>
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
            <div className='flex align-middle text-center justify-center self-center'>
                <h1>This is the graph of task i took <br /> Y-axis show Time <br /> X-axis show rate of task</h1>
            </div>
        </div>
    </div>
  )
}

export default LGraph