import React from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getMovieList } from '../../redux/actions/actions';
import { connect } from 'react-redux';
import Services from '../../services/Services';
import MovieList from './components/MovieList';
import { SearchBar } from 'react-native-elements';
import Loader from '../shared/Loader';
import Constants from '../../utilities/Constants';

const popcorn = require('../../images/popcorn.png')

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: this.props.store.movieList, //THe list of movies 
            searchValue: '', // Text used for searching,
            isConnected: false,
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerMode: 'none',
            headerShown: false
        }
    };
    componentDidMount() {
        this.checkConnection()
    }
    //Here it's checked if the app has an internet connection also it will run based on the info from redux
    checkConnection() {
        Services.getConnectionStatus().then(response => {
            if (response) {
                this.setState({ isConnected: response.isConnected }, () => {
                    this.getMovieList();
                });
            }
        })
    }
    getMovieList() {
        const { isConnected } = this.state;
        if (isConnected) {
            this.props.getMovieList();
        }
        else {
            Alert.alert(
                "Internet connection problem",
                "The app will run in offline mode",
            );
        }
    }
    //Function for searching movies based on your input in the searchbar,
    //if the connection is false, then movies from local redux will be filtered
    onSearch(text) {
        const { isConnected } = this.state;
        this.setState({ searchValue: text }, () => {
            if (isConnected) {
                if (text !== '') {
                    Services.searchMovie(text).then(response => {
                        if (response.results) {
                            this.setState({ movieList: response.results })
                        }
                    })
                } else {
                    const { movieList } = this.props.store;
                    this.setState({ movieList: movieList })
                }
            }
            else {
                let newMovieList = this.props.store.movieList.filter((item) => {
                    return item.original_title.toLowerCase().includes(text.toLowerCase());
                })
                this.setState({ movieList: newMovieList });
            }
        })
    }
    //Function called when you clear the input from searchbar
    onClear() {
        const { movieList } = this.props.store;
        this.setState({ movieList: movieList, searchValue: '' })
    }
    render() {
        const { movieList, searchValue, isConnected } = this.state;
        const { navigation } = this.props;
        const { loading } = this.props.store;
        return (
            <View style={styles.container}>
                <Loader loading={loading} />
                <SearchBar
                    round={true}
                    placeholder="Type Here..."
                    onChangeText={(text) => { this.onSearch(text) }}
                    onClear={() => { this.onClear() }}
                    value={searchValue}
                />
                <View elevation={5} style={styles.secondContainer}>
                    {movieList.length > 0 ?
                        <MovieList isConnected={isConnected}
                            search={searchValue !== '' ? true : false}
                            data={movieList} navigation={navigation}></MovieList>
                        :
                        <Text style={{ textAlign: "center" }}>No data found.</Text>}
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={popcorn}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    secondContainer: {
        height: Constants.Dimensions.screenHeight / 2,
        paddingTop: 20,
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    image: {
        width: 120,
        height: 120,
    },
    imageContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        elevation: 5,
    },
    container: {
        flex: 1,
    },
});

//Used these two functions to fetch the store and our function into props
const mapStateToProps = (appState) => {
    const store = appState;
    return { store };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMovieList: () => dispatch(getMovieList()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);