export const verifyUser = (req, res, next) => {
    if (req.session && req.session.userId) {
        console.log("Logged in user is true")
      next(); 
    } else {
      res.status(401).json({ message: "Unauthorized. Please login." });
    }
  };
  