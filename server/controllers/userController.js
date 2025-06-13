import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

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
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.json({
        success: false,
        message: "You have already applied for this job",
      });
    }
    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.json({ success: true, message: "Job applied successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error applying for job" });
  }
};

//get user applied applications
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary ")
      .exec();

    if (!applications) {
      return res.json({ success: false, message: "No applications found" });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: "Error getting user applications" });
  }
};

//update user resume
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const resumeFile = req.resumeFile;

    const userData = await User.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path); //upload image to cloudinary

      userData.resume = resumeUpload.url;
    }

    await userData.save();

    res.json({ success: true, message: "Resume updated successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error updating resume" });
  }
};
