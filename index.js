import Express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import { jobsController } from "./src/controller/jobs.controller.js";
import { userController } from "./src/controller/user.controller.js";
import homeController from "./src/controller/home.controller.js";
import session from "express-session";
import { auth } from "./src/middleware/auth.middleware.js";
import bodyParser from "body-parser";
import { uploadFile } from "./src/middleware/fileUpload.middleware.js";
import { sendEmail } from "./src/middleware/mail.middleware.js";

const app = Express();

//Session
app.use(
  session({
    saveUninitialized: true,
    resave: false,
    cookie: { secure: false },
    secret: "ISu2P2iWtjG60GQUJjO0s9R5AzmWWNXA",
  })
);

// statically exposing Public folder
app.use(Express.static("Public"));

//setting view engine as EJS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

//setting layout for views
app.use(ejsLayouts);

//parser to parse body content
app.use(bodyParser.urlencoded({ extended: true }));

const jobscontroller = new jobsController();
const usercontroller = new userController();

//endpoints with differnt req methods
app.get("/", homeController.getHome);
app.get("/jobs", jobscontroller.getJobs);
app.get("/jobs/:jobID", jobscontroller.viewJobDetails);
app.get("/jobs/update/:jobID", auth, jobscontroller.updateJob);
app.get("/jobs/update/:jobID", auth, jobscontroller.updateJob);
app.get("/jobs/delete/:jobID", auth, jobscontroller.deleteJob);
app.get("/newjob", auth, jobscontroller.getNewJob);
app.get("/login", usercontroller.getLogin);
app.get("/logout", usercontroller.logout);
app.get("/search", jobscontroller.jobSearch);
app.post("/jobs/update/:jobID", auth, jobscontroller.postUpdateJob);
app.post("/login", usercontroller.postLogin);
app.post("/newUser", usercontroller.addUser);
app.post("/newjob", auth, jobscontroller.postNewJob);
app.post(
  "/applyJob/:jobID",
  uploadFile.single("resume"),
  sendEmail,
  jobscontroller.applyForJob
);

// statically exposing views
app.use(Express.static("src/views"));

app.listen(3100, () => {
  console.log("Server is listening on 3100...");
});
