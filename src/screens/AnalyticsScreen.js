import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AnalyticsScreen = () => {
  // Dummy data
  const votingTrends = [50, 30, 70, 90, 60]; // percentage
  const demographic = [
    { group: '18-25', votes: 120 },
    { group: '26-35', votes: 80 },
    { group: '36-45', votes: 60 },
  ];
  const geographic = [
    { region: 'North', votes: 150 },
    { region: 'South', votes: 100 },
    { region: 'East', votes: 80 },
    { region: 'West', votes: 60 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Voting Analytics</Text>
        
        {/* Voting Trends */}
        <Text style={styles.sectionTitle}>Voting Trends</Text>
        <View style={styles.trendContainer}>
          {votingTrends.map((val, idx) => (
            <View key={idx} style={styles.barWrapper}>
              <View style={[styles.bar, { height: val }]} />
              <Text style={styles.barLabel}>{val}%</Text>
            </View>
          ))}
        </View>

        {/* Demographic Insights */}
        <Text style={styles.sectionTitle}>Demographics</Text>
        {demographic.map((item, idx) => (
          <View key={idx} style={styles.statRow}>
            <Text>{item.group}</Text>
            <Text>{item.votes} votes</Text>
          </View>
        ))}

        {/* Geographic Distribution */}
        <Text style={styles.sectionTitle}>Geographic Distribution</Text>
        {geographic.map((item, idx) => (
          <View key={idx} style={styles.statRow}>
            <Text>{item.region}</Text>
            <Text>{item.votes} votes</Text>
          </View>
        ))}
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#4630EB',
  },
  trendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 20,
  },
  barWrapper: {
    alignItems: 'center',
  },
  bar: {
    width: 20,
    backgroundColor: '#4630EB',
    borderRadius: 5,
  },
  barLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default AnalyticsScreen;
