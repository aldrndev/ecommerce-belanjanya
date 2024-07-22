const path = require("path");
const { generateOTP, sendEmail } = require("../helpers/helper");
const { User, Profile, sequelize } = require("../models");
const { comparePassword } = require("../utils/bcrypt");
const {
  createOtp,
  verifyToken,
  createToken,
  refreshToken,
} = require("../utils/jwt");
const fs = require("fs");

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return next(new Error("Email dan Password harus di isi"));

      const checkUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!checkUser || !comparePassword(password, checkUser.password))
        return next(new Error("Email atau Password salah"));

      if (!checkUser.isVerified) {
        const otp = generateOTP();
        const payload = {
          id: checkUser.id,
          otp,
        };
        const tokenOtp = createOtp(payload);
        await sendEmail(email, otp);

        return res.status(200).json({
          statusCode: 200,
          message:
            "Akun anda belum terverifikasi, Silahkan cek email anda untuk verifikasi OTP",
          tokenOtp,
          email: checkUser.email,
          isVerified: false,
          isProfile: false,
        });
      }

      const checkProfile = await Profile.findOne({
        where: {
          UserId: checkUser.id,
        },
      });

      if (!checkProfile) {
        const payload = {
          id: checkUser.id,
          email: checkUser.email,
        };

        const generateToken = createToken(payload);
        const generateRefreshToken = refreshToken(payload);

        res.cookie("refresh_token", generateRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          path: "/api/auth/refresh-token",
        });

        res.status(200).json({
          statusCode: 200,
          message:
            "Profile anda belum terdaftar, silahkan lengkapi profile anda dibawah ini",
          isVerified: true,
          isProfile: false,
          access_token: generateToken,
        });
        return;
      }

      const payload = {
        id: checkUser.id,
        email: checkUser.email,
        name: checkProfile.name,
        phone: checkProfile.phone,
        address: checkProfile.address,
        image: checkProfile.image,
      };

      const token = createToken(payload);
      const createRefreshToken = refreshToken(payload);

      res.cookie("refresh_token", createRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/api/auth/refresh-token",
      });

      res.status(200).json({
        statusCode: 200,
        message: `Selamat datang kembali ${checkProfile.name}`,
        data: payload,
        access_token: token,
        isVerified: true,
        isProfile: true,
      });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { email, password, confirmPassword } = req.body;

      if (password !== confirmPassword)
        return next(new Error("Password tidak sama"));

      const createUser = await User.create({
        email,
        password,
      });

      const otp = generateOTP();
      const payload = {
        id: createUser.id,
        otp,
      };
      const tokenOtp = createOtp(payload);
      await sendEmail(email, otp);

      res.status(201).json({
        statusCode: 201,
        message: "Silahkan cek email anda untuk verifikasi OTP",
        email: createUser.email,
        tokenOtp,
      });
    } catch (error) {
      next(error);
    }
  }
  static async verifyOtp(req, res, next) {
    try {
      const { tokenOtp, otpUser } = req.body;

      const decoded = verifyToken(tokenOtp);

      const checkUser = await User.findByPk(decoded.id);
      if (!checkUser) return next(new Error("User tidak ditemukan"));

      if (decoded.otp !== otpUser)
        return next(new Error("Kode OTP yang kamu masukan salah"));

      if (checkUser.isVerified)
        return next(new Error("Akun anda sudah terverifikasi"));

      checkUser.isVerified = true;
      await checkUser.save();

      const payload = {
        id: checkUser.id,
        email: checkUser.email,
      };

      const generateToken = createToken(payload);
      const generateRefreshToken = refreshToken(payload);

      res.cookie("refresh_token", generateRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/api/auth/refresh-token",
      });

      res.status(201).json({
        statusCode: 201,
        message: `Email kamu berhasil di verifikasi`,
        access_token: generateToken,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createProfile(req, res, next) {
    try {
      const { name, phone, address } = req.body;

      const { id } = req.user;

      const checkUser = await User.findByPk(id);
      if (!checkUser) return next(new Error("User tidak ditemukan"));

      const checkProfile = await Profile.findOne({
        where: {
          UserId: checkUser.id,
        },
      });

      if (checkProfile) return next(new Error("Profile anda sudah terdaftar"));

      const createProfile = await Profile.create({
        name,
        phone,
        address,
        image: req.file ? req.file.path : "public/uploads/images/default.png",
        UserId: checkUser.id,
      });

      const user = {
        email: checkUser.email,
        name: createProfile.name,
        phone: createProfile.phone,
        address: createProfile.address,
        image: createProfile.image,
      };

      console.log(user);

      res.status(201).json({
        statusCode: 201,
        message: `Selamat ${createProfile.name}, Profile anda berhasil dibuat`,
        data: user,
      });
    } catch (error) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      }
      next(error);
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const { refresh_token } = req.cookies;

      if (!refresh_token)
        return next(new Error("Silahkan login terlebih dahulu"));

      const verify = verifyToken(refresh_token);

      const checkUser = await User.findOne({
        where: {
          id: verify.id,
        },
        include: Profile,
      });

      if (!checkUser) return next(new Error("User tidak ditemukan"));

      const payload = {
        id: checkUser.id,
        email: checkUser.email,
        name: checkUser.Profile.name,
        phone: checkUser.Profile.phone,
        addres: checkUser.Profile.addres,
        image: checkUser.Profile.image,
      };

      const newToken = createToken(payload);

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mendapatkan token baru",
        access_token: newToken,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      res.clearCookie("refresh_token");
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil keluar",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
