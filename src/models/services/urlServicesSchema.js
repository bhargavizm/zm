import mongoose from "mongoose";


const URLServicesSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true,  }, 
    url: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Create index on userId + serviceName to speed up queries
//URLServicesSchema.index({ userId: 1, serviceName: 1 }, { unique: true });


// Use camelCase model name and match with models[ModelName]
const URLServiceModel =
  mongoose.models.URLService || mongoose.model("URLService", URLServicesSchema);

export default URLServiceModel;
