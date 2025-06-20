import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

//register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({
      success: false,
      message: "All fields are required to register a company",
    });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({
        success: false,
        message: "Company with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log("🚀 ~ registerCompany ~ hashPassword:", hashPassword);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path); //upload image to cloudinary
    console.log("🚀 ~ registerCompany ~ imageUpload:", imageUpload);

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url, //save image url to database
    });
    console.log("im here");

    return res.json({
      success: true,
      message: "Company registered successfully",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    return res.json({ success: false, message: "Error registering company" });
  }
};

//company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "All fields are required to login",
    });
  }

  try {
    const company = await Company.findOne({ email }); //find company by email

    if (await bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.json({ success: false, message: "Error logging in company" });
  }
};

//get company details
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company; // Get company from request
    res.json({
      success: true,
      company,
    });
  } catch (error) {
    res.json({ success: false, message: "Error getting company data" });
  }
};

//post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    await newJob.save();

    res.json({
      success: true,
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (error) {
    res.json({ success: false, message: "Error posting job" });
  }
};

//Get company jobs Applicants
export const getCompanyJobsApplicants = async (req, res) => {
  try {
    const companyId = req.company._id; // Get company ID from request
    // find job applications for the user and populate related data
    const applications = await JobApplication.find({
      companyId,
    })
      .populate("userId", "name image resume")
      .populate("jobId", "title location description category level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {}
  res.json({ success: false, message: "Error getting company jobs" });
};

//get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id; // Get company ID from request

    const jobs = await Job.find({ companyId }); // Find jobs by company ID

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );
    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({ success: false, message: "Error getting company jobs" });
  }
};

//Change job application stattus
export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    //find job application and update status
    await JobApplication.findOneAndUpdate({ _id: id }, { status });
    res.json({ success: true, message: "Job application status changed" });
  } catch (error) {
    res.json({
      success: false,
      message: "Error changing job application status",
    });
  }
};

// change job visibility
export const changeJobVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id; // Get company ID from request

    const job = await Job.findById(id); // Find job by ID

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }

    await job.save();

    res.json({
      success: true,
      message: "Job visibility changed successfully",
      job,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error changing job visibility",
    });
  }
};
