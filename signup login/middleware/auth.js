export const authMiddleware = (request, response, next) => {
  const isLogin = true;

  if (isLogin) {
    console.log(`Check Auth Middleware`)
    next();
  } else {
    response.json({
      message: "unAuth User!",
    });
  }
};