import multer from 'multer'
import crypto from 'crypto'

const now = new Date()

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: (req, file, callback) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err) callback(err, '')
            const fileName = `${hash.toString("hex")}-${file.originalname}`
            callback(null, fileName)
        })
    }
})

export const UploadFile = multer({ storage })