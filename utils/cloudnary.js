import { v2 as cloudinary } from 'cloudinary';
import ApiError from './ApiError.js';
import fs from 'fs';



    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_API_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image


    const uploadOnCloudinary = async (localFilePath)=>{
        try{
            if (!localFilePath) {

                // upload this file to Cloudinary
                const response =cloudinary.uploader.upload(localFilePath,{
                    resource_type:'auto',
                })

                // file has been upload sccessfully

                console.log('File uploaded successfully',(await response).url);
                return response;

            }

        }catch(err){
            fs.unlinkSync(localFilePath) //remove the locally saved temporary
            //  file as the upload operation got failed
            throw new ApiError(500,err.message)
        }
    }