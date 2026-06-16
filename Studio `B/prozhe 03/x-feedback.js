const timer = 3000;
const maxChar = 150;
const baseUrl = 'https://bytegrad.com/course-assets/js/1/api';

const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedsOl = document.querySelector(".feedbacks");
const submit_btnEl = document.querySelector(".submit-btn");
const loadingEl = document.querySelector('.spinner');
const hashtagUl = document.querySelector('.hashtags');

const toFixedComment = obj => {
  const feedItem = `
    <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${obj.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${obj.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${obj.company}</p>
                <p class="feedback__text">${obj.text}</p>
            </div>
            <p class="feedback__date">${obj.daysAgo === 0 ? "NEW" : `${obj.daysAgo}d`}</p>
        </li>
    `;
  feedsOl.insertAdjacentHTML("afterbegin", feedItem);
}

const toFixedHashtag = obj => {
  const hashtagLi = `
   <li class="hashtags__item">
   <button class="hashtag">${obj.hashtag}</button>
   </li>
   `;
  hashtagUl.insertAdjacentHTML('beforeend', hashtagLi);
}

// -- CONTROL maxlength characters of textarea --
const inputHandel = () => {
  const charTxt = textareaEl.value.length;
  const countOpera = maxChar - charTxt;
  counterEl.textContent = countOpera;
};

textareaEl.addEventListener("input", inputHandel);

// -- START form component --
const submitOpera = (event) => {
  event.preventDefault();
  const text = textareaEl.value;

  if (text.includes("#") && text.length >= 5) {
    showValidate("valid");
  } else {
    showValidate("invalid");
    textareaEl.focus();
    return;
  }

  const hashtag = text.split(" ").find((word) => word.includes("#"));
  const company = hashtag.substring(1).toUpperCase();
  const badgeLetter = company.substring(0, 1);
  const upvoteCount = 0;
  const daysAgo = 0;

  const feedBacks = {
    upvoteCount: upvoteCount,
    badgeLetter: badgeLetter,
    company: company,
    text: text,
    daysAgo: daysAgo
  }
  toFixedComment(feedBacks);

  const hashtags = { hashtag: hashtag, }
  toFixedHashtag(hashtags);

  fetch(`${baseUrl}/feedbacks`, {
    method: 'POST',
    body: JSON.stringify(feedBacks),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (!res.ok) {
      console.log('problem');
      return;
    }
    console.log('successfuly');
  }).catch(error => console.log(error));

  counterEl.textContent = maxChar;
  textareaEl.value = "";
  submit_btnEl.blur();
  loadingEl.remove('spinner');
};

const showValidate = (textCheck) => {
  const className = textCheck == "valid" ? "form--valid" : "form--invalid";
  formEl.classList.add(className);
  setTimeout(() => {
    formEl.classList.remove(className);
  }, timer);
};

formEl.addEventListener("submit", submitOpera);
// -- END form component --


fetch(`${baseUrl}/feedbacks`)
  .then(response => {
    return response.json();
  }).then(data => {
    console.log(data.feedbacks);
    loadingEl.remove('spinner');
    data.feedbacks.forEach(item => toFixedComment(item));
  })
  .catch(err => {
    feedsOl.textContent = `faild to fetch web server; message error:${err}`;
  })


const clickHandlerFBs = event => {
  const eventLi = event.target;
  const upvoteEl = eventLi.className.includes('upvote');
  if (upvoteEl) {
    const upvoteBtn = eventLi.closest('.upvote');
    upvoteBtn.disabled = true;

    const upvoteCountEl = upvoteBtn.querySelector(".upvote__count");
    let upvContect = parseInt(upvoteCountEl.textContent);
    upvoteCountEl.textContent = ++upvContect;
  }
  else {
    eventLi.closest('.feedback').classList.toggle('feedback--expand');
  }
}

feedsOl.addEventListener('click', clickHandlerFBs);


const clickHandlerHTs = event => {
  const eventCase = event.target;
  const hashtagList = eventCase.className.includes('hashtags');
  if (hashtagList) return;

  const companyNameOfHashtags = eventCase.textContent.substring(1).toLowerCase();
  feedsOl.childNodes.forEach(childs => {
    if (childs.nodeName === '#text') return;
    const companyNameOfFeedbacks = childs.querySelector('.feedback__company').textContent.toLowerCase();
    if (companyNameOfHashtags !== companyNameOfFeedbacks) {
      childs.remove();
    }
  })
}

hashtagUl.addEventListener('click', clickHandlerHTs);