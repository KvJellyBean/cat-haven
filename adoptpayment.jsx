import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';

const CartPage = () => {
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const showOverlay = () => {
    setOverlayVisible(true);
  }

  const hideOverlay = () => {
    setOverlayVisible(false);
  }

  const submitForm = () => {
    // Tambahkan logika untuk menangani pengiriman formulir di sini
    Alert.alert('Form submitted!');
    hideOverlay();
  }

  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.title}>My Cart</Text>
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
        <View style={styles.adoptionFees}>
          <View style={styles.adoptionFeesHeader}>
            <Text>Adoption Fees:</Text>
            <Text style={styles.adoptionFeePrice}>Rp. 1.500.000</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.totalPriceSection}>
            <Text>Total:</Text>
            <Text style={styles.totalPriceAmount}>Rp. 1.500.000</Text>
          </View>
          <TouchableOpacity style={styles.adoptButton} onPress={showOverlay}>
            <Text style={styles.adoptButtonText}>Adopt</Text>
          </TouchableOpacity>
        </View>
      </View>
      {overlayVisible && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayTitle}>Payment Form</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name on Card"
              value={nameOnCard}
              onChangeText={setNameOnCard}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />
            <View style={styles.expiryCvv}>
              <View style={styles.expiry}>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                />
              </View>
              <View style={styles.cvv}>
                <TextInput
                  style={styles.input}
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Postal Code"
              value={postalCode}
              onChangeText={setPostalCode}
              keyboardType="numeric"
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.continueButton} onPress={submitForm}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={hideOverlay}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  rectangle: {
    width: 370,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: '#004AAD',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
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
  },
  animalType: {
    fontSize: 11,
    color: '#666',
  },
  price: {
    color: 'black',
    fontSize: 15,
    marginTop: 5,
  },
  adoptionFees: {
    textAlign: 'center',
    marginTop: 20,
  },
  adoptionFeesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  adoptionFeePrice: {
    fontSize: 14,
    color: 'black',
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  totalPriceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalPriceAmount: {
    fontSize: 14,
    color: 'black',
  },
  adoptButton: {
    backgroundColor: '#004AAD',
    padding: 12,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  adoptButtonText: {
    color: 'white',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 350,
    alignItems: 'center',
  },
  overlayTitle: {
    color: '#004AAD',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  expiryCvv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  expiry: {
    flex: 1,
    marginRight: 5,
  },
  cvv: {
    flex: 1,
    marginLeft: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  continueButton: {
    backgroundColor: '#004AAD',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CartPage;
