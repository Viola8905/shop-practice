const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const fs = require('fs');

// will upload image on cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Upload image, only admin can do it
router.post('/upload',auth,admin,(req,res) => {
	try{
		console.log(req.files)
		if(!req.files || Object.keys(req.files).length ===0)
			return res.status(400).json({msg: 'No files were uploaded'})
		
		const file = req.files.file;
		if(file.size > 1024*1024 ) {
			//if file size > 1mb 
				removeTmp(file.tempFilePath)
				return res.status(400).json({ msg: "size too large" });
			}

		if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){
			removeTmp(file.tempFilePath);
			return res.status(400).json({ msg: "format is inncorect" });
		}

		cloudinary.v2.uploader.upload(file.tempFilePath,{folder: 'ecommerse'}, async (err, result) =>{
			  if(err) throw err;
				//after upload will have file tpm
				removeTmp(file.tempFilePath);
				res.json({ public_id: result.public_id, url: result.secure_url });
		})
		
  
	}catch(err){
		return res.status(500).json({msg: err.message})
	}
});

//Delete image
router.post("/destroy", auth, admin, (req, res) => {
	try{
		const{public_id} = req.body;
		if(!public_id) return res.status(400).json({ msg: 'no images selected' });

		cloudinary.v2.uploader.destroy(public_id, async(err,result) => {
			 if(err) throw err;
			 res.json({msg: 'Deleted image'})
		})
	}catch(err){
		return res.status(500).json({msg: err.message})
	}
	
});

const removeTmp = (path) => {
	fs.unlink(path, err => {
		if(err) throw err
	})
}
module.exports = router
