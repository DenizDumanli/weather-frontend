import axios from 'axios'

const BASE_API_URL = "http://localhost:5000/country"

class geoService{
    getCountryInfos(){
        return axios.get(BASE_API_URL);
    }
}

export default new geoService()