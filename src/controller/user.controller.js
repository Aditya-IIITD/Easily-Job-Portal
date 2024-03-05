import { userModel } from "../model/user.model.js";

// controller for Users
export class userController {
  //function to get login view
  getLogin(req, res) {
    res.render("login", {
      errorMessage: null,
    });
  }

  //function to sign in user
  postLogin(req, res) {
    const result = userModel.findUser(req.body);
    if (result) {
      req.session.userEmail = req.body.email;
      req.session.userName = result.name;
      return res.redirect("/jobs");
    } else {
      res.render("login", { errorMessage: "User not found, please register" });
    }
  }

  //function to register new user
  addUser(req, res) {
    const result = userModel.findUser(req.body);
    if (!result) {
      userModel.addNewUser(req.body);
      res.redirect("/login");
    } else {
      res.render("oops", {
        errorMessage: "User Already Exist, login to continue",
      });
    }
  }

  //function to logout user by destroying the session
  logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
}
