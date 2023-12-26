const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // استبدل bcrypt بـ bcryptjs

router.post("/register", async (req, res) => {
  // توليد ملح لتحسين أمان التشفير
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // التحقق من تكرار البريد الإلكتروني واسم المستخدم
  const checkEmail = await User.findOne({ email: req.body.email });
  const checkName = await User.findOne({ userName: req.body.userName });

  try {
    // التحقق من تكرار البريد الإلكتروني واسم المستخدم
    if (checkEmail) {
      res.status(401).send({ msg: "email is taken" });
    } else if (checkName) {
      res.status(402).send({ msg: "name is taken" });
    } else {
      // إنشاء مستخدم جديد وحفظه في قاعدة البيانات
      const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json("err" + err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    // البحث عن المستخدم باستخدام عنوان البريد الإلكتروني
    const user = await User.findOne({ email: req.body.email });
    let validPassword = "";
    if (user) {
      // التحقق من صحة كلمة المرور المدخلة
      validPassword = await bcrypt.compare(req.body.password, user.password);
    }

    if (!user) {
      res.status(400).json("user not found");
    } else if (!validPassword || validPassword === undefined) {
      res.status(400).json("wrong password");
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(404).send("no user exists in db to update");
  }
});

module.exports = router;
