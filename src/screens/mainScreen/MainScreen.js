import React from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getMovieList, getInternetConnection } from '../../redux/actions/actions';
import { connect } from 'react-redux';
import Services from '../../services/Services';
import MovieList from './components/MovieList';
import { SearchBar } from 'react-native-elements';
import Loader from '../shared/Loader';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: this.props.store.movieList || [], //THe list of movies 
            seachValue: '', // Text used for searching
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerMode: 'none',
            headerShown: false
        }
    };
    componentDidMount() {
        setTimeout(() => this.checkConnection())
    }
    //Here it's checked if the app has an internet connection also it will run based on the info from redux
    checkConnection() {
        this.props.getInternetConnection();
        if (this.props.store.isConnected) {
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
        const { isConnected } = this.props.store;
        this.setState({ searchValue: text }, () => {
            if (isConnected) {
                Services.searchMovie(text).then(response => {
                    if (response.results) {
                        this.setState({ movieList: response.results })
                    }
                })
            }
            else {
                let newMovieList = this.props.store.movieList.filter((item) => {
                    return item.original_title.includes(text);
                })
                this.setState({ movieList: newMovieList });
            }
        })
    }
    //Function called when you clear the input from searchbar
    onClear() {
        const { movieList } = this.props.store;
        const { isConnected } = this.props.store;
        if (isConnected) {
            this.props.getMovieList();
        }
        this.setState({ movieList: movieList })
    }
    render() {
        const { movieList, searchValue } = this.state;
        const { navigation } = this.props;
        const { loading } = this.props.store;
        return (
            <View style={styles.container}>
                <Loader loading={loading} />
                <View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={(text) => { this.onSearch(text) }}
                        onClear={() => { this.onClear() }}
                        value={searchValue}
                    />
                    <MovieList data={movieList} navigation={navigation}></MovieList>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
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
        getInternetConnection: () => dispatch(getInternetConnection()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);