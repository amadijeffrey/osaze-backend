const multer = require("multer");

var storage = multer.diskStorage({})

const upload = multer({storage:storage,
    limits: {fileSize: 8 * 1024 * 1024},
    fileFilter:(req,file,cb) => {
        if(!file.mimetype.match(/jpg|jpeg|png|gif$i/)){
            cb(new Error("File is not supported"),false)
            return
        }
        cb(null, true)
    }
})
module.exports = upload