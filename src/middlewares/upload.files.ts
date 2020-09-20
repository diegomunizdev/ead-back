import multer from 'multer'

const now = new Date()

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: (req, file, callback) => {
        callback(null, `${now.toLocaleDateString('pt-BR')}-${file.originalname}`)
    }
})

export const UploadFile = multer({ storage })