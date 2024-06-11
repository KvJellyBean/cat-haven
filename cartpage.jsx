import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';

const CartPage = () => {
  const showOverlay = () => {
    // Logic to show overlay
  };

  const hideOverlay = () => {
    // Logic to hide overlay
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.header}>My Cart</Text>
        <ScrollView>
          <View style={styles.item}>
            <Image source={require('./catto.jpeg')} style={styles.animalImage} />
            <View style={styles.details}>
              <Text style={styles.animalName}>Snowflake</Text>
              <Text style={styles.animalType}>Domestic Cat</Text>
              <Text style={styles.price}>Rp. 1.500.000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Image source={require('./catto.jpeg')} style={styles.animalImage} />
            <View style={styles.details}>
              <Text style={styles.animalName}>Snowflake</Text>
              <Text style={styles.animalType}>Domestic Cat</Text>
              <Text style={styles.price}>Rp. 1.500.000</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.adoptionFees}>
          <View style={styles.adoptionFeesHeader}>
            <Text>Adoption Fees:</Text>
            <Text style={styles.adoptionFeePrice}>Rp. 1.500.000</Text>
          </View>
          <View style={styles.totalPriceSection}>
            <Text>Total:</Text>
            <Text style={styles.totalPriceAmount}>Rp. 1.500.000</Text>
          </View>
          <Button title="Adopt" onPress={showOverlay} color="#004AAD" />
        </View>
      </View>
      
      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <Text style={styles.overlayTitle}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            <View style={styles.method}>
              <Image source={require('./appler.png')} style={styles.methodImage} />
              <View style={styles.methodDetails}>
                <Text style={styles.methodName}>Apple ID</Text>
                <Text style={styles.methodInfo}>****4567</Text>
              </View>
            </View>
            <View style={styles.method}>
              <Image source={require('./mstrcard.png')} style={styles.methodImage} />
              <View style={styles.methodDetails}>
                <Text style={styles.methodName}>MasterCard</Text>
                <Text style={styles.methodInfo}>****3289</Text>
              </View>
            </View>
            <View style={styles.method}>
              <Image source={require('./visar.png')} style={styles.methodImage} />
              <View style={styles.methodDetails}>
                <Text style={styles.methodName}>Visa</Text>
                <Text style={styles.methodInfo}>****3092</Text>
              </View>
            </View>
          </View>
          <View style={styles.overlayButtons}>
            <Button title="Continue" onPress={hideOverlay} color="#004AAD" />
            <Button title="Cancel" onPress={hideOverlay} color="#e23c3c" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  rectangle: {
    width: 370,
    height: 700,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    color: '#004AAD',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    fontFamily: 'Arial',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  animalImage: {
    width: '40%',
    height: 95,
    borderRadius: 10,
    marginRight: 20,
  },
  details: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  animalName: {
    fontSize: 17,
    color: '#333',
    fontFamily: 'Arial',
  },
  animalType: {
    marginTop: 5,
    fontSize: 11,
    color: '#666',
    fontFamily: 'Arial',
  },
  price: {
    color: 'black',
    fontSize: 15,
    marginTop: 5,
    fontFamily: 'Arial',
  },
  adoptionFees: {
    textAlign: 'center',
  },
  adoptionFeesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 250,
  },
  adoptionFeePrice: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Arial',
  },
  totalPriceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalPriceAmount: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Arial',
  },
  overlay: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    backgroundColor: 'white',
    padding: 20,
    width: 350,
    height: 500,
    boxSizing: 'border-box',
  },
  overlayTitle: {
    color: '#004AAD',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'column',
    gap: 10,
  },
  method: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodImage: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 5,
  },
  methodDetails: {
    flexDirection: 'column',
  },
  methodName: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Arial',
  },
  methodInfo: {
    fontSize: 14,
    color: '#004AAD',
    fontFamily: 'Arial',
  },
  overlayButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default CartPage;
