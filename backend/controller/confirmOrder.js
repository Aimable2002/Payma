import connectDatabase from "../database/connectDatabase"

const connection = connectDatabase()

export const confirmation = async (req, res) => {
    try{
        const {Amount, Description, OrderNo, clientId} = req.body
        const Merchant = req.user
        if(Merchant){
            return res.status(400).json('missing data')
        }
        if(!Amount || !Description || !OrderNo || !clientId){
            return res.status(400).json('missing data')
        }
        const CheckMerchant = 'SELECT * FROM USERS WHERE userId = ?';
        connection.query(CheckMerchant, [Merchant], (err, result) => {
            if(err){
                return connection.rollback(() => {
                    return res.status(403).json(err.message)
                })
            }
            if(result[0].userId !== Merchant){
                return res.status(404).json('unknown Merchant')
            }
            const data = result[0]
            return res.status(200).json(data)
        })
    }catch(error){
        console.log('internal error :', error.message)
        return res.status(500).json({error: 'internal error'})
    }
}