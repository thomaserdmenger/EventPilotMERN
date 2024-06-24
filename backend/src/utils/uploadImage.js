import cloudinary from "cloudinary";

// upload preset sets the image size in cloudinary while uploading
export async function uploadImage(buffer, cloudinaryPath, uploadPreset) {
  const uploadResult = await new Promise((resolve) => {
    cloudinary.v2.uploader
      .upload_stream(
        { folder: `EventPilot/${cloudinaryPath}`, upload_preset: uploadPreset },
        (error, uploadResult) => {
          console.log({ uploadImageError: error });
          // console.log({ uploadImageResult: uploadResult });
          return resolve(uploadResult);
        }
      )
      .end(buffer);
  });
  return uploadResult;
}
