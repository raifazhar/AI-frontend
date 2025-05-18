const API_URL = "https://gamecoverai-backend-production.up.railway.app/predict"; // Add /predict
const classLabels = ["Action", "Adventure", "Horror", "RPG", "Sports"]; // Adjust based on your model

async function uploadImage() {
  const fileInput = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  resultDiv.innerText = "🔍 Predicting genre...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    const prediction = data.prediction;

    if (
      !Array.isArray(prediction) ||
      prediction.length !== classLabels.length
    ) {
      throw new Error("Invalid prediction format.");
    }

    const maxIndex = prediction.indexOf(Math.max(...prediction));
    const predictedLabel = classLabels[maxIndex];
    const confidence = (prediction[maxIndex] * 100).toFixed(2);

    resultDiv.innerText = `🎮 Predicted Genre: ${predictedLabel} (${confidence}%)`;
  } catch (error) {
    console.error("Prediction error:", error);
    resultDiv.innerText = " An error occurred while predicting.";
  }
}
