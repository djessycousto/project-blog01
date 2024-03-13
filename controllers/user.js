// const { findOneAndUpdate } = require("../models/User");

const User = require("../models/User");
const path = require("path");

const { attachCookiesToResponse, createTokenUser } = require("../utils");

const allUsers = async (req, res) => {
  try {
    // console.log(req.user);// confirm that the authentication is pass over her
    // const user = await User.find({role:user}).select(-password);
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

const singleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("-password");

    if (!user) {
      res.status(404).json({ msg: "sorry no found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const showCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

// user pic

const pictureOfUser = async (req, res) => {
  const userId = req.params.id;

  if (!req.files || !req.files.userImage || req.files.userImage.length === 0) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const userImage = req.files.userImage; // Assuming you're handling the first file in the array

  if (!userImage.mimetype.startsWith("image")) {
    console.log("Please upload an image");
    return res.status(400).json({ error: "Please upload an image" });
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${userImage.name}`
  );

  try {
    await userImage.mv(imagePath);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's image path in the database
    user.userImage = `/uploads/${userImage.name}`;
    await user.save();

    const response = {
      userImage: {
        name: userImage.name,
        mimetype: userImage.mimetype,
        size: Math.ceil(userImage.size / (1024 * 1024)) + "Mo",
        path: `/uploads/${userImage.name}`,
      },
    };
    res.status(200).json({ userImage: response });
  } catch (error) {
    console.error("Error moving file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    console.log("bad request");
    res.status(400).json({ message: "please provide old pass and new pass" });
  }
  const user = await User.findOne({ _id: req.user.userId });
  // need to check user

  // Compare the password // // the old password

  const isPasswordCorrect = user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    res.status(400).json({ message: "please provide  VALID PASS" });
  }

  //  SAVE NEW PASS

  user.password = newPassword;
  await user.save();
  res.status(200).json({ msg: "success password updated" });
};

const editUser = async (req, res) => {
  // res.send("edit user");

  // chek the input
  const { name, email } = req.body;
  if (!email || !name) {
    console.log("please provide name or email ");
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    {
      new: true,
      runValidators: true,
    }
  );

  // after create token user

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(200).json({ user: tokenUser });
};
// const pictureOfUser = async (req, res) => {
//   res.send("user pic");
// };

const deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    console.log(req.params);
    // console.log(userId);
    const user = await User.findByIdAndDelete({ _id: userId });
    console.log(user);
    res.status(200).json({ msg: "deleted" });
  } catch (error) {
    console.log(error);
  }
};

// const deleteUser = async (req, res) => {
//   try {
//     const { userId } = req.params; // Assuming userId is a string representing ObjectId
//     const user = await User.findByIdAndDelete(userId);

//     if (!user) {
//       // If user with the specified ID is not found
//       return res.status(404).json({ msg: "User not found" });
//     }

//     res.status(200).json({ msg: "Deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

module.exports = {
  allUsers,
  singleUser,
  editUser,
  updateUserPassword,
  showCurrentUser,
  pictureOfUser,
  deleteUser,
};
