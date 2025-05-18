const API_URL = "https://gamecoverai-backend.up.railway.app/predict"; // Use your actual Railway public URL

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
    document.getElementById("result").innerText =
      "Prediction: " + JSON.stringify(data.prediction);
  } catch (error) {
    console.error(error);
    document.getElementById("result").innerText = "An error occurred.";
  }
}
