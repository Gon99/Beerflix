import { replace } from './ui.js';
import renderHomeBeers from './shows.js';
import storage from './storage.js';

export const INPUT_STORAGE_ID = 'navbar-input';
export const STORAGE_TYPE = 'lStorage';

const {setItem, getItem} = storage(STORAGE_TYPE);

const navbar = document.querySelector('#navbar');
const searchIcon = document.querySelector('#navbar-search');
const closeIcon = document.querySelector('#navbar-close');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#navbar .input.search');

const handleNavbar = replace(navbar);

searchIcon.addEventListener('click', evt =>{
    handleNavbar('no-search', 'search');
});

closeIcon.addEventListener('click', () =>{
    handleNavbar('search', 'no-search');
});

searchForm.addEventListener('submit', evt =>{
    evt.preventDefault();
    if(searchInput.validity.valid){
        renderHomeBeers(searchInput.value);
        setItem(INPUT_STORAGE_ID, searchInput.value);
    }
});