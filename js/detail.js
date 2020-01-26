import api from './api.js';
import {renderLoader} from './ui.js';

const detailTemplate = beer => `
  <div class="detail-section">
    <header id="${beer.name}">
      <div class="title-section">
        <h1>${beer.name}</h1>
      </div>
      <div class="image-container">
        <img src="${beer.image ? beer.image : '/img/default-beer.jpg'}" />
      </div>
    </header>
    <h3 id="description">Description: </h3>
    <div class="content">
      <p>${beer.description}</p>
      <p>First Brewed: ${beer.firstBrewed}</p>
    </div>
  </div>
`;

const commentFormTemplate = `
  <div id="detail" class="detail-content"></div>
  <div class="quotes-list">
    <h2>Quotes</h2>
    <div id="quoteList">
    </div>
  </div>
  <form id="quote-form" method="POST" class="quote-form" novalidate>
    <div class="quote-input">
      <label for="quote">Write your opinion about this beer</label>
      <input name="kevin" required id="quote" placeholder="Add your quote" class="input primary" type="text">
    </div>
    <button type="submit" class="button primary">Add quote</button>
  </form>
`;

const commentTemplate = ({ comment, dateComment }) => `
  <div class="list-item">
    <p>${comment}</p>
    <span>${dateComment}</span>
  </div>
`;


const renderComment = id => {
  const formSection = document.querySelector("#detailSection");
  formSection.innerHTML = commentFormTemplate;
  const commentForm = document.querySelector("#quote-form");
  const commentList = document.querySelector("#quoteList");
  const commentInput = document.querySelector("#quote");
  commentForm.addEventListener('submit', async evt => {
    evt.preventDefault();
    if(commentInput.validity.valid){
      const result = await api.createComment(id, commentInput.value);
      const currentDate = new Date();
      const currentDateFormatted = (currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth()+1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2) + "T" + currentDate.getHours() +":"+ currentDate.getMinutes() +":"+ currentDate.getSeconds()+":"+currentDate.getMilliseconds()+"Z");
      commentList.innerHTML += commentTemplate({
        comment: commentInput.value,
        dateComment: currentDateFormatted
      });
      commentInput.value = '';
    }
  });
}

const getSelectedBeer = async (id) => {
  try {
    renderLoader('hide', 'show');
    const beerDetail = await api.getBeerDetail(id);
    const template = detailTemplate(beerDetail);
    const mainSection = document.querySelector('main');
    renderComment(id);
    const commentList = document.querySelector("#quoteList");
    commentList.innerHTML = beerDetail.comments.map(commentTemplate).join('');
    mainSection.innerHTML = template;
  } catch(error){
    throw error;
  }finally{
    renderLoader('show', 'hide');
  }
}

export default {getSelectedBeer, renderComment};
