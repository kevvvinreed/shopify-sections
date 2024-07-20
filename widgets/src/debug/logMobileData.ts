export const logMobileData = async (data: Record<string, any>) => {
  try {
    const response = await fetch("http://192.168.254.53:5000/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Log data sent:", result);
  } catch (error) {
    console.error("Error sending log data:", error);
  }
};
