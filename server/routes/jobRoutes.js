import express from 'express';
import { getJobs, getJobById } from '../controllers/jobController.js';

const router = express.Router();

//route to get all jobs
router.get('/',getJobs);

//route to get job by id -> single job
router.get('/:id', getJobById);

export default router;  
