import cloudinary from "cloudinary";

export async function uploadImage(buffer) {
  const uploadResult = await new Promise((resolve) => {
    cloudinary.v2.uploader
      // folder ergänzen
      // evtl auf Größe zuschneiden?
      .upload_stream((error, result) => {
        return resolve(result);
      })
      .end(buffer);
  });
  return uploadResult;
}
