import cloudinary from "cloudinary";

export async function uploadProfileImage(buffer) {
  const uploadResult = await new Promise((resolve) => {
    cloudinary.v2.uploader
      .upload_stream(
        { folder: "EventPilot/profileImages" },
        (error, uploadResult) => {
          console.log(error);
          return resolve(uploadResult);
        }
      )
      .end(buffer);
  });
  return uploadResult;
}
