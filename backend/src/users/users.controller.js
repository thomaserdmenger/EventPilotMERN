export const patchUser = async (req, res) => {
  try {
    const image = req.file;
    // hier Aufruf von uploadImage(image.buffer) in Abhängigkeit davon, ob ein image existiert
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not edit user." });
  }
};
