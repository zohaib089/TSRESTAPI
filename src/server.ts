import app from './app';
import {PORT} from './constants/apiConstants'


app.listen(PORT,()=>console.log(`Listing on ${PORT}`))