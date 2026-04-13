let cachedToken: string | null = null;
let tokenExpiry = 0;

export const verifyGst = async (gstin: string) => {
  try {
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;

    if (!gstRegex.test(gstin)) {
      throw new Error("Invalid GST format");
    }

    if (!process.env.GST_CLIENT_ID) {
      console.log("Using MOCK GST API");

      if (gstin === "22ABCDE1234F1Z5") {
        return {
          valid: true,
          businessName: "Demo Pvt Ltd",
          legalName: "Demo Private Limited",
        };
      }

      throw new Error("Invalid GST (mock)");
    }


    if (!cachedToken || Date.now() > tokenExpiry) {
      const tokenRes = await fetch(
        `${process.env.GST_BASE_URL}/oauth/access_token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: process.env.GST_CLIENT_ID,
            client_secret: process.env.GST_CLIENT_SECRET,
          }),
        }
      );

      const tokenData = await tokenRes.json();
      cachedToken = tokenData.access_token;

      tokenExpiry = Date.now() + 55 * 60 * 1000;
    }

    const gstRes = await fetch(
      `${process.env.GST_BASE_URL}/gst/search?gstin=${gstin}`,
      {
        headers: {
          Authorization: `Bearer ${cachedToken}`,
        },
      }
    );

    const gstData = await gstRes.json();

    if (!gstData || gstData.error) {
      throw new Error("Invalid GST");
    }

    return {
      valid: true,
      businessName: gstData.data.tradeNam,
      legalName: gstData.data.lgnm,
    };
  } catch (err: any) {
    throw new Error(err.message || "GST verification failed");
  }
};