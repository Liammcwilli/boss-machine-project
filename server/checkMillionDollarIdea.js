const checkMillionDollarIdea = (req, res, next) => {
  const numWeeks = req.body.numWeeks;
  const weeklyRevenue = req.body.weeklyRevenue;
  
  // Validate idea's numWeeks and weeklyRevemue values are valid
  if(!numWeeks || !weeklyRevenue) {
      res.status(400).send();
  } 

  // Identify if idea provides million dollar revenue and respond
  const totalRevenue = numWeeks * weeklyRevenue;
  if(totalRevenue >= 1000000) {
      next();
  } else {
      res.status(400).send();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
