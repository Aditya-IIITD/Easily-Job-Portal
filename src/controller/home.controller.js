// this will controll just the homepage of APP
export default class homeController {
  static getHome(req, res) {
    res.render("home", {
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
}
