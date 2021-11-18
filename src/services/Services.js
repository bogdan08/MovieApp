import Constants from "../utilities/Constants"
import NetInfo from "@react-native-community/netinfo";

export default class Services {
    //Service used for searching movie
    static searchMovie = (text) => {
        return new Promise((resolve, reject) => {
            try {
                fetch(Constants.URL.MAIN_URL+'search/movie?'+Constants.URL.API_KEY+'&query='+text)
                    .then(response => resolve(response.json()))
            }
            catch (err) {
                reject(err)
            }
        })
    }
    //Service used for fetching movie details
    static getMovieDetails = (id) => {
        return new Promise((resolve, reject) => {
            try {
                fetch(Constants.URL.MAIN_URL+'movie/' + id + '?'+Constants.URL.API_KEY)
                    .then(response => resolve(response.json()))
            }
            catch (err) {
                reject(err)
            }
        })
    }
    //Service used for fetching movie list
    static getMovieList = () => {
        return new Promise((resolve, reject) => {
            try {
                fetch(Constants.URL.MAIN_URL+'movie/top_rated?'+Constants.URL.API_KEY)
                    .then(response => resolve(response.json()))
            }
            catch (err) {
                reject(err)
            }
        })
    }
    //Service used for fetching connection status
    static getConnectionStatus = () => {
        return new Promise((resolve, reject) => {
            try {
                NetInfo.fetch().then(response => resolve(response))
            }
            catch (err) {
                reject(err)
            }
        })
    }
}