import { jobModel } from "../model/jobs.model.js";

//controller for jobs
export class jobsController {
  //function to fetch jobs from model
  getJobs(req, res) {
    const jobs = jobModel.getJobs();
    res.render("jobs", {
      jobs: jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //function to fetch new job from model
  getNewJob(req, res) {
    res.render("newJob", {
      userEmail: req.session.userEmail,
      updateJob: null,
      userName: req.session.userName,
    });
  }

  //function to post new job
  postNewJob(req, res) {
    jobModel.addJob(req.body);
    res.redirect("/jobs");
  }

  //function to view particular job details w
  viewJobDetails(req, res) {
    const jobID = req.params.jobID;
    const allJobs = jobModel.getJobs();
    const selectedJob = allJobs.find((job) => job.id == jobID);
    res.render("jobDetails", {
      job: selectedJob,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //function to apply for a job
  applyForJob(req, res) {
    const jobID = req.params.jobID;
    jobModel.apply(jobID);
    res.redirect("/jobs");
  }

  //function to get the view to update a job
  updateJob(req, res) {
    const jobID = req.params.jobID;
    const job = jobModel.getById(jobID);
    res.render("newJob", {
      userEmail: req.session.userEmail,
      updateJob: job,
      userName: req.session.userName,
    });
  }

  //function to finally update the job details with new data
  postUpdateJob(req, res) {
    const job = req.body;
    const jobid = req.params.jobID;
    jobModel.update(job, jobid);
    res.redirect("/jobs");
  }

  //function to remove a job from model
  deleteJob(req, res) {
    const jobID = req.params.jobID;
    const error = jobModel.delete(jobID);
    if (error) {
      return res.render("oops", {
        errorMessage: error,
      });
    }
    res.redirect("/jobs");
  }

  //function to search job based on title
  jobSearch(req, res) {
    const jobs = jobModel.getJobs();
    // for filtering jobs, we will trim input value & change it to lowercase, & to make consistency we will trim company names also
    // with chnageing them to lower case and finally filter them based on if company name includes search value or not
    const jobSearch = req.query.searchJob.trim().toLowerCase();
    const result = jobs.filter((j) => {
      const name = j.companyName.trim().toLowerCase();
      if (name.includes(jobSearch)) return true;
      else return false;
    });
    if (result.length) {
      res.render("jobs", {
        jobs: result,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    } else {
      res.render("oops", {
        errorMessage: "Job not found",
      });
    }
  }
}
