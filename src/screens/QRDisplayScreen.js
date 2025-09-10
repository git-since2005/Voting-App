import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  Share,
  FlatList,
  ScrollView,
  Modal,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import QRCode from 'react-native-qrcode-svg';

const QRDisplayScreen = ({ route, navigation }) => {
  const { centerInfo } = route.params || {};
  const { user, updateVotingHistory } = useAuth();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [verificationQrData, setVerificationQrData] = useState(null);
  
  // Mock candidates data for demo purposes
  const candidates = [
    { id: '1', name: 'Jane Smith', party: 'Progressive Party', position: 'President' },
    { id: '2', name: 'John Doe', party: 'Conservative Party', position: 'President' },
    { id: '3', name: 'Alex Johnson', party: 'Liberty Party', position: 'President' },
    { id: '4', name: 'Maria Garcia', party: 'Unity Party', position: 'President' },
    { id: '5', name: 'Robert Chen', party: 'Reform Party', position: 'President' },
  ];
  
  // Function to handle candidate selection
  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    
    // Generate vote QR code data
    const voteData = {
      voterId: user?.id || 'user123',
      candidateId: candidate.id,
      candidateName: candidate.name,
      party: candidate.party,
      electionName: centerInfo?.electionName || 'General Election',
      timestamp: new Date().toISOString(),
      voteToken: 'vt-' + Math.random().toString(36).substring(2, 15)
    };
    setQrData(JSON.stringify(voteData));
    
    // Show success modal when candidate is selected
    setShowSuccessModal(true);
  };
  
  useEffect(() => {
    // In a real app, we would verify the voting center with the backend here
    // For demo purposes, we'll just show an alert
    Alert.alert(
      'Verification Successful', 
      `You are verified to vote at ${centerInfo?.centerName || user?.votingCenter}. Please select your candidate.`
    );
    
    // Generate verification QR code data
    const verificationData = {
      voterId: user?.id || 'user123',
      votingCenter: centerInfo?.centerCode || 'center001',
      timestamp: new Date().toISOString(),
      verificationToken: 'vt-' + Math.random().toString(36).substring(2, 15)
    };
    setVerificationQrData(JSON.stringify(verificationData));
  }, []);
  
  const handleShare = async () => {
    if (!selectedCandidate) {
      Alert.alert('Error', 'Please select a candidate first');
      return;
    }
    
    try {
      await Share.share({
        message: `I voted for ${selectedCandidate.name} (${selectedCandidate.party}) in the ${centerInfo?.electionName || 'General Election'}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share your vote');
    }
  };
  
  const handleDone = () => {
    if (!selectedCandidate) {
      Alert.alert('Error', 'Please select a candidate first');
      return;
    }
    
    // Simulate updating voting history
    updateVotingHistory({
      electionName: centerInfo?.electionName || 'General Election',
      location: centerInfo?.centerName || user?.votingCenter,
      candidate: selectedCandidate.name,
      party: selectedCandidate.party
    });
    
    // Close success modal if open
    setShowSuccessModal(false);
    
    // Navigate back to dashboard
    navigation.navigate('MainTabs');
  };
  
  // Function to close success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };
  
  // Render each candidate item
  const renderCandidateItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.candidateItem, selectedCandidate?.id === item.id && styles.selectedCandidateItem]} 
      onPress={() => handleSelectCandidate(item)}
    >
      <View style={styles.candidateInfo}>
        <Text style={styles.candidateName}>{item.name}</Text>
        <Text style={styles.candidateParty}>{item.party}</Text>
        <Text style={styles.candidatePosition}>{item.position}</Text>
      </View>
      {selectedCandidate?.id === item.id && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Select Your Candidate</Text>
          <Text style={styles.subtitle}>
            Please review and select one candidate for {centerInfo?.electionName || 'General Election'}
          </Text>
          
          <View style={styles.candidatesContainer}>
            <FlatList
              data={candidates}
              renderItem={renderCandidateItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.candidatesList}
              scrollEnabled={false} // Disable FlatList scrolling to use parent ScrollView
              nestedScrollEnabled={true}
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
          
          {/* Double QR Code Section */}
          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCodeSection}>
              <Text style={styles.qrCodeTitle}>Voter Verification</Text>
              <View style={styles.qrCodeWrapper}>
                {verificationQrData ? (
                  <QRCode
                    value={verificationQrData}
                    size={120}
                    color="#000"
                    backgroundColor="#FFF"
                  />
                ) : (
                  <View style={styles.qrPlaceholder}>
                    <Ionicons name="qr-code-outline" size={60} color="#ccc" />
                  </View>
                )}
              </View>
              <Text style={styles.qrCodeDescription}>Show this code to verify your identity</Text>
            </View>
            
            <View style={styles.qrCodeSection}>
              <Text style={styles.qrCodeTitle}>Vote Confirmation</Text>
              <View style={styles.qrCodeWrapper}>
                {qrData && selectedCandidate ? (
                  <QRCode
                    value={qrData}
                    size={120}
                    color="#000"
                    backgroundColor="#FFF"
                  />
                ) : (
                  <View style={styles.qrPlaceholder}>
                    <Ionicons name="qr-code-outline" size={60} color="#ccc" />
                    <Text style={styles.qrPlaceholderText}>Select a candidate</Text>
                  </View>
                )}
              </View>
              <Text style={styles.qrCodeDescription}>Show this code to confirm your vote</Text>
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
      </ScrollView>
      
      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeSuccessModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
            <Text style={styles.modalTitle}>Vote Successful!</Text>
            <Text style={styles.modalText}>
              You have successfully voted for {selectedCandidate?.name} ({selectedCandidate?.party}).
            </Text>
            <Text style={styles.modalSubtext}>
              Thank you for participating in the {centerInfo?.electionName || 'General Election'}.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleDone}>
              <Text style={styles.modalButtonText}>Return to Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
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
    marginBottom: 20,
  },
  candidatesContainer: {
    width: '100%',
    marginBottom: 20,
  },
  candidatesList: {
    paddingBottom: 10,
  },
  candidateItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCandidateItem: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  candidateInfo: {
    flex: 1,
  },
  candidateName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  candidateParty: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  candidatePosition: {
    fontSize: 14,
    color: '#888',
  },
  selectedIndicator: {
    marginLeft: 10,
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  modalButton: {
    backgroundColor: '#4630EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // QR Code styles
  qrCodeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  qrCodeSection: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  qrCodeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  qrCodeWrapper: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    width: 140,
  },
  qrCodeDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  qrPlaceholder: {
    height: 120,
    width: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrPlaceholderText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default QRDisplayScreen;