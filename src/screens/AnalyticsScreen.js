import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AnalyticsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <View style={styles.content}>
        <Ionicons name="construct-outline" size={80} color="#4630EB" />
        <Text style={styles.title}>Analytics Coming Soon</Text>
        <Text style={styles.subtitle}>
          We're working hard to bring you detailed voting analytics and insights.
        </Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Ionicons name="stats-chart-outline" size={24} color="#4630EB" />
            <Text style={styles.featureText}>Voting Trends</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="people-outline" size={24} color="#4630EB" />
            <Text style={styles.featureText}>Demographic Insights</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="time-outline" size={24} color="#4630EB" />
            <Text style={styles.featureText}>Real-time Results</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="map-outline" size={24} color="#4630EB" />
            <Text style={styles.featureText}>Geographic Distribution</Text>
          </View>
        </View>
        <View style={styles.comingSoonBadge}>
          <Text style={styles.comingSoonText}>Under Development</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    paddingHorizontal: 20,
  },
  featureList: {
    width: '100%',
    maxWidth: 300,
    marginTop: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  comingSoonBadge: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 30,
  },
  comingSoonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default AnalyticsScreen;