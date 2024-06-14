export const patchUserCtrl = async (req, res) => {
  try {
    // req.body => zu ändernde Daten

    const image = req.file;
    // hier Aufruf von uploadImage(image.buffer) in Abhängigkeit davon, ob ein image existiert
    const uploadResult = image
      ? await uploadProfileImage(image.buffer)
      : undefined;
    // hier alle weiteren Funktionen, um den User zu speichern
    // und uploadResult.secure_url als imageProfile im user speichern
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not edit user." });
  }
};
