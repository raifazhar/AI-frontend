const classLabels = ["Action", "Adventure", "Horror", "RPG", "Sports"]; // Adjust based on your model

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

    const data = await response.json();
    const prediction = data.prediction;
    const maxIndex = prediction.indexOf(Math.max(...prediction));
    const predictedLabel = classLabels[maxIndex];

    document.getElementById(
      "result"
    ).innerText = `Predicted Genre: ${predictedLabel} (${(
      prediction[maxIndex] * 100
    ).toFixed(2)}%)`;
  } catch (error) {
    console.error(error);
    document.getElementById("result").innerText = "An error occurred.";
  }
}
