document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const resultBox = document.getElementById("definitionResult");
  const inputField = document.getElementById("termInput");

  // Show result on Enter
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });

  // 👇 Optional: Show funny intro again if input is cleared
  inputField.addEventListener("input", () => {
    if (!inputField.value.trim()) {
      resultBox.innerHTML = `
        <p id="funnyIntro" class="funny-intro">Hold onto your brain cells! 🤯</p>
      `;
    }
  });

  // Button click logic
  searchBtn.addEventListener("click", async () => {
    const term = inputField.value.trim();
    const funnyIntro = document.getElementById("funnyIntro");

    if (!term) {
      resultBox.innerHTML = "<p>Please enter something.</p>";
      return;
    }

    resultBox.innerHTML = "<p>Loading...</p>";
    if (funnyIntro) funnyIntro.style.display = "none";

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '54d481785cmsh60b830be1c9135ap1c42f7jsn0fe055a031f4',
        'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(
        `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${term}`,
        options
      );
      const data = await response.json();

      if (data.list.length === 0) {
        resultBox.innerHTML = "<p>I don't know, you made a mistake.</p>";
      } else {
        const definition = data.list[0].definition;
        resultBox.innerHTML = `
          <div class="result-card">
            <h3>${term}</h3>
            <p>${definition}</p>
          </div>
        `;
      }
    } catch (error) {
      console.error("Error fetching definition:", error);
      resultBox.innerHTML = "<p>Something went wrong. Please try again.</p>";
    }
  });
});