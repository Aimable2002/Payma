import connectDatabase from "../database/connectDatabase.js";

const connection = connectDatabase();

const uploadToCloudinary = (buffer, folderName) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: folderName },
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
            return res.status(404).json('no file sent')
        }
        console.log('file :', req.file)
    }catch(error){
        console.log('internla server error :', error)
        res.status(500).json({error: 'internal server error'})
    }
}

export const businessController = async (req, res) => {
    try{
        const { Business_Category, Description, Product, Amount, Quantity, District} = req.body;

        console.log('req.body :', req.body)
    }catch(error){
        console.log('internal server error :', error)
        return res.status(500).json({error: 'internal server error'})
    }
}