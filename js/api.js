const API_KEY = "34F0VPA-JAYMR77-MR6AV99-ZKWFAMB";
const API_URL = "https://beerflix-api.herokuapp.com/api/v1";

const getBeers = async (inputUserSearch) => {
    try {
        const URL = inputUserSearch ? `${API_URL}/beers?search=${inputUserSearch}` : `${API_URL}/beers`;
        const response = await fetch(URL,{
            method: 'GET',
            headers: {
                'X-API-KEY' : API_KEY
            }
        });
        if (!response.ok){
            throw new Error("Error getting beers");
        }
        const data = await response.json();
        const beers = data.beers.map(result =>{
            if(result.firstBrewed.includes(inputUserSearch)){
                return result;
            }
            if(result.beers){
                return result.beers;
            }
            return result;
        });
        return beers;
    }catch (error){
        throw error;
    }
}

const getBeerDetail = async (id) => {
    try {
        const response = await fetch(`${API_URL}/beers/${id}`, {
            method: 'GET',
            headers: {
                'X-API-KEY' : API_KEY
            }
        });
        if (!response.ok){
            throw new Error("The selected beer doesnt exist");
        }
        const data = await response.json();
        return data.beer;
    }catch (error){
        throw error;
    }
}

const createComment = async (id, text) => {
    try {
        const response = await fetch(`${API_URL}/beers/${id}/comment`,{
            method: 'POST',
            body: JSON.stringify({ comment: text}),
            headers: {
                'Content-type': 'application/json',
                'X-API-KEY' : API_KEY
            }
        })
        if(!response.ok){
            throw new Error("Critical error creating comment");
        }
        const result = await response.json();
        return result;
    }catch(error){
        throw error;
    }
}

const getComments = async (id) => {
    try {
        const response = await fetch(`${API_URL}/beers/${id}/comment`,{
            method: 'POST',
            headers: {
                'X-API-KEY': API_KEY
            }
        })
        if(!response.ok){
            throw new Error("Error getting the comments")
        }
        const result = await response.json();
        return result;
    }catch(error){
        throw error;
    }
}

export default {getBeers, getBeerDetail, createComment, getComments};