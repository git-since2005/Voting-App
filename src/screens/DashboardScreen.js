import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const stackNavigation = navigation.getParent();

  const renderVotingHistoryItem = ({ item }) => {
    return (
      <View style={styles.historyItem}>
        <View style={styles.historyItemContent}>
          <Text style={styles.historyItemTitle}>
            Voted on {new Date(item.date).toLocaleDateString()}
          </Text>
          <Text style={styles.historyItemSubtitle}>
            {item.electionName || 'General Election'}
          </Text>
          <Text style={styles.historyItemDetails}>
            Location: {item.location || user.votingCenter}
          </Text>
        </View>
        <View style={styles.historyItemStatus}>
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          <Text style={styles.historyItemStatusText}>Verified</Text>
        </View>
      </View>
    );
  };

  const EmptyVotingHistory = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>No Voting History</Text>
      <Text style={styles.emptySubtitle}>
        Your voting history will appear here after you cast your vote
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>{user?.name || 'Voter'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#4630EB" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoCard}>
        <View style={styles.infoCardRow}>
          <Text style={styles.infoCardLabel}>Voting Center:</Text>
          <Text style={styles.infoCardValue}>{user?.votingCenter || 'Not Assigned'}</Text>
        </View>
        <View style={styles.infoCardRow}>
          <Text style={styles.infoCardLabel}>Voter ID:</Text>
          <Text style={styles.infoCardValue}>{user?.id || 'N/A'}</Text>
        </View>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Voting History</Text>
      </View>
      
      <FlatList
        data={user?.votingHistory || []}
        renderItem={renderVotingHistoryItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={EmptyVotingHistory}
      />
      
      {/* Floating Action Button for QR Scanner */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => stackNavigation.navigate('QRScanner')}
      >
        <Ionicons name="qr-code-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={{...styles.fab, bottom:100, display:"flex", borderRadius:9, backgroundColor:"#FFF700"}}
        onPress={() => stackNavigation.navigate('QRDisplay')}
      >
        <Text style={{"fontWeight":"bold", margin:"auto", position:"relative", left:15}}>Vote Cast</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
  infoCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoCardLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoCardValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Space for FAB
    flexGrow: 1,
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyItemContent: {
    flex: 1,
  },
  historyItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  historyItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  historyItemDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  historyItemStatus: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyItemStatusText: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4630EB',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default DashboardScreen;