
import React from 'react';
import { Image, View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';
const MovieList = ({ data, navigation }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.textContainer}>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 20 }}
          >
            Popular Movies
          </Text>
        </View>

      </View>
      <FlatList
        data={data}
        horizontal
        renderItem={({ item, index }) => <MovieCard movie={item} navigation={navigation} />}
        style={{ marginTop: 10 }}
        keyExtractor={({ id }) => String(id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerContentStyle}
        ItemSeparatorComponent={() => <View style={{ marginEnd: 20 }} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  containerContentStyle: {
    paddingLeft: 16,
    paddingRight: 6,
  },
});
export default MovieList;