const { uuid } = require('uuidv4');
const multer  = require('multer')
const { MulterAzureStorage } = require("multer-azure-blob-storage");

const resolveBlobName = (req, file) => {
    return new Promise((resolve, reject) => {
        const blobName = `${uuid()}--${file.originalname}`;
        resolve(blobName);
    });
};

const azureStorage = new MulterAzureStorage({
    connectionString: process.env.AZURE_CONNECTION_STRING,
    accessKey: process.env.AZURE_ACCESS_KEY,
    accountName: process.env.AZURE_ACCOUNT_NAME,
    containerName: 'documents',
    blobName: resolveBlobName
});

const multerUpload = multer({
    storage: azureStorage
});

const multerSaveImage = multerUpload.single('photo')

module.exports = {multerSaveImage}