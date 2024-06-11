import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import PaymentMethod from "./PaymentMethod"

const CartPageScreen = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Cart</Text>
            <ScrollView style={styles.scrollView}>
                <View style={styles.item}>
                    <Image source={require('../assets/Kucing.jpg')} style={styles.animalImage} />
                    <View style={styles.details}>
                        <Text style={styles.animalName}>Snowflake</Text>
                        <Text style={styles.animalType}>Domestic Cat</Text>
                        <Text style={styles.price}>Rp. 1.500.000</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Image source={require('../assets/food.png')} style={styles.animalImage} />
                    <View style={styles.details}>
                        <Text style={styles.animalName}>Cat Supply</Text>
                        <Text style={styles.animalType}>Free Cat Supply</Text>
                        <Text style={styles.price}>Free</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.adoptionFeesHeader}>
                <Text style={styles.adoptionFeePrice}>Adoption Fees:</Text>
                <Text style={styles.adoptionFeePrice}>Rp. 1.500.000</Text>
            </View>
            <View style={styles.adoptionFees}>
                <View style={styles.totalPriceSection}>
                    <Text style={styles.totalPriceAmount}>Total:</Text>
                    <Text style={styles.totalPriceAmount}>Rp. 1.500.000</Text>
                </View>
                <Button title="Adopt" onPress={toggleModal} color="#004AAD" style={styles.adoptButton} />
            </View>

            <PaymentMethod isVisible={isModalVisible} onHide={toggleModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    header: {
        paddingTop: 40,
        color: '#004AAD',
        textAlign: 'center',
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollView: {
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    animalImage: {
        width: 180,
        height: 120,
        borderRadius: 10,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    animalName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    animalType: {
        fontSize: 16,
        color: '#666',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 40,
    },
    adoptionFees: {
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingTop: 20,
    },
    adoptionFeesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    adoptionFeePrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalPriceSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalPriceAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 30,
    },
    adoptButton: {
        borderRadius: 20,
    },
});

export default CartPageScreen;
