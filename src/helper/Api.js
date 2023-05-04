// const INVENTORY_URL = 'https://pantrytracker.herokuapp.com'
// const LOAD_IMAGE_URL = 'https://pantrytracker.herokuapp.com/gallery/'
// const VIEW_IMAGE_URL = 'https://pantrytracker.herokuapp.com/media/'

const INVENTORY_URL = 'http://localhost:8000'
const LOAD_IMAGE_URL = 'http://localhost:8000/gallery/'
const VIEW_IMAGE_URL = 'http://localhost:8000/media/'


const defaultQuery = {
  language: "en-US",
};

const queryString = (obj) => {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join("&");
};

export const loadImageUrl = () =>`${LOAD_IMAGE_URL}`;
export const viewImageUrl = (imgid) =>`${VIEW_IMAGE_URL}/${imgid}`;

export const getInventoryUrl = () =>`${INVENTORY_URL}/inventory`;
export const getAddUpdateInventoryUrl = (newItem, id) => {
  return (newItem ? `${INVENTORY_URL}/inventory/` : `${INVENTORY_URL}/inventory/${id}/`)
};

export const getDeleteInventoryUrl = (id) => `${INVENTORY_URL}/inventory/${id}/`
export const getSearchInventoryUrl = (keyword) =>`${INVENTORY_URL}/search?${queryString({...defaultQuery, ...{query: keyword}})}`;

export const request = async (url) => {
  return fetch(url)
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => {
      // if (error.toString() != 'undefined'){
      // console.error(error);
      // }
    });
};

const handleErrors = (response) => {
  if (!response.ok) throw Error(response.statusText);
  return response;
};

export const requestPantryInventory = (callback, err) => {
  return Promise.all([
    request(getInventoryUrl()),
  ])
    .then((values) => callback(values))
    .catch(err);
};

export const requestSearchInventory = async (keyword) => {
  return await request(getSearchInventoryUrl(keyword));
};
