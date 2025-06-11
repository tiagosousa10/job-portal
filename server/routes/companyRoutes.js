import express from 'express';
import { changeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobsApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';

const router = express.Router();

// Register a company
router.post('/register', registerCompany)

// Company login
router.post('/login', loginCompany)

//get company data 
router.get('/data', getCompanyData)

//post a job
router.post('/post-job',postJob )

//get applicants data of company 
router.get('/applicants', getCompanyJobsApplicants)

//get company jobs list
router.get('/list-jobs', getCompanyPostedJobs)

//change applications status
router.post('/change-status', changeJobApplicationStatus)

//change application visibility
router.post('/change-visibility', changeJobVisibility)


export default router;
