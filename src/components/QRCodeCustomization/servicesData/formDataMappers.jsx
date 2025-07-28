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

  // formDataMappers["v-cards"] = formDataMappers["business-cards"];
};

formDataMappers["v-cards"] = formDataMappers["business-cards"];

urlBasedServices.forEach((service) => {
  formDataMappers[service] = sharedUrlJsonMapper;
});

["pdf", "audios", "videos", "gallery"].forEach((service) => {
  formDataMappers[service] = sharedFileUploadMapper;
});
