let cachedPanToken: string | null = null;
let panTokenExpiry = 0;

export const verifyPan = async (pan: string) => {
  try {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panRegex.test(pan)) {
      throw new Error("Invalid PAN format");
    }

    if (!process.env.PAN_API_KEY) {
      console.log("Using MOCK PAN API");

      if (pan === "ABCDE1234F") {
        return {
          valid: true,
          name: "Demo User",
        };
      }

      throw new Error("Invalid PAN (mock)");
    }


    const res = await fetch(`${process.env.PAN_BASE_URL}/pan/verify`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PAN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pan }),
    });

    const data = await res.json();

    if (!data || !data.valid) {
      throw new Error("Invalid PAN");
    }

    return {
      valid: true,
      name: data.name,
    };

  } catch (err: any) {
    throw new Error(err.message || "PAN verification failed");
  }
};