import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  Share
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const QRDisplayScreen = ({ route, navigation }) => {
  const { centerInfo } = route.params || {};
  const { user, updateVotingHistory } = useAuth();
  
  // Generate a unique voting token
  // In a real app, this would be cryptographically secure and verified by the backend
  const generateVotingToken = () => {
    const timestamp = new Date().getTime();
    const randomPart = Math.random().toString(36).substring(2, 10);
    return `${user.id}-${timestamp}-${randomPart}`;
  };
  
  // Create the voting data to be encoded in the QR code
  const votingData = {
    voterId: user?.id,
    voterName: user?.name,
    votingCenter: centerInfo?.centerName || user?.votingCenter,
    timestamp: new Date().toISOString(),
    token: generateVotingToken(),
  };
  
  // Convert the voting data to a JSON string for the QR code
  const qrCodeData = JSON.stringify(votingData);
  
  useEffect(() => {
    // In a real app, we would verify the voting center with the backend here
    // For demo purposes, we'll just show an alert
    Alert.alert(
      'Verification Successful', 
      `You are verified to vote at ${centerInfo?.centerName || user?.votingCenter}. Please show this QR code to the voting official.`
    );
  }, []);
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'My voting verification QR code',
        // In a real app, we would generate a shareable image or link
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share the QR code');
    }
  };
  
  const handleDone = () => {
    // Simulate updating voting history
    updateVotingHistory({
      electionName: centerInfo?.electionName || 'General Election',
      location: centerInfo?.centerName || user?.votingCenter,
    });
    
    // Navigate back to dashboard
    navigation.navigate('MainTabs');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Voting QR Code</Text>
        <Text style={styles.subtitle}>
          Present this code to the voting official to verify your identity
        </Text>
        
        <View style={styles.qrContainer}>
          {/* Main QR Code */}
          <QRCode
            value={qrCodeData}
            size={250}
            color="#000"
            backgroundColor="#FFF"
          />
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{user?.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Voting Center:</Text>
            <Text style={styles.infoValue}>{centerInfo?.centerName || user?.votingCenter}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>{new Date().toLocaleDateString()}</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color="white" />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  shareButton: {
    backgroundColor: '#4630EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QRDisplayScreen;