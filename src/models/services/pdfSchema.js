// import mongoose from "mongoose";

// const pdfSchema = new mongoose.Schema(
//     {
//         user: {
//       id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//       name: String
//     },
//         title:{
//             type:String,
//             trim:true,
//         },
//         description:{
//             type:String,
//             trim:true,
//         },
//         pdfFileName:{
//             type:String
//         },
//         pdfFileURL:{
//             type:String,
//         },
//         password:{
//             type:String,
//         },

//     },
//     {
//         timestamps:true,
//     }
// );
// const PDFServiceModel =
//   mongoose.models.PDF || mongoose.model("PDF", pdfSchema);

// export default PDFServiceModel;

// models/services/pdfSchema.js
import mongoose from "mongoose";
import fileSchema from "./fileSchema";

const pdfSchema = new mongoose.Schema({
  title: String,
  description: String,
  password: String,
   fileData: Buffer,
  fileName: String,
  fileType: String,
  user: {
     id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
  },
}, { timestamps: true });

 const PDFServiceModel =
   mongoose.models.PDF || mongoose.model("PDFService", pdfSchema);

 export default PDFServiceModel;
