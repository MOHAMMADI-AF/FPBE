const express = require("express");
const router = express.Router();
const {
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} = require("../controllers/docController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getDocs).post(protect, setDoc);
router.route("/:id").delete(protect, deleteDoc).put(protect, updateDoc);

module.exports = router;
