import api from './api.js';
import {renderLoader} from './ui.js';

const templateShows = show => {
    return `
        <div class="card ${show.name ? 'principal' : 'secondary close'}">
            <header class="card-header">
            <h2>${show.name}</h2>
            </header>
            <div class="card-content">
            <div class="card-content-image">
                <a id="selectedBeer" href="/detail/${show.beerId}">
                    <img src="${show.image ? show.image : './img/default-beer.jpg'}">
                </a>
            </div>
            <div class="card-content-text">
                <div class="rating-container">
                <button class="icon">
                    <i class="far fa-heart"></i>
                </button>
                </div>
            </div>
            </div>
        </div>
  `;
};

const renderHomeBeers = async (inputUserSearch) => {
    try {
        renderLoader('hide', 'show');
        const beers = await api.getBeers(inputUserSearch);
        const mainSection = document.querySelector('main');
        renderShows(mainSection, beers);
    } catch (error) {
        throw error;
    }finally{
        renderLoader('show', 'hide');
    }
};

export const renderShows = (element, items) => {
    const htmlShows = items.slice(0,10).map(function (show, index){
        return templateShows({...show});
    }).join('')
    element.innerHTML = `
        <div class="show-section">
            ${htmlShows}
        </div>
    `;
}
  
export default renderHomeBeers;