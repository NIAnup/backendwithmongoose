
import {asyncHandler} from '../utils/asyncHandler.js';
import User from '../model/user.js';
import ApiError from '../utils/ApiError.js';
import { uploadCloudinary} from '../utils/cloudnary.js ';
import { ApiResponse } from '../utils/ApiResponse.js';


const registerUser = asyncHandler(async(req,res)=>{
    // get user deatails from frontend 
    // validation - not required
    // check if user already exists : username or email
    // check for images, check for avatar 
    // upload them to cloudinary,avatar 
    // create user object - create entry in db 
    //remove password and refresh token field from response  
    // check for user creation 
    // return response or error response

    const {fullname , email,username, password} = req.body;
    console.log(email ,fullname);

    if([fullname,email,username,password].some((field)=>field?.trim()==='')){ 
        throw new ApiError(400,'All fields are required')
    }
    
    const existedUser= User.findOne({
        $or:[{email},{username}]
    })
    
    if(existedUser){
        throw new ApiError(409,'User already exists');  
    }

   const avatarLocalpath =  req.files.avatar[0]?.path;
   const coverImageLocalpath =  req.files.coverimage[0]?.path;

   if (!avatarLocalpath) {
    throw new ApiError(400,'Avatar is required');

   }

  const avatar=await  uploadCloudinary(avatarLocalpath);

  const coverImage=await uploadCloudinary(coverImageLocalpath);

  console.log(avatar,coverImage);
  if (!avatar) {
    throw new ApiError(500,'Error uploading avatar');
  }
  const user = User.create({
    fullname,
    avatar:avatar.url,
    coverimage:coverImage?.url ||"",
    email,
    username:username.toLowerCase(),
    password
  })

const createdUser= await User.findById(user._id).select(
    '-password -refreshToken'
)
if (!createdUser) {
    throw new ApiError(500,'Error creating user');
}
return res.status(201).json(new 
    ApiResponse(200,createdUser,'User Registered Scuccessfully'))
}
)


export {registerUser}