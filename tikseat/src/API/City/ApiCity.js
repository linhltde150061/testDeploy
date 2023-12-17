import { URL_CITY, URL_DISTRICT } from "../ConstAPI"
import axiosCity from "./AxiosCity"

const ApiCity = {
    getCity() {
        return axiosCity.get(URL_CITY);
    },
    getDistrict(code) {
        return axiosCity.get(`p/${code}${URL_DISTRICT}`)
    },
    getWards(code) {
        return axiosCity.get(`d/${code}${URL_DISTRICT}`)
    }
}

export default ApiCity;
