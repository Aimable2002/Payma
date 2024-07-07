import React from 'react'

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import usegetTaskView from '../../hook/getTask/useTaskView';
import usegetTaskTaker from '../../hook/getTask/getTaskTaker';

const Ltables = () => {
  const {task = []} = usegetTaskView()
  const {taskTaker} = usegetTaskTaker()
  console.log('task :', task)
  const columns = [
    { key: 'Agreement', label: 'TASK NAME' },
    { key: 'userName', label: 'PUBLISHER' },
    { key: 'task_taker_name', label: 'PERSON ON TASK' },
    { key: 'Status', label: 'REPORT' },
    { key: 'Approval', label: 'STATUS' },
    { key: 'Amount', label: 'AMOUNT' },
    { key: 'End_date', label: 'End Date' },
  ];
  const columnss = [
    { key: 'Agreement', label: 'TASK NAME' },
    { key: 'userName', label: 'PUBLISHER' },
    { key: 'task_taker_name', label: 'PERSON ON TASK' },
    { key: 'Status', label: 'REPORT' },
    { key: 'Approval', label: 'STATUS' },
    { key: 'Amount', label: 'AMOUNT' },
    { key: 'End_date', label: 'End Date' },
  ];
  //const getKeyValue = (item, key) => item[key];
  const getKeyValue = (item, key) => {
    if (key === 'Approval') {
      return  item[key] === 'Approve' ? 'Pending...' : 'Complete';
    }
    if (key === 'Status') {
      return  item[key] === 'Report' ? 'Waiting..' : 'Reported';
    }
    return item[key];
    
  };
  // const getCellStyle = (item, key) => {
  //   if (key === 'Approval' && item[key] === 'Approved') {
  //     return { color: 'green' };
  //   }
  //   return {};
  // };
  const getRowStyle = (item) => {
    if (item.Approval === 'Approved') {
      return { backgroundColor: '#2563eb', color: 'white' };
    }
    return {};
  };

  return (
    <div className='w-full flex flex-col'>
      <h1 className='mt-5'>Table of task i publish</h1>
      <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={task}>
            {(item) => (
              <TableRow key={item.taskId} style={getRowStyle(item)}>
                {/* {(columnKey) => <TableCell style={getCellStyle(item, columns.key)}>{getKeyValue(item, columnKey)}</TableCell>} */}
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {getKeyValue(item, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
      </Table>
      <h1 className='mt-5'>Table of Task You are doing</h1>
      <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columnss}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={taskTaker}>
            {(item) => (
              <TableRow key={item.taskId} style={getRowStyle(item)}>
                {/* {(columnKey) => <TableCell style={getCellStyle(item, columnss.key)}>{getKeyValue(item, columnKey)}</TableCell>} */}
                {columnss.map((column) => (
                  <TableCell key={column.key}>
                    {getKeyValue(item, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
      </Table>
      <div className='mb-14'></div>
    </div>
  )
}

export default Ltables