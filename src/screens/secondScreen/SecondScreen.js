import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Image } from 'react-native';
import Services from '../../services/Services';
import Constants from '../../utilities/Constants';
import { connect } from 'react-redux';

class SecondScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.navigation.getParam('movie'), //Movie details
      loading: false, //Used for the loader to be shown
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
    const { movie } = this.state;
    const { isConnected } = this.props.store;
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
  render() {
    const { movie } = this.state;
    const url = movie.poster_path ? Constants.URL.IMAGE_URL + movie.poster_path : Constants.URL.PLACEHOLDER_IMAGE;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView style={styles.movieCard} showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.image}
              source={{
                uri: url
              }}
            />
            <Text style={{ fontSize: 16, margin: 5, fontWeight: "bold" }}>{movie.original_title}</Text>
          </View>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Text style={{ flex: 0.5 }}>Status</Text>
            <Text style={{ flex: 0.5 }}>{movie.status}</Text>
          </View>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Text style={{ flex: 0.5 }}>Ratings</Text>
            <Text style={{ flex: 0.5 }}>
              {movie.vote_average}
              /10
            </Text>
          </View>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Text style={{ flex: 0.5 }}>Popularity</Text>
            <Text style={{ flex: 0.5 }}>{movie.popularity}%</Text>
          </View>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Text style={{ flex: 0.5 }}>Budget</Text>
            <Text style={{ flex: 0.5 }}>${movie.budget}</Text>
          </View>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Text style={{ flex: 0.5 }}>Revenue</Text>
            <Text style={{ flex: 0.5 }}>${movie.revenue}</Text>
          </View>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Text style={{ flex: 0.5 }}>Runtime</Text>
            <Text style={{ flex: 0.5 }}>{movie.runtime} min</Text>
          </View>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Text style={{ flex: 0.5 }}>Language</Text>
            <Text style={{ flex: 0.5 }}>{movie.original_language}</Text>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ flex: 0.2 }}>Overview</Text>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ flexWrap: "wrap", flex: 0.8 }}>{movie.overview}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  movieCard: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "white",
    elevation: 10
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