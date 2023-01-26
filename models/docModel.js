const mongoose = require("mongoose");

const docSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    url: {
      type: String,
      required: false,
    },
    upload: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: [true, "Please add a note"],
    },
    company: {
      type: String,
      required: [true, "Please Company Name"],
    },
    category: {
      type: String,
      required: [true, "Please Category Name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doc", docSchema);
