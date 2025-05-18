const API_URL = "https://gamecoverai-backend-production.up.railway.app/predict"; // Add /predict

async function uploadImage() {
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    const text = await response.text(); // Read raw response
    console.log("Raw response text:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      document.getElementById("result").innerText =
        "Error parsing response: " + parseError.message;
      return;
    }

    document.getElementById("result").innerText =
      "Prediction: " + JSON.stringify(data.prediction);
  } catch (error) {
    console.error("Network or fetch error:", error);
    document.getElementById("result").innerText = "An error occurred.";
  }
}
