{/* <div className='w-full bg-emerald-700'>
            <div className='w-full flex flex-col  justify-center'>
                <div className='w-full px-2 py-2'>
                    <div className='w-full flex justify-center align-middle text-center mb-2'>Task am doing</div>
                    <div className='w-full justify-between gap-1 flex flex-row'>
                        <div className='flex w-2/6 flex-col bg-indigo-700 p-2 px-5' style={{borderRadius: '15px'}}>
                            <div className='flex justify-center'>Count</div>
                            <div className='flex justify-center'>{taskGiver.length}</div>
                        </div>
                        <div className='flex w-2/6 flex-col bg-indigo-700 p-2 px-5' style={{borderRadius: '15px'}}>
                            <div className='flex justify-center'>Pending</div>
                            <div className='flex justify-center'>4</div>
                        </div>
                        <div className='flex w-2/6 flex-col bg-indigo-700 p-2 px-5' style={{borderRadius: '15px'}}>
                            <div className='flex justify-center'>Accepted</div>
                            <div className='flex justify-center'>30</div>
                        </div>
                    </div>
                </div>
                {/* <div className='w-full flex flex-row py-2 mt-4 justify-center gap-4'>
                    <Button className='w-2/5 border-none outline-none bg-indigo-500'>Approved</Button>
                    <Button className='w-2/5 border-none outline-none bg-indigo-500'>Reported</Button>
                </div> */}
                {/* <div className='w-full px-2 mt-4'>
                    <div className='w-full justify-between flex flex-row'>
                        <div className='flex flex-row bg-indigo-700 p-2' style={{borderRadius: '15px'}}>
                            <div>Task earning : </div>
                            <div> $ 334.00</div>
                        </div>
                    </div>
                </div>  */}









                
        //     </div>
        // </div> 
        // <div className='bg-fuchsia-900 w-full' style={{borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>
        //     <div className='w-full flex flex-col  justify-center'>
        //         <div className='w-full px-2 py-2'>
        //             <div className='w-full flex justify-center align-middle text-center mb-2'>Task I publish</div>
        //             <div className='w-full justify-between gap-1  flex flex-row'>
        //                 <div className='flex w-2/6 flex-col bg-indigo-700 p-2 px-5' style={{borderRadius: '15px'}}>
        //                     <div className='flex justify-center'>Count</div>
        //                     <div className='flex justify-center'>{IsButton ? '20' : '4'}</div>
        //                 </div>
        //                 <div className='flex w-2/6 flex-col bg-indigo-700 p-2 px-5' style={{borderRadius: '15px'}}>
        //                     <div className='flex justify-center'>{IsButton ? 'Earned' : 'Offered'}</div>
        //                     <div className='flex justify-center'>{IsButton ? '$ 200' : '$ 50'}</div>
        //                 </div>
        //                 <div className='flex w-2/6 flex-col bg-indigo-700 p-2 px-5' style={{borderRadius: '15px'}}>
        //                     <div className='flex justify-center'>Waiting</div>
        //                     <div className='flex justify-center'>{IsButton ? '$ 4' : '$ 10'}</div>
        //                 </div>
        //             </div>
        //         </div>
        //         {/* <div className='w-full flex flex-row mt-4 justify-center gap-4 py-2'>
        //             <Button onClick={handletaskButton} className='w-2/5 border-none outline-none bg-indigo-500'>Assignee</Button>
        //             <Button onClick={() => setIsButton(!IsButton)} className='w-2/5 border-none outline-none bg-indigo-500'>Assigner</Button>
        //         </div> */}
        //         {/* <div className='w-full px-2 mt-4'>
        //             <div className='w-full justify-between flex flex-row'>
        //                 <div className='flex flex-row bg-indigo-700 p-2' style={{borderRadius: '15px'}}>
        //                     <div>Task earning : </div>
        //                     <div> $ 334.00</div>
        //                 </div>
        //             </div>
        //         </div>  */}
        //     </div>
        // </div> */}



        // <div className="mt-10">
        //     <form className="flex flex-col gap-10 w-full">
        //       <div className="flex flex-col w-full">
        //         <label htmlFor="Agreement" onClick={() => handleFocus('Agreement')}
        //           className={`absolute ${inputValues['Agreement'] ? 'tran2' : (focusedInput === 'Agreement' ? 'tran' : '')}`}>
        //             Agreement
        //         </label>
        //         <input
        //           id="Agreement"
        //           name="Agreement"
        //           type="text"
        //           onChange={handleChange}
        //           onFocus={() => handleFocus('Agreement')}
        //         />
        //       </div>
        //       <div className="flex gap-10 w-full flex-row">
        //         <div className="flex flex-col w-2/5">
        //           <label  htmlFor="Amount" onClick={() => handleFocus('Amount')}
        //             className={`absolute ${inputValues['Amount'] ? 'tran2' : (focusedInput === 'Amount' ? 'tran' : '')}`}>
        //               Amount
        //             </label>
        //           <input
        //             id="Amount"
        //             name="Amount"
        //             type="number"
        //             onChange={handleChange}
        //             onFocus={() => handleFocus('Amount')}
        //           />
        //         </div>
        //         <div className="flex flex-col w-2/5">
        //           <label htmlFor="Currency" onClick={() => handleFocus('Currency')}
        //             className={`absolute ${inputValues['Currency'] ? 'tran2' : (focusedInput === 'Currency' ? 'tran' : '')}`}>
        //               Currency
        //           </label>
        //           <input
        //             id="Currency"
        //             name="Currency"
        //             type="text"
        //             onChange={handleChange}
        //             onFocus={() => handleFocus('Currency')}
        //           />
        //         </div>
        //       </div>
        //       <div className="flex gap-10 w-full flex-row">
        //         <div className="flex flex-col w-2/5">
        //           <label htmlFor="Start_date" onClick={() => handleFocus('Start_date')}
        //             className={`absolute tran ${inputValues['Start_date'] ? 'tran2' : (focusedInput === 'Start_date' ? 'tran' : '')}`}>
        //               Start Date
        //           </label>
        //           <input
        //             id="Start_date"
        //             name="Start_date"
        //             type="date"
        //             onChange={handleChange}
        //             onFocus={() => handleFocus('Start_date')}
        //           />
        //         </div>
        //         <div className="flex flex-col w-2/5">
        //           <label htmlFor="End_date" onClick={() => handleFocus('End_date')}
        //             className={`absolute tran ${inputValues['End_date'] ? 'tran2' : (focusedInput === 'End_date' ? 'tran' : '')}`}>
        //               End Date
        //           </label>
        //           <input
        //             id="End_date"
        //             name="End_date"
        //             type="date"
        //             onChange={handleChange}
        //             onFocus={() => handleFocus('End_date')}
        //           />
        //         </div>
        //       </div>
        //       <div className='mt-10'>
        //         <button type='submit'>Submit</button>
        //       </div>
        //       <div className='relative mt-20'>
        //         <p>Submitting {loading ? <span className='loading loading-ring '></span> : isTrue ? <span className='text-fuchsia-500 '> Success</span> : <span className='text-info'> Start</span>}</p>
        //       </div>
        //     </form>
        //   </div>