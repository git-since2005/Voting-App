import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AnalyticsScreen = () => {
  // Mock data for analytics
  const votingData = {
    totalVotes: 12458,
    participationRate: 78.4,
    candidateResults: [
      { name: 'Jane Smith', party: 'Progressive Party', votes: 5842, percentage: 46.9 },
      { name: 'John Davis', party: 'Liberty Union', votes: 4210, percentage: 33.8 },
      { name: 'Robert Johnson', party: 'Citizens Alliance', votes: 1987, percentage: 15.9 },
      { name: 'Sarah Williams', party: 'Independent', votes: 419, percentage: 3.4 }
    ],
    demographicData: {
      ageGroups: [
        { group: '18-24', percentage: 15 },
        { group: '25-34', percentage: 22 },
        { group: '35-44', percentage: 19 },
        { group: '45-54', percentage: 18 },
        { group: '55-64', percentage: 14 },
        { group: '65+', percentage: 12 }
      ],
      genderDistribution: [
        { gender: 'Male', percentage: 48 },
        { gender: 'Female', percentage: 51 },
        { gender: 'Non-binary', percentage: 1 }
      ]
    },
    hourlyTurnout: [
      { hour: '8 AM', voters: 845 },
      { hour: '10 AM', voters: 1267 },
      { hour: '12 PM', voters: 2134 },
      { hour: '2 PM', voters: 1876 },
      { hour: '4 PM', voters: 2541 },
      { hour: '6 PM', voters: 3795 }
    ]
  };

  // Helper function to render candidate result bars
  const renderCandidateBar = (candidate, index) => {
    const barColors = ['#4630EB', '#FF9500', '#34C759', '#FF3B30'];
    return (
      <View key={index} style={styles.candidateResultItem}>
        <View style={styles.candidateInfo}>
          <Text style={styles.candidateName}>{candidate.name}</Text>
          <Text style={styles.candidateParty}>{candidate.party}</Text>
        </View>
        <View style={styles.barContainer}>
          <View 
            style={[styles.bar, { width: `${candidate.percentage}%`, backgroundColor: barColors[index % barColors.length] }]}
          />
          <View style={styles.barTextContainer}>
            <Text style={styles.voteCount}>{candidate.votes.toLocaleString()} votes</Text>
            <Text style={styles.votePercentage}>{candidate.percentage}%</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Election Analytics</Text>
            <Text style={styles.subtitle}>General Election 2023</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="people-outline" size={24} color="#4630EB" />
              <Text style={styles.statValue}>{votingData.totalVotes.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Total Votes</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="trending-up-outline" size={24} color="#4630EB" />
              <Text style={styles.statValue}>{votingData.participationRate}%</Text>
              <Text style={styles.statLabel}>Participation</Text>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="stats-chart-outline" size={24} color="#4630EB" />
              <Text style={styles.sectionTitle}>Candidate Results</Text>
            </View>
            
            <View style={styles.candidateResults}>
              {votingData.candidateResults.map((candidate, index) => renderCandidateBar(candidate, index))}
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="people-outline" size={24} color="#4630EB" />
              <Text style={styles.sectionTitle}>Demographic Insights</Text>
            </View>
            
            <View style={styles.demographicContainer}>
              <View style={styles.demographicCard}>
                <Text style={styles.demographicTitle}>Age Distribution</Text>
                <View style={styles.barChartContainer}>
                  {votingData.demographicData.ageGroups.map((item, index) => (
                    <View key={index} style={styles.barChartItem}>
                      <Text style={styles.barChartLabel}>{item.group}</Text>
                      <View style={styles.barChartBarContainer}>
                        <View style={[styles.barChartBar, { width: `${item.percentage * 2}%` }]} />
                      </View>
                      <Text style={styles.barChartValue}>{item.percentage}%</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="time-outline" size={24} color="#4630EB" />
              <Text style={styles.sectionTitle}>Hourly Turnout</Text>
            </View>
            
            <View style={styles.turnoutContainer}>
              {votingData.hourlyTurnout.map((item, index) => (
                <View key={index} style={styles.turnoutItem}>
                  <Text style={styles.turnoutHour}>{item.hour}</Text>
                  <View style={styles.turnoutBarContainer}>
                    <View 
                      style={[styles.turnoutBar, { height: Math.max(20, item.voters / 50) }]} 
                    />
                  </View>
                  <Text style={styles.turnoutValue}>{item.voters}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  candidateResults: {
    width: '100%',
  },
  candidateResultItem: {
    marginBottom: 15,
  },
  candidateInfo: {
    marginBottom: 5,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  candidateParty: {
    fontSize: 14,
    color: '#666',
  },
  barContainer: {
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  bar: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 15,
  },
  barTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  voteCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  votePercentage: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  demographicContainer: {
    width: '100%',
  },
  demographicCard: {
    marginBottom: 15,
  },
  demographicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  barChartContainer: {
    width: '100%',
  },
  barChartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  barChartLabel: {
    width: 50,
    fontSize: 12,
    color: '#666',
  },
  barChartBarContainer: {
    flex: 1,
    height: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 7.5,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  barChartBar: {
    height: '100%',
    backgroundColor: '#4630EB',
    borderRadius: 7.5,
  },
  barChartValue: {
    width: 30,
    fontSize: 12,
    color: '#333',
    textAlign: 'right',
  },
  turnoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
  },
  turnoutItem: {
    alignItems: 'center',
    flex: 1,
  },
  turnoutHour: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  turnoutBarContainer: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 150,
  },
  turnoutBar: {
    width: '100%',
    backgroundColor: '#4630EB',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  turnoutValue: {
    fontSize: 10,
    color: '#333',
    marginTop: 5,
  },
  comingSoonBadge: {
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