export const verifyUser = (req, res, next) => {
    if (req.session && req.session.userId) {
        console.log("Logged in user is true")
      next(); 
    } else {
      res.status(401).json({ message: "Unauthorized. Please login." });
    }
  };
  

  export const verifyHost = (req, res, next) => {
    if (req.session && req.session.isHost) {
      return next();
    }
    return res.status(401).json({ message: "Unauthorized. Please login as host." });
  };  


  export const requireLogin = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    }
    return res.status(401).json({ message: "Please log in to continue." });
  };
  

  export const redirectIfLoggedIn = (req, res, next) => {
    if (req.session && (req.session.isUser || req.session.isHost || req.session.isAdmin)) {
      return res.status(403).json({ message: "You're already logged in." });
    }
    next();
  };
  