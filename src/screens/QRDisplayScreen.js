import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QRDisplayScreen() {
  const value = AsyncStorage.getItem('@user_txHash');
  // const obj = JSON.parse(value)
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');
  useEffect(()=>{
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem('@user_txHash');
        if (value) {
          const obj = JSON.parse(value); // parse if you stored an object
          setQrValue(obj.voterID);
        } else {
          Alert.alert('No data found in storage');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load data');
      }
    };

    loadData();
  }, [])

  return (
    <View style={styles.container}>

      {qrValue ? (
        <View style={styles.qrContainer}>
          <QRCode value={qrValue} size={200} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginBottom: 10, paddingHorizontal: 10 },
  qrContainer: { marginTop: 20 },
});
