// // models/services/wifiSchema.js

// import mongoose from "mongoose";

// const wifiSchema = new mongoose.Schema(
//   {
//     ssid: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     security: {
//       type: String,
//       enum: ["WPA", "WEP", "nopass"],
//       required: true,
//     },
//     password: {
//       type: String,
//       required: function () {
//         return this.security !== "nopass";
//       },
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt
//   }
// );

// const WifiModal = mongoose.models.Wifi || mongoose.model("Wifi", wifiSchema);

// export default WifiModal



// import mongoose from "mongoose";

// const wifiSchema = new mongoose.Schema(
//   {
//     ssid: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     security: {
//       type: String,
//       enum: ["WPA", "WEP", "nopass"],
//       required: true,
//     },
//     password: {
//       type: String,
//       required: function () {
//         return this.security !== "nopass";
//       },
//     },
//     qrPassword : {
//       type: String, // This field is optional and can be used to store a QR code representation of the password
//       trim: true,
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// const WifiModel = mongoose.models.Wifi || mongoose.model("Wifi", wifiSchema);

// export default WifiModel;

import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";


const wifiSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
    },

    ssid: {
      type: String,
      required: true,
      trim: true,
    },

    security: {
      type: String,
      enum: ["WPA", "WEP", "nopass"],
      required: true,
    },

    password: {
      type: String,
      required: function () {
        return this.security !== "nopass";
      },
    },

    bgDesign:{
      type:String,
    },

   qrCodeDetails: qrCodeServicesSchema
  },
  {
    timestamps: true,
  }
);

const WifiModel = mongoose.models.Wifi || mongoose.model("Wifi", wifiSchema);

export default WifiModel;
