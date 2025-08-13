// utils/shortenUrl.js

export const getShortenedUrl = async (path) => {
  try {
    const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullUrl }),
    });

    if (!res.ok) {
      console.error("Shorten API failed:", res.status);
      return fullUrl; // fallback to original
    }

    const { shortUrl } = await res.json();

    return shortUrl;
 
  } catch (error) {
    console.error("Error while shortening URL:", error);
    return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`; // fallback
  }
};


export const getShortenedUrlServices = async (path) => {
  try {
    const fullUrl = `${path}`;
   

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullUrl }),
    });

    if (!res.ok) {
      console.error("Shorten API failed:", res.status);
      return fullUrl;
    }

    const { shortUrl } = await res.json();
    return shortUrl;
  } catch (error) {
    console.error("Error while shortening URL:", error);
    return `${path}`;
  }
};


// export const getShortenedUrlWifi = async (security,ssid,password) => {
//   try {
//     const fullUrl = `WIFI:T:${security};S:${ssid};P:${password || ""};;`;
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shorten`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ fullUrl }),
//     });

//     if (!res.ok) {
//       console.error("Shorten API failed:", res.status);
//       return fullUrl; // fallback to original
//     }

//     const { shortUrl } = await res.json();
//       console.log('shortUrl',shortUrl)
//     return shortUrl;
 
//   } catch (error) {
//     console.error("Error while shortening URL:", error);
//     return `WIFI:T:${security};S:${ssid};P:${password || ""};;`; // fallback
//   }
// };
