import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Report {
  id: string;
  location: string;
  description: string;
  timestamp: Date;
}

export default function ReportFire() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [reports, setReports] = useState<Report[]>([]);

  const handleSubmit = () => {
    if (!description || !location) {
      Alert.alert('Please fill in all fields');
      return;
    }
    
    const newReport = {
      id: Date.now().toString(),
      location,
      description,
      timestamp: new Date(),
    };
    
    setReports([newReport, ...reports]);
    setDescription('');
    setLocation('');
    Alert.alert('Report Submitted', 'Thank you for your report');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Report a Possible Fire</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>Recent Reports</Text>
      
      {reports.map((report) => (
        <View key={report.id} style={styles.reportCard}>
          <View style={styles.reportHeader}>
            <Text style={styles.reportLocation}>{report.location}</Text>
            <Text style={styles.reportTime}>
              {report.timestamp.toLocaleTimeString()}
            </Text>
          </View>
          <Text style={styles.reportDescription}>{report.description}</Text>
          <View style={styles.statusBadge}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
            <Text style={styles.statusText}>Pending Review</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 16,
    color: '#1a1a1a',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#FF4136',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  reportCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reportLocation: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  reportTime: {
    fontSize: 14,
    color: '#666',
  },
  reportDescription: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});