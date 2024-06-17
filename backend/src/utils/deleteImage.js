import cloudinary from "cloudinary";

export const deleteImage = (public_id) => {
  cloudinary.v2.uploader.destroy(public_id, (error, result) => {
    console.log(error, result);
  });
};
