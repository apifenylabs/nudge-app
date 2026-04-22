import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Avatar.Icon 
            size={80} 
            icon="food-apple" 
            style={styles.avatar}
          />
          <Title style={styles.title}>KidScan</Title>
          <Paragraph style={styles.subtitle}>
            Age-specific food safety scanner for kids
          </Paragraph>
          <Paragraph style={styles.description}>
            Scan any food product to get age-appropriate safety scores, 
            allergen warnings, and nutritional guidance.
          </Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="camera"
          onPress={() => navigation.navigate('Scan')}
          style={styles.scanButton}
          contentStyle={styles.buttonContent}
        >
          Scan Food Now
        </Button>

        <Button
          mode="outlined"
          icon="information"
          onPress={() => {/* TODO: Add info screen */}}
          style={styles.infoButton}
        >
          How It Works
        </Button>

        <Button
          mode="text"
          icon="cog"
          onPress={() => {/* TODO: Add settings */}}
          style={styles.settingsButton}
        >
          Age Settings
        </Button>
      </View>

      <Card style={styles.featuresCard}>
        <Card.Content>
          <Title>Features</Title>
          <Paragraph>• Age-specific scoring (0-2, 3-5, 6-8, 9-12)</Paragraph>
          <Paragraph>• Allergen & choking hazard alerts</Paragraph>
          <Paragraph>• Nutritional guidance for growth</Paragraph>
          <Paragraph>• 100% accurate, verified data</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 20,
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    backgroundColor: '#4CAF50',
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  scanButton: {
    marginBottom: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
  },
  buttonContent: {
    height: 50,
  },
  infoButton: {
    marginBottom: 10,
    borderColor: '#4CAF50',
  },
  settingsButton: {
    marginBottom: 10,
  },
  featuresCard: {
    marginTop: 10,
  },
});