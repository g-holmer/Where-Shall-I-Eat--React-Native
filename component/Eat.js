import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Container, Header, Content, Button, Text} from 'native-base';
import * as geolib from 'geolib';

export default function Eat({positionObject, nearbyPlaces, setOnEat}) {
  let randomPlace = null;

  if (nearbyPlaces) {
    const randomIndex = Math.floor(
      Math.random() * Math.floor(nearbyPlaces.length),
    );
    randomPlace = nearbyPlaces[Object.keys(nearbyPlaces)[randomIndex]];
  }

  return (
    <View style={styles.places}>
      <Button
        block
        large
        dark
        style={{alignSelf: 'center', marginTop: 50, borderRadius: 10}}
        onPress={() => setOnEat(false)}>
        <Text>Go Back</Text>
      </Button>
      <View>
        {randomPlace && (
          <View
            style={{
              padding: 10,
              borderWidth: 2,
              borderColor: '#20232a',
              borderRadius: 6,
              backgroundColor: '#f3d3',
            }}>
            <Text style={styles.title}>{randomPlace.name}</Text>
            <Text style={styles.distance}>
              (
              {geolib.getDistance(positionObject, {
                latitude: randomPlace.geometry.location.lat,
                longitude: randomPlace.geometry.location.lng,
              })}{' '}
              meters away){' '}
            </Text>
          </View>
        )}
      </View>
      <View></View>
    </View>
  );
}
const styles = StyleSheet.create({
  places: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  distance: {
    color: '#20232a',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
