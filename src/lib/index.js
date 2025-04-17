import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      resolve(hashedPassword);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const checkPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
