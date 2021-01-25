/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Title,
  Text,
  Spinner,
  Middle,
} from 'native-base';
import Geolocation from '@react-native-community/geolocation';

navigator.geolocation = require('@react-native-community/geolocation');
import * as geolib from 'geolib';

import Eat from './component/Eat';

const PLACE_RADIUS = '1500';
const PLACE_TYPE = 'restaurant';
const API_KEY = 'AIzaSyCNyHiF3DCqV7E_9d-7_iLdH7am_qajk5E';

export default function App() {
  const [nearbyPlaces, setNearbyPlaces] = useState(null);
  const [positionObject, setPositionObject] = useState({});
  const [onEat, setOnEat] = useState(false);
  const [loading, setLoading] = useState(true);
  function fetchLocations() {
    Geolocation.getCurrentPosition(
      (position) => {
        setPositionObject(position.coords);
        //59.34087030539023
        //18.041748516386495
        //position.coords.latitude
        //position.coords.longitude

        const latitude = 59.34087030539023;
        const longitude = 18.041748516386495;

        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${PLACE_RADIUS}&type=${PLACE_TYPE}&keyword=cruise&key=${API_KEY}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setNearbyPlaces(data.results);
            setLoading(false);
          });
      },
      (error) => console.log(new Date(), error),
      {enableHighAccuracy: false, timeout: 10000, maximumAge: 3000},
    );
  }
  useEffect(() => {
    fetchLocations();
  }, []);

  function renderOnScreen() {
    let render = null;

    if (loading) {
      render = <Spinner color="green" />;
    } else {
      if (onEat) {
        render = (
          <Eat
            setOnEat={setOnEat}
            nearbyPlaces={nearbyPlaces}
            positionObject={positionObject}
          />
        );
      } else {
        render = (
          <View style={{alignSelf: 'center', justifyContent: 'center'}}>
            <Button
              style={{borderRadius: 10}}
              block
              large
              dark
              onPress={() => setOnEat(true)}>
              <Text>Where shall i eat?</Text>
            </Button>
          </View>
        );
      }
    }
    return render;
  }
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon type="MaterialIcons" name="menu" />
          </Button>
        </Left>

        <Body>
          <Title>Hungry?</Title>
        </Body>
      </Header>
      <Content contentContainerStyle={{flex: 1, flexGrow: 1}}>
        <View style={styles.main}>
          <View style={{flex: 1}}>{renderOnScreen()}</View>
        </View>
      </Content>
      <Footer style={{alignItems: 'center'}}>
        <Text>Copyright</Text>
      </Footer>
    </Container>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  randomizeButton: {
    flex: 1,
    alignSelf: 'center',
    margin: 20,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: 'gray',
    borderRadius: 50,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
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
