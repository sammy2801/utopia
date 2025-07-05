//const BIN_URL = "https://api.jsonbin.io/v3/b/685f99578a456b7966b721e5";
//const API_KEY = "$2a$10$xTD9Bx03apdopYPojGB6yuyM93mTQrYq4N9O6unEIyPtI/.9Ta.uS";

function submitData() {
  const name = document.getElementById("nameInput").value;
  const mainCharacter = document.getElementById("mainCharacter").value;
  const villain = document.getElementById("villain").value;
  document.getElementById("confirmation").style.display = "block";
document.getElementById("storyLink").style.display = "block";
localStorage.setItem("mainCharacterName", name);


  const newEntry = {
    timestamp: new Date().toISOString(),
    name,
    mainCharacter,
    villain
  };

  // Step 1: Get existing data
  fetch(BIN_URL + "/latest", {
    method: "GET",
    headers: {
      "X-Master-Key": API_KEY
    }
  })
  .then(res => res.json())
  .then(json => {
    const existing = json.record.submissions || [];

    // Step 2: Append new entry
    existing.push(newEntry);

    // Step 3: PUT updated array back to bin
    return fetch(BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY
      },
      body: JSON.stringify({ submissions: existing })
    });
  })
  .then(res => res.json())
  .then(data => {
    console.log("Submission saved!", data);
    document.getElementById("confirmation").style.display = "block";
  })
  .catch(err => {
    console.error("Something went wrong:", err);
    alert("Something went wrong!");
  });
}
