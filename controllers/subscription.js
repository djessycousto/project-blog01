const Subscribe = require("../models/Subscriber");

const createNewsLetter = async (req, res) => {
  try {
    const { email } = req.body;
    const newsletter = await Subscribe.create({ email });

    res.status(201).json(newsletter);
  } catch (error) {
    console.log(error);
  }
};

const getAllNewsLetterEmail = async (req, res) => {
  try {
    const allEmailsSubscribe = await Subscribe.find();
    res.status(200).json({
      subscribeEmails: allEmailsSubscribe,
      Qt: allEmailsSubscribe.length,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createNewsLetter, getAllNewsLetterEmail };
