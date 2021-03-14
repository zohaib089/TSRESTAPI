import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';
const imageSchema : Schema = new mongoose.Schema({
   file:{
       type:String,
    //    unique:true,
       required:true

   },
   ref:{
    type:Number,
    required:true

},


});




let ImageModel = mongoose.model('Images',imageSchema);
export {ImageModel};