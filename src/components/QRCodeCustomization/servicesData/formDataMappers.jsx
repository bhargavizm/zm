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

  vehicles: {
    type: "formData",
    map: (formData, state, bgDesign) => {
      // Template
      formData.append("selectedTemplate", state?.selectedTemplate || "");

      // General Info
      formData.append("vehicleModel", state?.general?.vehicleModel || "");
      formData.append("vehicleNumber", state?.general?.vehicleNumber || "");
      formData.append("vehicleType", state?.general?.vehicleType || "");
      formData.append("description", state?.general?.description || "");

      // Registration Info
      formData.append("rcNumber", state?.registration?.rcNumber || "");
      formData.append("driverName", state?.registration?.driverName || "");
      formData.append("ownerName", state?.registration?.ownerName || "");

      // Contact Info
      formData.append("contact", state?.contact?.contact || "");
      formData.append("altContact", state?.contact?.altContact || "");
      formData.append("address", state?.contact?.address || "");

      // Security
      formData.append("password", state?.security?.password || "");

      // Media - Single file uploads
      const singleFileFields = [
        "vehicleImage",
        "licenseFront",
        "licenseBack",
        "rcFront",
        "rcBack",
        "pollution",
      ];
      singleFileFields.forEach((field) => {

        const file = state?.media?.[field];
        if (file) formData.append(field, file);
      });

      // Media - Multiple file uploads
      (state?.media?.galleryImages || []).forEach((file) => {
        if (file) formData.append("galleryImages", file);
      });

      (state?.media?.insurance || []).forEach((file) => {

        if (file) formData.append("insurance", file);
      });

      // Optional Design
      formData.append("bgDesign", bgDesign || "");
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

  "kids-safety-qr-tags": {
    type: "formData",
    map: (formData, state, bgDesign) => {
      // Child Information
      formData.append("childName", state.childName || "");
      formData.append("dob", state.dob || "");
      formData.append("classGrade", state.classGrade || "");

      // School Information
      formData.append("schoolName", state.schoolName || "");
      formData.append("schoolAddress", state.schoolAddress || "");
      formData.append("schoolContact", state.schoolContact || "");

      // Parent Contacts
      formData.append("parentName", state.parentName || "");
      formData.append("contact", state.contact || "");
      formData.append("contact2", state.contact2 || "");

      formData.append("bgDesign", bgDesign || "");

      console.log(`bgDesign: ${bgDesign}`)

      // Handle altContact array
      if (Array.isArray(state.altContact)) {
        state.altContact.forEach((contact, index) => {
          formData.append(`altContact[${index}]`, contact || "");
        });
      }

      // Home Location
      formData.append("homeAddress", state.homeAddress || "");
      formData.append("mapLink", state.mapLink || "");

      // Security
      formData.append("password", state.password || "");

      // Image handling
      if (state.kidsImage instanceof File || state.kidsImage instanceof Blob) {
        formData.append("kidsImage", state.kidsImage);
      } else if (typeof state.kidsImage === "string") {
        // If it's a base64 string or URL
        formData.append("kidsImageUrl", state.kidsImage);
      }

    

      // Optional: Add any metadata or timestamps
      formData.append("createdAt", new Date().toISOString());
  "business-shops": {
    type: "formData",
    map: (formData, state, bgDesign) => {
      const general = state?.businessInfo?.general || {};
      const contact = state?.businessInfo?.contact || {};
      const security = state?.businessInfo?.security || {};
      const media = state?.businessInfo?.media || {};
      const shopTemplate = state?.shopTimingsTemplate || {};
      const selectedTemplate = shopTemplate.selectedTemplate || "";
      const templateKey = `${selectedTemplate}Data`;
      const templateData = shopTemplate[templateKey] || {};

      // === General Info ===
      formData.append("businessInfo.general.businessName", general.businessName || "");
      formData.append("businessInfo.general.businessType", general.businessType || "");
      formData.append("businessInfo.general.description", general.description || "");
      formData.append("businessInfo.general.shopTimings", general.shopTimings || "");
      formData.append("businessInfo.general.discount", general.discount || "");
      formData.append("businessInfo.general.establishedDate", general.establishedDate || "");

      // === Contact Info ===
      formData.append("businessInfo.contact.owner", contact.owner || "");
      formData.append("businessInfo.contact.phone", contact.phone || "");
      formData.append("businessInfo.contact.altPhone", contact.altPhone || "");
      formData.append("businessInfo.contact.email", contact.email || "");
      formData.append("businessInfo.contact.address", contact.address || "");

      // === Security Info ===
      formData.append("businessInfo.security.password", security.password || "");

      // === Logo ===
      if (media.logo instanceof File) {
        formData.append("businessInfo.media.logo", media.logo);
      }

      // === Gallery Images ===
      if (Array.isArray(media.galleryImages)) {
        media.galleryImages.forEach((img) => {
          if (img instanceof File) {
            formData.append("businessInfo.media.galleryImages", img);
          } else if (img?.file instanceof File) {
            formData.append("businessInfo.media.galleryImages", img.file);
          }
        });
      }

      // === Video ===
      if (media.video instanceof File) {
        formData.append("businessInfo.media.video", media.video);
      }

      // === Background Design ===
      if (bgDesign) {
        formData.append("bgDesign", bgDesign);
      }

      // === Shop Timings Template ===
      Object.entries(templateData).forEach(([key, value]) => {
        formData.append(`shopTimingsTemplate.${templateKey}.${key}`, value || "");
      });

      formData.append("shopTimingsTemplate.selectedTemplate", selectedTemplate);
    },
  },

  "business-shops": {
    type: "formData", 
    map: (formData, state, bgDesign) => {
      const general = state?.businessInfo?.general || {};
      const contact = state?.businessInfo?.contact || {};
      const security = state?.businessInfo?.security || {};
      const media = state?.businessInfo?.media || {};
      const shopTemplate = state?.shopTimingsTemplate || {};
      const selectedTemplate = shopTemplate.selectedTemplate || "";
      const templateKey = `${selectedTemplate}Data`;
      const templateData = shopTemplate[templateKey] || {};

      // === General Info ===
      formData.append(
        "businessInfo.general.businessName",
        general.businessName || ""
      );
      formData.append(
        "businessInfo.general.businessType",
        general.businessType || ""
      );
      formData.append(
        "businessInfo.general.description",
        general.description || ""
      );
      formData.append(
        "businessInfo.general.shopTimings",
        general.shopTimings || ""
      );
      formData.append("businessInfo.general.discount", general.discount || "");
      formData.append(
        "businessInfo.general.establishedDate",
        general.establishedDate || ""
      );

      // === Contact Info ===
      formData.append("businessInfo.contact.owner", contact.owner || "");
      formData.append("businessInfo.contact.phone", contact.phone || "");
      formData.append("businessInfo.contact.altPhone", contact.altPhone || "");
      formData.append("businessInfo.contact.email", contact.email || "");
      formData.append("businessInfo.contact.address", contact.address || "");

      // === Security Info ===
      formData.append(
        "businessInfo.security.password",
        security.password || ""
      );

      // === Logo ===
      if (media.logo instanceof File) {
        formData.append("businessInfo.media.logo", media.logo);
      }

      // === Gallery Images ===
      if (Array.isArray(media.galleryImages)) {
        media.galleryImages.forEach((img) => {
          if (img instanceof File) {
            formData.append("businessInfo.media.galleryImages", img);
          } else if (img?.file instanceof File) {
            formData.append("businessInfo.media.galleryImages", img.file);
          }
        });
      }

      // === Video ===
      if (media.video instanceof File) {
        formData.append("businessInfo.media.video", media.video);
      }

      // === Background Design ===
      if (bgDesign) {
        formData.append("bgDesign", bgDesign);
      }

      // === Shop Timings Template ===
      Object.entries(templateData).forEach(([key, value]) => {
        formData.append(
          `shopTimingsTemplate.${templateKey}.${key}`,
          value || ""
        );
      });

      formData.append("shopTimingsTemplate.selectedTemplate", selectedTemplate);
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

  resumes: {
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
      formData.append(
        "basicInfo.alternateNumber",
        basicInfo.alternateNumber || ""
      );
      formData.append(
        "basicInfo.propertyDescription",
        basicInfo.propertyDescription || ""
      );

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

  "discounts": {
  type: "formData",
  map: (formData, state = {}, bgDesign) => {
    const {
      nameOfBusiness = "",
      code = "",
      password = "",
      brandLogo = null,
      couponImage = null,
      qrCodeImage = "", // ✅ FIX: add this line to avoid ReferenceError
      location = {},
      renewalDate = "",
      status = "active",
    } = state;

    // Basic Fields
    formData.append("nameOfBusiness", nameOfBusiness);
    formData.append("code", code);
    formData.append("password", password);
    formData.append("qrCodeImage", qrCodeImage);
    formData.append("status", status);
    formData.append("renewalDate", renewalDate);

    // Location
    formData.append("location.latitude", location.latitude || "");
    formData.append("location.longitude", location.longitude || "");
    formData.append("location.address", location.address || "");

    // Images
    if (brandLogo) {
      formData.append("brandLogo", brandLogo); // File
    }

    if (couponImage) {
      formData.append("couponImage", couponImage); // File
    }

    // Background Design (optional)
    if (bgDesign) {
      formData.append("bgDesign", bgDesign); // Optional background
    }

    return formData;
  },

  "Pet-ID-tags": {
    type: "json",
    map: (body, state, bgDesign) => ({
      ownerInfo: {
        name: state.ownerInfo?.name || "",
        phone: state.ownerInfo?.phone || "",
        email: state.ownerInfo?.email || "",
        address: state.ownerInfo?.address || "",
        password: state.ownerInfo?.password || "",
      },
      pet: {
        name: state.pet?.name || "",
        breed: state.pet?.breed || "",
        color: state.pet?.color || "",
      },
      selectedTemplate: state.selectedTemplate || "",
      bgDesign: bgDesign || "",
      image: state.mainImage || "", // base64 string or preview URL
    }),
  },

  "multi-urls": {
    type: "json",
    map: (body, state, bgDesign) => ({
      socialLinks: state.socialLinks || {}, // ✅ direct access, not state.multiUrl.socialLinks
      customLinks: Array.isArray(state.customLinks) ? state.customLinks : [],
      password: state.password || "",
      bgDesign: bgDesign || null,
    }),
  },

};

formDataMappers["v-cards"] = formDataMappers["business-cards"];

urlBasedServices.forEach((service) => {
  formDataMappers[service] = sharedUrlJsonMapper;
});

["pdf", "audios", "videos", "gallery"].forEach((service) => {
  formDataMappers[service] = sharedFileUploadMapper;
});
