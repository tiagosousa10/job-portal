import User from "../models/User";

//get user data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId; // from clerk middleware
  try {
    const user = await User.findById(userId);

    if (!user) {
      res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: "Error getting user data" });
  }
};

//Apply for  a job
export const applyForJob = async (req, res) => {};

//get user applied applications
export const getUserJobApplications = async (req, res) => {};

//update user resume
export const updateUserResume = async (req, res) => {};
