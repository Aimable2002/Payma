import React from 'react'
import useHistory from '../../hook/history/useHistory'
import useInviteHistory from '../../hook/history/useInviteHistory'

const Lhistory = () => {
    const {loading, isHistory} = useHistory()
    console.log('ishistory :', isHistory)
    const {isInviteHistory} = useInviteHistory()
    console.log('invite history :', isInviteHistory)
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const rowColor = (user) => {
        if(user.Approval === 'Approved'){
            return { backgroundColor: '#2563eb', color: 'white' };
        }
        return {};
    }
  return (
    <div className='w-full flex flex-col'>
        <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                <tr>
                    <th>#</th>
                    <th>userName</th>
                    <th>Job</th>
                    <th>Assignee</th>
                    <th>Assignee tel:</th>
                    <th>Amount in FR</th>
                    <th>Repprt</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
                </thead>
                <tbody>
                    {isHistory.map((hist, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{hist.userName}</td>
                            <td>{hist.Agreement}</td>
                            <td>{hist.task_taker_name}</td>
                            <td>{hist.Phone_number}</td>
                            <td>{hist.TaskAmount}</td>
                            <td>{hist.Status}</td>
                            <td>{hist.Approval}</td>
                            <td>{formatDate(hist.Start_date)}</td>
                            <td>{formatDate(hist.End_date)}</td>
                        </tr>
                    ))}
                    {isInviteHistory.map((history, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{history.inviter}</td>
                            <td>{history.Agreement}</td>
                            <td>{history.invitee}</td>
                            <td>{history.TAKERID_TEL}</td>
                            <td>{history.Amount}</td>
                            <td>{history.Report}</td>
                            <td>{history.Approval}</td>
                            <td>{formatDate(history.Start_date)}</td>
                            <td>{formatDate(history.End_date)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                <tr>
                    <th></th>
                    <th>userName</th>
                    <th>Job</th>
                    <th>Assignee</th>
                    <th>Assignee tel</th>
                    <th>Amount in FR</th>
                    <th>Report</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
                </tfoot>
            </table>
            </div>
    </div>
  )
}

export default Lhistory