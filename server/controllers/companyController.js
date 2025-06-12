import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";

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

    if (bcrypt.compare(password, company.password)) {
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
  } catch (error) {}
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
  } catch (error) {}
};

//get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
  } catch (error) {}
};

//Change job application stattus
export const changeJobApplicationStatus = async (req, res) => {
  try {
  } catch (error) {}
};

// change job visibility
export const changeJobVisibility = async (req, res) => {
  try {
  } catch (error) {}
};
