import connectDatabase from "../database/connectDatabase.js";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';

const connection = connectDatabase();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToCloudinary = (buffer, folderName) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: folderName },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(buffer);
    });
  };
  

export const uploadPhoto = async (req, res) => {
    try{
        if(!req.file){
          return res.status(404).json({message: 'no file sent'})
        }
        console.log(req.file)
        let folderName = "Konnect_image"
        const result = await uploadToCloudinary(req.file.buffer, folderName)
        console.log('result: ', result)
        return res.status(200).json(result)
      }catch(error){
        console.log('internal server error :', error.message)
        return res.status(500).json({error: 'internal server error'})
      }
}

export const businessController = async (req, res) => {
    try{
        const { 
            Business_Category,
            Product, 
            Description, 
            Quantity, 
            Amount, 
            imgUrl 
        } = req.body;

        console.log('req.body :', req.body)
        const ownerId = req.user.userId
        connection.beginTransaction(err => {
            if(err){
                throw err
            }

            const createBusiness = 'INSERT INTO PRODUCT (product_name, description, ownerId, product_category, price, stock, product_img_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
            connection.query(createBusiness, [Product, Description, ownerId, Business_Category, Amount, Quantity, imgUrl], (err, result) => {
                if(err){
                    return connection.rollback(() => {
                        return res.status(412).json({message: 'error of db', data: err.message, status: false})
                    })
                }

                

                connection.commit(err => {
                    if(err){
                        return connection.rollback(() => {
                            return res.status(411).json({message: 'db fail to commit', data: err.message, status: false})
                        })
                    }
                    return res.status(200).json({message: 'done', status:true})
                })

            })
        })
    }catch(error){
        console.log('internal server error :', error)
        return res.status(500).json({error: 'internal server error'})
    }
}




export const getBusiness = async (req, res) => {
    try{
        const user = req.user.userId

        // const getBusiness = 'SELECT business_name FROM BUSINESSES WHERE ownerId = ?';
        // connection.query(getBusiness, [user], (err, result) => {
        //     if(err){
        //         return connection.rollback(() => {
        //             return res.status(412).json({message: 'error of db', data: err.message})
        //         })
        //     }
        //     console.log('business :', result)
        //     return res.status(200).json(result)
        // })
    }catch(error){
        console.log('internal server error :', error)
        return res.status(500).json({error: 'internal server error'})
    }
}






export const getProduct = async(req, res) => {
    try{
        // const userId = req.user.userId;

        const selectProduct = 'SELECT * FROM PRODUCT ORDER BY created_at DESC';
        connection.query(selectProduct, [], (err, result) => {
            if(err){
                return res.status(412).json({err: 'error of db', data: err.message, status: false})
            }
            return res.status(200).json(result)
        })
    }catch(error){
        console.log('internal server error :', error)
        return res.status(500).json({error: 'internal server error'})
    }
}


export const getuserPro = async(req, res) => {
    try{
        // const user = req.user.userId;
        const selectedUser = req.params.id;
        console.log('selected user :', selectedUser)

        const selecteProduct = 'SELECT * FROM PRODUCT_VIEW WHERE ownerId = ? ORDER BY created_at DESC';
        connection.query(selecteProduct, [selectedUser], (err, result) => {
            if(err){
                return res.status(412).json({err: 'error of db', status: false, data: err.message})
            }
            return res.status(200).json(result)
        })
    }catch(error){
        console.log('internal server error :', error)
        return res.status(500).json({error: 'internal server error'})
    }
}