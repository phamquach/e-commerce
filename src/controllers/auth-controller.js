import * as auth from "../services/service-auth.js";

export async function login(req, res) {
  const token = req.cookies.token;
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const result = await auth.loginService(email, password, token);

    if (result.status === 200 && result.data?.token) {
      res.cookie("token", result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 5 * 60 * 1000, // 5 phút
      });
      delete result.data.token;
    }

    return res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.clearCookie("token");
    const status = error.status;
    const message = error.message;
    return res.status(status).json({
      message,
      data: error.data || null,
    });
  }
}

export async function register(req, res) {
  try {
    const result = await auth.registerService(req.body);
    return res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      data: error.data || null,
    });
  }
}
export async function logout(req, res) {
  const token = req.cookies.token;
  try {
    const result = await auth.logoutService(token);
    res.clearCookie("token");
    res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      data: error.data || null,
    });
  }
}
export async function refreshToken(req, res) {
  // Implement token refresh logic here
  res.status(200).json({ message: "Token refreshed successfully" });
}
export async function checkToken(req, res) {
  const token = req.cookies.token;
  try {
    const result = await auth.checkTokenService(token);
    res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      data: error.data || null,
    });
  }
}
export async function verifyEmail(req, res) {
  const { verifiedCode, email } = req.body;
  try {
    const result = await auth.checkVerifiedUser(verifiedCode, email);
    return res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
      data: error.data || null,
    });
  }
}
