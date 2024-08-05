const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// Local file upload 
exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("File received", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.').pop()}`;
        file.mv(path, (error) => {
            if (error) {
                console.error("Error moving file:", error);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to upload file locally'
                });
            }
            res.json({
                success: true,
                message: 'Local file uploaded successfully'
            });
        });
    } catch (error) {
        console.error("Error in localFileUpload:", error);
        res.status(500).json({
            success: false,
            message: 'Unable to upload file locally'
        });
    }
};

function isFileSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder,quality) {
    const options = { folder };
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
   
     return  await cloudinary.uploader.upload(file.tempFilePath, options);

       
    
}


exports.imageUpload = async (req, res) => {
    try {
        const { name, tag, email } = req.body;
        console.log(name, tag, email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.').pop().toLowerCase();

        if (!isFileSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            });
        }

        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log("Cloudinary response:", response);

        
        const fileData = await File.create({
            name,
            tag,
            email,
            imageUrl: response.secure_url,

        });


        res.json({
            success: true,
            message: "Image uploaded successfully",
            url: response.secure_url // Return the uploaded file URL
        });
    } catch (error) {
        console.error("Error in imageUpload:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


/// video upload
 

exports.videoUpload = async (req, res) => {
    try {
        const { name, tag, email } = req.body;
        console.log(name, tag, email);

        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("filetype is :",fileType)

        if (!isFileSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            });
        }

        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log("Cloudinary response:", response);

        
        const fileData = await File.create({
            name,
            tag,
            email,
            imageUrl: response.secure_url,

        });
        

        res.json({
            success: true,
            message: "video uploaded successfully",
            url: response.secure_url // Return the uploaded file URL
        });
    } catch (error) {
        console.error("Error in videoUpload:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};
/// image size reducer

exports.imageSizeReducer = async (req, res) => {
    try {
        const { name, tag, email } = req.body;
        console.log(name, tag, email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("filetype is :",fileType)

        if (!isFileSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            });
        }

        const response = await uploadFileToCloudinary(file, "codehelp",90);
        

        
        const fileData = await File.create({
            name,
            tag,
            email,
            imageUrl: response.secure_url,

        });
        

        res.json({
            success: true,
            message: "image uploaded successfully",
            url: response.secure_url // Return the uploaded file URL
        });
    } catch (error) {
        console.error("Error in image upload:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};