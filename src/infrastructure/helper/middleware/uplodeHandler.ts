import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,path.join(__dirname,'../../../../uploads'));
        },
            filename:(req,file,cd )=>{
        const uniqueName = `${String(Date.now())}-${String(Math.round(Math.random()*1E9))}${path.extname(file.originalname)}`;
        cd(null,uniqueName);
    }
    },
  
)
export const uploads = multer({storage})