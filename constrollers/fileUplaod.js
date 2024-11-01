const File = require("../models/file");
const cloudinary = require("cloudinary").v2;
const ImageUrl = require("../models/image-url-model")

//create handler funtionlocal file upload 
//clieant ke path se media fetch krta => us media ko server ke ekpath par rakh deta,,upload kar deta

exports.localFileUpload = async (req,res) => {
      
      try { 
               //...............fetch files
               const file = req.files.file;
               console.log("FILE AGY JEE->>",file);
               // kis path par store krna chahte.....?? __dirname->current directory ..
            //    let path = __dirname + "/files/" + Date.now(); //server ka path
               let path = __dirname + "/files/" + Date.now() + '.'+ `${file.name.split('.')[1]}`;  // .ke bad extension honga -> type of file vo extract kiya yaha par
               // controllers tak ka path if our current directory......
               console.log("PATH->" , path);
               // move vala function is vvimp ...
               file.mv(path , (err) => {
                console.log(err);
               });

               res.json({
                success:true,
                message:"local file uploaded successfully",
               });


      } catch(error) {
               //.................
                console.log(error);
      }
}

//till now media file store kar li vs code vale folder me files vala folder...
function isFileTypeSupported ( type , supportedTypes) {
      return supportedTypes.includes(type);
}

// async function to upload file.......

async function uploadFileToCloudinary(file, folder ,quality ){
      const options={folder};  // why options??

      // quality??then reduce
      if(quality) {
            options.quality = quality;
      }



      options.resource_type="auto";
      console.log("tempFilePath::" , file.tempFilePath);
      return await cloudinary.uploader.upload(file.tempFilePath  ,options);
}



//........IMAGE UPLOAD.............
exports.imageUpload = async (req,res) => {

        try {

       
             
            //fetch data
            const {name ,tags,email} =req.body;

            console.log(name,tags,email);

            const file = req.files.imageFile2;  //file ka nam ->file ki key

            console.log("file name::" , file);

            //validation........
            const supportedTypes = ["jpg" , "jpeg" , "png"];
          
            const fileType = file.name.split('.')[1].toLowerCase(); // to check filetype exist in supported type aaya=> f()
            console.log("file typee:::", fileType);
            if(!isFileTypeSupported(fileType, supportedTypes)){
                  return res.status(400).json({
                        success:false,
                        message:"file type not supported",
                  });
            };
             console.log("uploading to mpscloud");
            // if supported upload....
            const response = await  uploadFileToCloudinary(file, "mpsCloud");

            


            // ENTRY IN DBBBBBBBB...............
            const fileData = await File.create ({
                  name,
                  tags,
                  email,
                  imageUrl:response.secure_url,
            });


            






            res.json({
                  success:true,
                  imageUrl:response.secure_url,
                  message:"image successfully uploaded",
            })


        

        } catch (error) {


            console.log(error);
            res.status(400).json({
                  success:false,
                  message:"failed to upload",
            })
      
        }

}

// till here image uploaded in cloudinary and its entry and url saved in Db........

//  handler For Vide0 Upload........
exports.videoUpload = async (req,res) => {
        
     try {

      // fetch....
      const {name ,tags,email} =req.body;

      console.log(name,tags,email);
      // video filelaaaa

      const file = req.files.videoFile;
      console.log("fileV is::", file);

      //validation

      const supportedTypes = ["mp4" , "mov" ];
            console.log("file name::" , file.name);
            const fileType= file.name.split('.')[1].toLowerCase(); // to check filetype exist in supported type aaya=> f()
            console.log("file typee:::", fileType);
            if(!isFileTypeSupported(fileType, supportedTypes)){
                  return res.status(400).json({
                        success:false,
                        message:"file type not supported",
                  });
            };

            console.log("uploading to mpscloud");
            // if supported upload....
            const response = await  uploadFileToCloudinary(file,  "mpsCloud");

            //database entry..............

            const fileData2 = await File.create ({
                  name,
                  tags,
                  email,
                  videoUrl:response.secure_url,
            });

            res.json({
                  success:true,
                  videoUrl:response.secure_url,
                  message:"video successfully uploaded",
            })




         
     //.................
     } catch(error) {
       console.log(error);
      res.status(401).json({
            success:false,
            message:"unable to upload video",
      })

     }


}

//last IMAGE REDUCE UPLOAD............................
exports.imageSizeReduceUpload = async (req,res) => {


          try {
            //........................

            const {name ,tags,email} =req.body;

            console.log(name,tags,email);

            const file = req.files.imageFilehd;  //file ka nam ->file ki key

            console.log(file);

            //validation........
            const supportedTypes = ["jpg" , "jpeg" , "png"];
         
            const fileType = file.name.split('.')[1].toLowerCase(); // to check filetype exist in supported type aaya=> f()
    

            if(!isFileTypeSupported(fileType, supportedTypes)){
                  return res.status(400).json({
                        success:false,
                        message:"file type not supported",
                  });
            };
             console.log("uploading to mpscloud");
            // if supported upload....
            const response = await  uploadFileToCloudinary(file, "mpsCloud" ,20);

            


            // ENTRY IN DBBBBBBBB...............
            const fileData = await File.create ({
                  name,
                  tags,
                  email,
                  imageUrl:response.secure_url,
            });

            res.json({
                  success:true,
                  imageUrl:response.secure_url,
                  message:"image successfully uploaded",
            })



           //..........................
          }catch(error) {
    
            console.log(error);
            res.status(401).json({
                  success:false,
                  message:"unable to reduce Image Size...",
            })



          }
}


//till now quality bhi reduce hogy bhai........chalo achhaa hai...............


