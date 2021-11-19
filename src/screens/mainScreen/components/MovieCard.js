
import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import Constants from '../../../utilities/Constants';

const placeholder = require('../../../images/placeholder.png')//default image

const MovieCard = ({ movie, isConnected, navigation }) => {

  const url = movie.poster_path ? Constants.URL.IMAGE_URL + movie.poster_path : null
  return (
    <View style={{ width: 130 }}>
      <TouchableOpacity onPress={() => navigation.navigate('SecondScreen', { movie: movie, isConnected: isConnected })}>
        <Image
          style={{ width: 120, height: 170, borderRadius: 5 }}
          source={movie.poster_path ? { uri: url } : placeholder}
          resizeMode="stretch"
        />
        <View
          style={{ paddingHorizontal: 5, alignItems: 'center', marginTop: 8 }}
        >
          <Text small bold numberOfLines={1}>
            {movie.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default MovieCard;