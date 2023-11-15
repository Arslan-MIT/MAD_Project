import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { app } from './firebase';
import { getDatabase, ref, onValue, set } from 'firebase/database';

const FastFoodCard = () => {
  const [fastFoodData, setFastFoodData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const fastFoodRef = ref(db, 'fastFood');

      onValue(fastFoodRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataArray = Object.values(data);
          setFastFoodData(dataArray);
        }
      });
    };

    fetchData();
  }, []);

  const toggleFavorite = (itemId) => {
    const db = getDatabase(app);
    const databaseRef = ref(db, `fastFood/${itemId}`);

    try {
      // Check if the item price is less than or equal to 1400
      if (fastFoodData[itemId].price <= 1400) {
        // Update the price to 1800 in the database
        set(databaseRef, {
          ...fastFoodData[itemId],
          price: 1800,
          isFavorite: !fastFoodData[itemId].isFavorite,
        });
      } else {
        // Update isFavorite
        set(databaseRef, {
          ...fastFoodData[itemId],
          isFavorite: !fastFoodData[itemId].isFavorite,
        });
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>

        <Image source={{ uri: item.image }} style={styles.foodImage} />
        <View style={styles.foodDetails}>
          <Text style={styles.foodTitle}>{item.title}</Text>
          <Text style={styles.foodPrice}>${item.price}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item.key)}>
          <Icon
            name={item.isFavorite ? 'heart' : 'heart-o'}
            size={30}
            color={item.isFavorite ? 'red' : '#f5f5f5'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Fast Food</Text>
      <FlatList
        data={fastFoodData}
        keyExtractor={(item) => item.key.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        horizontal={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 60,
  },
  listContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
    alignContent: 'center',
    height: 110,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 320,
    marginRight: 10,
  },
  foodDetails: {
    flex: 1,
    marginLeft: 10,
  },
  foodImage: {
    width: 120,
    height: 70,
    borderRadius: 10,
    shadowColor: '#000',
    overflow: 'hidden',

  },
  foodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: "#05a",
  },
  foodPrice: {
    fontSize: 16,
    marginTop: 5,
    color: "#1a1a1a"
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#05a',
  },
});

export default FastFoodCard;
