const {
    BlobServiceClient,
    StorageSharedKeyCredential,
    newPipeline,
} = require("@azure/storage-blob");

const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.AZURE_ACCOUNT_NAME,
    process.env.AZURE_ACCESS_KEY
);

const pipeline = newPipeline(sharedKeyCredential);

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline
);

const uploadImage = async(fileInitial,image) =>{
    const imgExtension = (image.name.split('.').pop());
    const blobName = fileInitial + "." + imgExtension;
    const containerClient = blobServiceClient.getContainerClient("storage");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadFile(image.path, image, {});
    const imageUrl = process.env.AZURE_IMAGE_BASE_URL + blobName;
    return imageUrl;
}

module.exports = {uploadImage}