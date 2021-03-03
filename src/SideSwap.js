import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import Chicken from '../assets/Chicken.png';
import Pizza from '../assets/Pizza.png';
import Avocado from '../assets/Avocado.png';
import SideSwipe from 'react-native-sideswipe';
import { Card } from 'react-native-elements';

const { width } = Dimensions.get('window');
const data = [Chicken, Pizza, Avocado];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    width: 250,
    maxHeight: 500,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    width: 200,
    height: 300,
  },
});

const SideSwap = () => {
  return (
    <View style={styles.container}>
      <Text>Food you may Like!!</Text>
      <SideSwipe
        data={data}
        style={styles.carousel}
        itemWidth={width}
        threshold={120}
        contentOffset={0}
        renderItem={({ item }) => (
          <View style={{ width, paddingHorizontal: 10 }}>
            <Card title="Local Modules" Style={styles.cardContainer}>
              <Image source={item} style={{ height: 200, width: 180 }} />
            </Card>
          </View>
        )}
      />
    </View>
  );
};

export default SideSwap;
