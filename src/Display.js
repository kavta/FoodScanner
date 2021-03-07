import React from 'react';

import axios from 'axios';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  displayImage: {
    height: 230,
    width: 230,
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  TopBackgroud: {
    borderRadius: 40,
    top: -45,
    position: 'absolute',
    width: '100%',
    height: 345,
  },
  ImageIcon: {
    zIndex: 1,
    justifyContent: 'center',
    top: 130,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderRadius: 125,
    borderWidth: 1,
    overflow: 'hidden',
    height: 250,
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 2,
  },
  ListBackground: {
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'auto',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodNameList: {
    color: '#000000',
    fontSize: 20,
    textAlign: 'left',
  },
  nutrientsName: { fontSize: 20, color: '#000000' },
  nutrientsChart: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 40,
  },
  nutrientsChartContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    paddingBottom: 60,

    flexDirection: 'row',
  },
  pageName: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    fontSize: 30,
    color: '#000000',
  },
  foodName: {
    fontSize: 28,
    marginTop: 140,
    textAlign: 'center',
    color: '#000000',
  },
  calorieData: {
    color: 'yellow',
    fontSize: 20,
    paddingRight: 12,
    textAlign: 'left',
  },
  proteinData: {
    color: 'green',
    fontSize: 20,
    paddingRight: 12,
    textAlign: 'left',
  },
  carboData: {
    color: 'black',
    fontSize: 20,
    paddingRight: 12,
    textAlign: 'left',
  },
  fiberData: {
    color: 'blue',
    fontSize: 20,
    paddingRight: 12,
    textAlign: 'left',
  },
});

const Display = ({ navigation }) => {
  const route = useRoute();
  // console.log(route);
  // console.log(route?.params?.props);
  const calorie = route?.params?.nutrionvalue?.nutrients?.ENERC_KCAL || 50;
  const fat = route?.params?.nutrionvalue?.nutrients?.FAT || 40;
  const carbo = route?.params?.nutrionvalue?.nutrients?.CHOCDF || 20;
  const protein = route?.params?.nutrionvalue?.nutrients?.PROCNT || 15;
  const total = calorie + fat + carbo + protein;
  const chartSize = 50;
  const animationDuration = 3000;

  const handlePress = () => navigation.navigate('Suggested');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.background}>
        <View>
          <LinearGradient
            colors={['#0B80A5', '#373F5F']}
            style={styles.TopBackgroud}
          />
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={handlePress}
              style={{
                top: 50,
                marginRight: 'auto',
                marginLeft: 5,
                position: 'relative',
              }}
            >
              <AntDesign name="arrowleft" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.ImageIcon}>
            <Image
              // source={dummyImage}-->for dummy image
              source={{
                uri: route?.params?.Photo,
              }}
              style={styles.displayImage}
              resizeMode="cover"
            />
          </View>

          <View>
            <Text style={styles.foodName}>{route?.params?.props}</Text>

            <View style={styles.ListBackground}>
              <Text style={styles.foodNameList}>Calorie</Text>

              <View style={styles.chartContainer}>
                <Text style={styles.calorieData}>{calorie}</Text>
                <AnimatedProgressWheel
                  size={chartSize}
                  width={10}
                  color="#AA0000"
                  progress={(calorie / total) * 100}
                  backgroundColor="#F0F0F0"
                  animateFromValue={0}
                  duration={animationDuration}
                />
              </View>
            </View>

            <View style={styles.ListBackground}>
              <Text style={styles.foodNameList}>Protein</Text>

              <View style={styles.chartContainer}>
                <Text style={styles.proteinData}>{protein}</Text>
                <AnimatedProgressWheel
                  size={chartSize}
                  width={10}
                  color="#FFB300"
                  progress={(protein / total) * 100}
                  backgroundColor="#e8dd8e"
                  animateFromValue={0}
                  duration={animationDuration}
                />
              </View>
            </View>

            <View style={styles.ListBackground}>
              <Text style={styles.foodNameList}>Carbohydrate</Text>
              <View style={styles.chartContainer}>
                <Text style={styles.carboData}>{carbo} </Text>
                <AnimatedProgressWheel
                  size={chartSize}
                  width={10}
                  color="#4CAF50"
                  progress={(carbo / total) * 100}
                  backgroundColor="#F0F0F0"
                  animateFromValue={0}
                  duration={animationDuration}
                />
              </View>
            </View>

            <View style={styles.ListBackground}>
              <Text style={styles.foodNameList}>Fat</Text>
              <View style={styles.chartContainer}>
                <Text style={styles.fiberData}>{fat} </Text>
                <AnimatedProgressWheel
                  size={chartSize}
                  width={10}
                  color="#1E57B5"
                  progress={(fat / total) * 100}
                  backgroundColor="#F0F0F0"
                  animateFromValue={0}
                  duration={animationDuration}
                />
              </View>
            </View>
            {/* <View style={styles.nutrientsChartContainer}>
              <View style={styles.nutrientsChart}>
                <Text style={styles.nutrientsName}>Calorie</Text>
                <Text style={styles.data}>{calorie}</Text>
                <AnimatedProgressWheel
                  size={100}
                  width={10}
                  color="yellow"
                  progress={(calorie / total) * 100}
                  backgroundColor="#e8dd8e"
                  animateFromValue={0}
                  duration={4000}
                />
              </View>
              <View style={styles.nutrientsChart}>
                <Text style={styles.nutrientsName}>Protein </Text>
                <Text style={styles.data}>{protein}</Text>
                <AnimatedProgressWheel
                  size={100}
                  width={10}
                  color="#44734f"
                  progress={(protein / total) * 100}
                  backgroundColor="#bfdbc6"
                  animateFromValue={0}
                  duration={4000}
                />
              </View>

              <View style={styles.nutrientsChart}>
                <Text style={styles.nutrientsName}>Fat</Text>
                <Text style={styles.data}>{fat}</Text>
                <AnimatedProgressWheel
                  size={100}
                  width={10}
                  color="blue"
                  progress={(fat / total) * 100}
                  backgroundColor="white"
                  animateFromValue={0}
                  duration={4000}
                />
              </View>

              <View style={styles.nutrientsChart}>
                <Text style={styles.nutrientsName}>Carbo</Text>
                <Text style={styles.data}>{carbo}</Text>
                <AnimatedProgressWheel
                  size={100}
                  width={10}
                  color="blue"
                  progress={(carbo / total) * 100}
                  backgroundColor="white"
                  animateFromValue={0}
                  duration={4000}
                />
              </View>
            </View> */}
          </View>
          {/* </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Display;
