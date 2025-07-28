const sharedUrlJsonMapper = {
  type: "json",
  map: (body, state, bgDesign) => ({
    url: state.url,
    password: state.password,
    bgDesign,
  }),
};

// Assign shared mapper to all URL-based services
export const urlBasedServices = [
  "urls",
  "meetings",
  "google-meets",
  "zoom-meets",
  "microsoft-teams",
  "form-qr",
  "forms",
  "student-forms",
  "personal-notes",
  "youtube",
  "facebook",
  "instagram",
  "linkedin",
  "twitter",
  "location",
  ,
  "landing-page",
  "github",
];

const sharedFileUploadMapper = {
  type: "formData",
  map: (formData, state, bgDesign) => {
    formData.append("title", state.title || "");
    formData.append("description", state.description || "");
    formData.append("password", state.password || "");
    formData.append("bgDesign", bgDesign || "");

    if (Array.isArray(state.file)) {
      state.file.forEach((f) => {
        formData.append("files", f);
      });
    }
  },
};


export const formDataMappers = {
  "menu-cards": {
    type: "formData",
    map: (formData, state, bgDesign) => {
      formData.append("restaurantName", state.restaurantName || "");
      formData.append("phone", state.phone || "");
      formData.append("email", state.email || "");
      formData.append("link", state.link || "");
      formData.append("password", state.password || "");
      formData.append("bgDesign", bgDesign || "");

      state.menuItems?.forEach((item) => {
        if (item.file) {
          formData.append("images", item.file);
        }
      });
    },
  },

  "business-cards": {
    type: "formData",
    map: (formData, state, bgDesign) => {
      formData.append("name", state.name || "");
      formData.append("subheading", state.subheading || "");
      formData.append("designation", state.designation || "");
      formData.append("email", state.email || "");
      formData.append("mobile", state.mobile || "");
      formData.append("mapLink", state.mapLink || "");
      formData.append("socialLink", state.socialLink || "");
      formData.append("socialLink2", state.socialLink2 || "");
      formData.append("address", state.address || "");
      formData.append("password", state.password || "");
      formData.append("selectedTemplate", state.selectedTemplate || "");
      formData.append("bgDesign", bgDesign || "");

      // Assuming you're passing the image file in state.logo manually (not in the original component though)
      if (state.logo) {
        formData.append("file", state.logo);
      }
    },
  },

  // "v-cards": {
  //     ...this["business-cards"],
  //   },

  gallery: {
    type: "formData",
    map: (formData, state, bgDesign) => {
      formData.append("title", state.title || "");
      formData.append("description", state.description || "");
      formData.append("bgDesign", bgDesign || "");
      state.galleryImages?.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });
    },
  },

  sms: {
    type: "json", // 🟢 JSON body
    map: (body, state, bgDesign) => {
      return {
        genderName: state.genderName,
        messageType: state.messageType,
        textMessage: state.textMessage,
        password: state.password,
        bgDesign: bgDesign || null,
      };
    },
  },
  "text-messages": {
    type: "json",
    map: (body, state, bgDesign) => ({
      sender: state.sender,
      message: state.message,
      password: state.password,
      bgDesign: bgDesign || null,
    }),
  },

  // ✅ JSON-based body example
  "google-meet": {
    type: "json",
    map: (body, state, bgDesign) => {
      return {
        url: state.url,
        password: state.password,
        bgDesign,
      };
    },
  },

  "resumes": {
  type: "formData",
  map: (formData, state, bgDesign) => {
    // Append resume files
    (state.resumeFiles || []).forEach((file) => {
      formData.append("resumeFiles", file);
    });

    // Append resume URL
    formData.append("resumeUrl", state.resumeUrl || "");

    // Append password
    formData.append("password", state.password || "");

    // Optionally append background design
    formData.append("bgDesign", bgDesign || "");
  },
},
"property-qr": {
  type: "formData",
  map: (formData, state = {}, bgDesign) => {
    const basicInfo = state.basicInfo || {};
    const addressInfo = state.addressInfo || {};
    const pricingInfo = state.pricingInfo || {};
    const images = state.images || {};

    // Basic Info
formData.append("basicInfo.propertyName", basicInfo.propertyName || "");
formData.append("basicInfo.propertyType", basicInfo.propertyType || "");
formData.append("basicInfo.ownerName", basicInfo.ownerName || "");
formData.append("basicInfo.contactNumber", basicInfo.contactNumber || "");
formData.append("basicInfo.alternateNumber", basicInfo.alternateNumber || "");
formData.append("basicInfo.propertyDescription", basicInfo.propertyDescription || "");

// Address Info
formData.append("addressInfo.address", addressInfo.address || "");
formData.append("addressInfo.mapLink", addressInfo.mapLink || "");

// Pricing Info
formData.append("pricingInfo.price", pricingInfo.price || "");
formData.append("pricingInfo.area", pricingInfo.area || "");
formData.append("pricingInfo.amenities", pricingInfo.amenities || "");

// Password
formData.append("password", state.password || "");

// Gallery Images
if (Array.isArray(images.galleryImages)) {
  images.galleryImages.forEach((file) => {
    formData.append("images.galleryImages", file);
  });
}

// Background Design
if (bgDesign) {
  formData.append("images.bgDesign", bgDesign);
}


    return formData;
  },
},


  // formDataMappers["v-cards"] = formDataMappers["business-cards"];
};

formDataMappers["v-cards"] = formDataMappers["business-cards"];

urlBasedServices.forEach((service) => {
  formDataMappers[service] = sharedUrlJsonMapper;
});

["pdf", "audios", "videos", "gallery"].forEach((service) => {
  formDataMappers[service] = sharedFileUploadMapper;
});
