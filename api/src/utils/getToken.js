const getToken = (req) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null; // Return null if there is no valid token
  }

  // Extract the token after 'Bearer '
  return authHeader.split(" ")[1];
};

module.exports = getToken;