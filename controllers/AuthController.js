// controllers/AuthController.js
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const session = require("express-session");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi Kesalahan Server" });
  }
};

const register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password dan Konfirmasi Password tidak cocok" });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    res.json({ msg: "Registrasi Berhasil" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi Kesalahan Server" });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({ msg: "Email tidak ditemukan" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(400).json({ msg: "Password Salah" });
    }

    // Set user information in the session
    req.session.user = {
      id: user.id,
      email: user.email,
      // Add any other relevant user information
    };

    res.json({ msg: "Login Berhasil" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi Kesalahan Server" });
  }
};

const logout = async (req, res) => {
  try {
    // Check if user is authenticated
    if (req.session && req.session.user) {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "Gagal melakukan logout" });
        } else {
          res.json({ msg: "Logout Berhasil" });
        }
      });
    } else {
      res.status(401).json({ msg: "Unauthorized. User not logged in" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi Kesalahan Server" });
  }
};

module.exports = { getUsers, register, login, logout };
