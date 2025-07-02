import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            trim:true,
        },
        description:{
            type:String,
            trim:true,
        },
        pdfFileName:{
            type:String
        },
        password:{
            type:String,
        },

    },
    {
        timestamps:true,
    }
);
const PDFServiceModel =
  mongoose.models.PDF || mongoose.model("PDF", pdfSchema);

export default PDFServiceModel;