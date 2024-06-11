import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal, Pressable } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./assets/catto.jpeg')} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.petName}>Snowflake</Text>
          <View style={styles.iconContainer}>
            {/* Add icons here using Image or similar */}
          </View>
        </View>
        <Text style={styles.petType}>Cat</Text>
        <View style={styles.petLocation}>
          <Text>New York City, NY</Text>
          <Text>1234 Park Avenue, NY 10001</Text>
        </View>
        <View style={styles.petInfo}>
          <Text style={styles.infoHeader}>Details</Text>
          <Text>Sex: Male</Text>
          <Text>Age: 3 years</Text>
          <Text>Weight: 10 kg</Text>
        </View>
        <View style={styles.petAbout}>
          <Text style={styles.aboutHeader}>About</Text>
          <Text style={styles.aboutText}>
            Snowflake is a friendly cat who loves to play with yarn and go for long walks. He is good with kids and other pets. He is looking for a loving home where he can get lots of attention and exercise.
          </Text>
        </View>
        <TouchableOpacity style={styles.adoptButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Adopt Pet</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Pressable style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>
          <Text style={styles.formTitle}>Adoption Form</Text>
          <ScrollView style={styles.form}>
            <TextInput style={styles.input} placeholder="First Name" />
            <TextInput style={styles.input} placeholder="Last Name" />
            <TextInput style={styles.input} placeholder="Date of Birth" keyboardType="date" />
            <TextInput style={styles.input} placeholder="Type of Pet" />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Address" />
            <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Do You Have Children?" />
            <TouchableOpacity style={styles.submitButton} onPress={() => alert('Form Submitted')}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f9',
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    overflow: 'hidden',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  petName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  petType: {
    marginTop: 5,
    fontSize: 11,
  },
  petLocation: {
    marginTop: 5,
    fontSize: 11,
    flexDirection: 'row',
    gap: 5,
  },
  petInfo: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  infoHeader: {
    fontSize: 14,
    color: '#004AAD',
    marginBottom: 5,
  },
  petAbout: {
    marginTop: 10,
    marginBottom: 20,
  },
  aboutHeader: {
    fontSize: 23,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 11,
    lineHeight: 1.5,
  },
  adoptButton: {
    backgroundColor: '#004AAD',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 35,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 20,
    color: '#e23c3c',
  },
  formTitle: {
    color: '#004AAD',
    fontSize: 17,
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: '#004AAD',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
