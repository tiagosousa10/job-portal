import express from 'express';
import { changeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobsApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register a company
router.post('/register', upload.single('image') ,registerCompany)

// Company login
router.post('/login', loginCompany)

//get company data 
router.get('/company',protectCompany ,getCompanyData)

//post a job
router.post('/post-job',protectCompany,postJob )

//get applicants data of company 
router.get('/applicants',protectCompany ,getCompanyJobsApplicants)

//get company jobs list
router.get('/list-jobs',protectCompany ,getCompanyPostedJobs)

//change applications status
router.post('/change-status', protectCompany,changeJobApplicationStatus)

//change application visibility
router.post('/change-visibility', protectCompany,changeJobVisibility)


export default router;
