import env from "../../config.env.json" with { type: "json" };

const API_URL = env.API_URL;

// Service to submit yearly environmental indicators for a specific country

export default async function postIndicatorCountry(countryId, payload) {
  try {
    // const API_URL = `/api/countries/${countryId}/indicators`;

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(
        errorData.message || `Response status: ${response.status}`,
      );
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);

    throw error;
  }
}
