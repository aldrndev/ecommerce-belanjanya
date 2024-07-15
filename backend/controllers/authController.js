const { generateOTP, sendEmail } = require("../helpers/helper");
const {
  User,
  Profile,
  Conversation,
  Message,
  Wishlist,
  Order,
  Payment,
  Cart,
  sequelize,
} = require("../models");
const { comparePassword } = require("../utils/bcrypt");
const { createOtp, verifyToken, createToken } = require("../utils/jwt");

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return next(new Error("Email dan Password harus diisi"));

      const checkUser = await User.findOne({
        where: {
          email,
        },
        include: Profile,
      });
      if (!checkUser) return next(new Error("Email atau Password salah"));

      if (!comparePassword(password, checkUser.password))
        return next(new Error("Email atau Password salah"));

      const payload = {
        id: checkUser.id,
        email: checkUser.email,
        name: checkUser.Profile.name,
        phone: checkUser.Profile.phone,
        addres: checkUser.Profile.addres,
        image: checkUser.image,
      };

      const token = createToken(payload);

      res.status(200).json({
        statusCode: 200,
        message: `Selamat datang kembali ${checkUser.Profile.name}`,
        data: payload,
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    const trx = await sequelize.transaction();
    try {
      const { email, password, confirmPassword } = req.body;
      console.log(req.body);
      if (password !== confirmPassword)
        return next(new Error("Password dan konfirmasi password harus sama"));

      const createUser = await User.create(
        {
          email,
          password,
        },
        {
          transaction: trx,
        }
      );

      const otp = generateOTP();
      const token = createOtp(createUser.id, otp);
      await sendEmail(email, otp);

      const generateToken = createToken({
        id: createUser.id,
        email: createUser.email,
      });

      await trx.commit();

      res.status(201).json({
        statusCode: 201,
        message:
          "Akun berhasil dibuat, silahkan cek email anda dan verifikasi OTP",
        token,
        access_token: generateToken,
      });
    } catch (error) {
      await trx.rollback();
      next(error);
    }
  },
  verifyOtp: async (req, res, next) => {
    try {
      const { token, otp, name, phone, address } = req.body;

      const decoded = verifyToken(token);

      if (decoded.otp !== otp)
        return next(new Error("Kode OTP yang kamu masukan salah"));

      const checkUser = await User.findOne({
        where: {
          id: decoded.userId,
        },
      });
      if (!checkUser) return next(new Error("Akun tidak ditemukan"));

      await Profile.create({
        name,
        phone,
        address,
        image: req.file ? req.file.path : "uploads/images/default.png",
        UserId: checkUser.id,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Akun berhasil diverifikasi dan berhasil melengkapi profile",
      });
    } catch (error) {
      next(error);
    }
  },
};
