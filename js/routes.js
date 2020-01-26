import renderHomeBeers from './shows.js';
import detail from './detail.js';
import storage from './storage.js';
import { INPUT_STORAGE_ID, STORAGE_TYPE } from './navbar.js';

const {getItem} = storage(STORAGE_TYPE);

page('/', () => {
    console.log("Home");
    renderHomeBeers();
});

page('/detail/:id', (ctx) => {
    const { params: {id} } = ctx;
    detail.getSelectedBeer(id);
});
page();