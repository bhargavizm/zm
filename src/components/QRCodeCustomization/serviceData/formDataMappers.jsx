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

  businessCard: {
    type: "formData",
    map: (formData, state, bgDesign) => {
      formData.append("companyName", state.companyName || "");
      formData.append("designation", state.designation || "");
      formData.append("email", state.email || "");
      formData.append("phone", state.phone || "");
      formData.append("website", state.website || "");
      formData.append("bgDesign", bgDesign || "");
      if (state.logo) formData.append("logo", state.logo);
    },
  },

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
};