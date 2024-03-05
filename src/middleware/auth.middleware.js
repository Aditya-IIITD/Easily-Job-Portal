// authentication middleware
export const auth = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else {
    res.render("oops", {
      errorMessage:
        "Only recuiter is allowed to access this page , login as recruiter to continue",
    });
  }
};
