const checkMillionDollarIdea = (req, res, next) => {
  const idea = req.body;
  const numWeeks = Number(req.body.numWeeks);
  const weeklyRevenue = Number(req.body.weeklyRevenue);
  const value = Number(numWeeks * weeklyRevenue);

  if (isNaN(numWeeks) || isNaN(weeklyRevenue)) {
    return res.status(400).send();
  } else if (value < 1000000) {
    return res.status(400).send();
  } 
  console.log('call next')  
  next();

};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
