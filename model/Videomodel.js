import mongoose,{Schema}from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema= Schema({
    videoFile:{
        type:String ,
        required:true,

    },
    thumbnailFile:{
        type:String,
        required:[true,'Please add a  thumbnail image'],
    },
    title:{
        type:String,
        required:[true,'Please add a title'],
    },
    description:{
        type:String,
        required: [true, 'Please add a description'],
    },
    duration:{
        type:Number,
        required:true,
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},
    {
        timestamps:true
    }
)
videoSchema.plugin(mongooseAggregatePaginate);

export const Video= mongoose.model('Video',videoSchema)