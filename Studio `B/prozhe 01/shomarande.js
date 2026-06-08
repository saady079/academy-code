const btnEl1 = document.querySelector(".btn-increase");
const btnEl2 = document.querySelector(".btn-decrease");
const countValueEl = document.querySelector(".mb-number");
const iconResetEl = document.querySelector(".mybox > button");
const counterBox = document.querySelector(".mybox");
const titlebox = document.querySelector(".mb-title");

function increaseBtn() {
  const contectOfNum = countValueEl.textContent;
  const convertValue = Number(contectOfNum);
  const operaOfNum = convertValue + 1;

  if (operaOfNum <= 5) {
    countValueEl.textContent = operaOfNum;
    if (operaOfNum == 5) {
      counterBox.classList.add("bkLimit");
      titlebox.innerHTML = "limit! version >5 </br> now buy a premium account";
    }
  }
}

function decreaseBtn() {
  const contectOfNum = countValueEl.textContent;
  const convertValue = Number(contectOfNum);
  const operaOfNum = convertValue - 1;

  if (operaOfNum >= 0) {
    countValueEl.textContent = operaOfNum;
    if (operaOfNum < 5) {
        styleCounter();
    }
  }
}

btnEl1.addEventListener("click", increaseBtn);
document.addEventListener("keydown", increaseBtn);
btnEl2.addEventListener("click", decreaseBtn);

function styleCounter() {
  counterBox.classList.remove("bkLimit");
  titlebox.innerHTML = "Saady </br> Counter";
}

iconResetEl.addEventListener("click", function () {
  countValueEl.textContent = 0;
  styleCounter();
});
