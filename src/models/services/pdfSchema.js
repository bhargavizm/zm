import mongoose from "mongoose";

const fileItemSchema = new mongoose.Schema({
  fileData: Buffer,
  fileName: String,
  fileType: String,
});

const pdfSchema = new mongoose.Schema({
  title: String,
  description: String, 
  password: String,

  files: [fileItemSchema], // multiple file support

  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
  },
}, { timestamps: true });

const PDFServiceModel =
  mongoose.models.PDFService || mongoose.model("PDFService", pdfSchema);

export default PDFServiceModel;
