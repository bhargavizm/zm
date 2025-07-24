
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

  // formDataMappers["v-cards"] = formDataMappers["business-cards"];
};

formDataMappers["v-cards"] = formDataMappers["business-cards"];