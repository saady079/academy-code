const commentEl = document.querySelector(".txtarea");
const number_charEl = document.querySelector(".charCounter");
const number_twitEl = document.querySelector(".twitCounter");
const number_faceEl = document.querySelector(".faceCounter");
const number_wordEl = document.querySelector(".wordCounter");

const inputControl = function () {
  const valOfChar = commentEl.value.length;
  const valOfTwit = 280 - valOfChar;
  const valOfFace = 2200 - valOfChar;
  let valOfWord = commentEl.value.split(" ").length;

  if (commentEl.value.includes("<script>")) {
    alert("enable to change input");
    commentEl.value = commentEl.value.replace("<script>", "");
  }

  if (valOfChar === 0) {
    valOfWord = 0;
  }

  valOfTwit < 0 ?
    number_twitEl.classList.add("limitStyle") :
    number_twitEl.classList.remove("limitStyle");

  valOfFace < 0 ?
    number_faceEl.classList.add("limitStyle") :
    number_faceEl.classList.remove("limitStyle");

  number_charEl.textContent = valOfChar;
  number_twitEl.textContent = valOfTwit;
  number_faceEl.textContent = valOfFace;
  number_wordEl.textContent = valOfWord;
};

commentEl.addEventListener("input", inputControl);