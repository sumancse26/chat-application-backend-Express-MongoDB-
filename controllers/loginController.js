const getLogin = async (req, res) => {
  try {
    //
  } catch (e) {
    res.json({
      status: 500,
      message: e.message,
    });
  }
};

module.exports = { getLogin };
