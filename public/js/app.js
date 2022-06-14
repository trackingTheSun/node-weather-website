const weatherForm = document.querySelector("form");
const locationInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = locationInput.value;
  messageOne.textContent = "Data Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
      if (!response.ok) throw new Error(`Location not found`);
      return response.json();
    })
    .then((data) => {
      if (data.error) throw new Error(data.error);

      messageOne.textContent = `${data.location}`;
      messageTwo.textContent = `${data.forecast}`;
    })
    .catch((err) => {
      messageOne.textContent = `${err}`;
    });
});
