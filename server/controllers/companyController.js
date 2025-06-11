import Company from "../models/Company.js";
import bcrypt from 'bcrypt';

//register a new company
export const registerCompany = async ( req,res) => {
  const {name, email, password} = req.body;
  const image = req.file;

  if (!name || !email || !password || !image) {
    return res.json({success:false, message: 'All fields are required to register a company' });
  }

  try {

    const companyExists = await Company.findOne({ email})
    if (companyExists) {
      return res.json({success:false, message: 'Company with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    

  } catch(error) {

  }
}

//company login
export const loginCompany = async ( req,res) => {
  try {

  } catch(error) {

  }
}

//get company details
export const getCompanyData = async ( req,res) => {
  try {

  } catch(error) {

  }
}

//post a new job
export const postJob = async ( req,res) => {
  try {

  } catch(error) {

  }
}

//Get company jobs Applicants
export const getCompanyJobsApplicants = async ( req,res) => {
  try {

  } catch(error) {

  }
}

//get company posted jobs
export const getCompanyPostedJobs = async ( req,res) => {
  try {

  } catch(error) {

  }
}

//Change job application stattus
export const changeJobApplicationStatus = async ( req,res) => {
  try {

  } catch(error) {

  }
}

// change job visibility
export const changeJobVisibility = async ( req,res) => {
  try {

  } catch(error) {

  }
}





