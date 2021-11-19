import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Image } from 'react-native';
import Services from '../../services/Services';
import Constants from '../../utilities/Constants';
import { connect } from 'react-redux';
import Loader from '../shared/Loader';

const placeholder = require('../../images/placeholder.png') //default image

class SecondScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.navigation.getParam('movie'), //Movie details
      loading: false, //Used for the loader to be shown
      isConnected: this.props.navigation.getParam('isConnected')
    };
  }
  static navigationOptions = {
    title: 'Details Screen',
    headerStyle: {
      backgroundColor: '#383f42',
    },
    headerTintColor: '#fff',
  };

  componentDidMount() {
    this.checkConnection();
  }
  //Here it's checked if the app has an internet connection also it will run based on the info from redux
  checkConnection() {
    const { movie, isConnected } = this.state;

    if (isConnected) {
      this.getMovieDetails(movie.id)
    }
  }
  //Function for fetching movie details based on the ID of the movie
  getMovieDetails(id) {
    this.setState({ loading: true }, () => {
      Services.getMovieDetails(id).then(response => {
        this.setState({ movie: response, loading: false })
      })
    })
  }
  showDetails(firstText, secondText, check) {
    if (check) {
      return (
        <View style={styles.textContainer}>
          <Text style={styles.text}>{firstText}</Text>
          <Text style={styles.text}>{secondText}</Text>
        </View>
      )
    }
  }
  render() {
    const { movie, loading } = this.state;
    const url = movie.poster_path ? Constants.URL.IMAGE_URL + movie.poster_path : null
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Loader loading={loading} />
        <ScrollView style={styles.movieCard} elevation={5} showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.image}
              source={movie.poster_path ? { uri: url } : placeholder}
            />
            <Text style={{ fontSize: 16, margin: 5, fontWeight: "bold" }}>{movie.original_title}</Text>
          </View>
          {this.showDetails('Status', movie.status, movie.status)}

          {this.showDetails('Ratings', movie.vote_average + '/10', movie.vote_average)}

          {this.showDetails('Popularity', movie.popularity + '%', movie.popularity)}

          {this.showDetails('Budget', '$' + movie.budget, movie.budget)}

          {this.showDetails('Revenue', '$' + movie.revenue, movie.revenue)}

          {this.showDetails('Runtime', movie.runtime, movie.runtime)}

          {this.showDetails('Language', movie.original_language, movie.original_language)}

          {movie.overview &&
            <View>
              <View style={{ margin: 10 }}>
                <Text style={{ flex: 0.2 }}>Overview</Text>
              </View>
              <View style={{ margin: 10 }}>
                <Text style={{ flexWrap: "wrap", flex: 0.8 }}>{movie.overview}</Text>
              </View>
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    margin: 10
  },
  text: {
    flex: 0.5
  },
  movieCard: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
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
    width: 160,
    height: 220,
    marginLeft: 5,
    margin: 20
  }
});
//Used these two functions to fetch the store into props
const mapStateToProps = (appState) => {
  const store = appState;
  return { store };
}
export default connect(mapStateToProps)(SecondScreen);