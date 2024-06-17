import cloudinary from "cloudinary";

// export async function deleteImage(public_id) {
//   const deletedImage = cloudinary.v2.uploader.destroy(public_id, (result) => {
//     console.log(result);
//   });

//   return deletedImage;
// }

export async function deleteImage(public_id) {
  const deletedImg = await new Promise((resolve) => {
    cloudinary.v2.uploader
      .destroy(public_id, (error, deletedImg) => {
        console.log(error);
        return resolve(deletedImg);
      })
      .end(public_id);
  });
  return deletedImg;
}
