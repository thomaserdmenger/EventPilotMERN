import cloudinary from "cloudinary";

// crop to half of its original site via cloudinary upload presets defined in cloudinary settings
export async function uploadImage(buffer, cloudinaryPath) {
  const uploadResult = await new Promise((resolve) => {
    cloudinary.v2.uploader
      .upload_stream(
        { folder: `EventPilot/${cloudinaryPath}` },
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
