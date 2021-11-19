import { Dimensions } from 'react-native';

export default class Constants {
    static URL = {
        MAIN_URL: "https://api.themoviedb.org/3/",
        IMAGE_URL: "https://image.tmdb.org/t/p/w185",
        API_KEY: "api_key=308678006329cacb0db0d1a77819e0d2",
      
}   
    static Dimensions ={
        screenWidth:Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height
    }
}