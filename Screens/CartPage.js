import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';

export default function CartPageScreen(){
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.header}>My Cart</Text>
        <ScrollView>
          <View style={styles.item}>
            <Image source={require('../assets/Kucing2.jpg')} style={styles.animalImage} />
            <View style={styles.details}>
              <Text style={styles.animalName}>Snowflake</Text>
              <Text style={styles.animalType}>Domestic Cat</Text>
              <Text style={styles.price}>Rp. 1.500.000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Image source={require('../assets/Kucing2.jpg')} style={styles.animalImage} />
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
      
      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <Text style={styles.overlayTitle}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            <View style={styles.method}>
              <Image source={require('../assets/apple.jpg')} style={styles.methodImage} />
              <View style={styles.methodDetails}>
                <Text style={styles.methodName}>Apple ID</Text>
                <Text style={styles.methodInfo}>****4567</Text>
              </View>
            </View>
            <View style={styles.method}>
              <Image source={require('../assets/mastercard.png')} style={styles.methodImage} />
              <View style={styles.methodDetails}>
                <Text style={styles.methodName}>MasterCard</Text>
                <Text style={styles.methodInfo}>****3289</Text>
              </View>
            </View>
            <View style={styles.method}>
              <Image source={require('../assets/visa.png')} style={styles.methodImage} />
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
}


const styles = StyleSheet.create({

})