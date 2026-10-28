// Loads dynamic configuration from config.env.json

async function getConfig() {
  try {
    const response = await fetch("/config.env.json");
    if (!response.ok) {
      throw new Error("Unable to load configuration file.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error while fetching configuration:", error);
    throw error;
  }
}

// Fetches all indicators for a given country

export async function getIndicatorsByCountry(countryId) {
  const config = await getConfig();

  const response = await fetch(`${config.URL}/${countryId}/indicators`, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Server error (${response.status})`);
  }

  return await response.json();
}

// Sends environmental indicators for a given country

export default async function postIndicatorCountry(countryId, payload) {
  const config = await getConfig();

  const response = await fetch(`${config.URL}/${countryId}/indicators`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Server error (${response.status})`);
  }

  return await response.json();
}