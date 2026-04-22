import React from 'react';
import { View, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  Chip, 
  Divider, 
  List,
  Avatar,
  Badge,
} from 'react-native-paper';
import { DEFAULT_PRODUCT_IMAGE, AGE_GROUPS } from '../utils/constants';

export default function ResultsScreen({ route, navigation }) {
  const { product, ageScores, summary, barcode } = route.params || {};

  // Handle missing data
  if (!product || !ageScores) {
    return (
      <View style={styles.container}>
        <Card style={styles.errorCard}>
          <Card.Content>
            <Title>No Product Data</Title>
            <Paragraph>
              Unable to display product information. Please try scanning again.
            </Paragraph>
            <Button 
              mode="contained" 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              Back to Scanner
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  // Open product URL if available
  const openProductUrl = () => {
    if (product.rawData?.url) {
      Linking.openURL(product.rawData.url);
    }
  };

  // Render age score cards
  const renderAgeScoreCards = () => {
    return AGE_GROUPS.map(ageGroup => {
      const score = ageScores[ageGroup.id];
      if (!score) return null;

      return (
        <Card key={ageGroup.id} style={styles.ageCard}>
          <Card.Content>
            <View style={styles.ageHeader}>
              <Title style={styles.ageTitle}>{ageGroup.label}</Title>
              <Badge 
                size={40} 
                style={[styles.scoreBadge, { backgroundColor: score.color }]}
              >
                {score.score}
              </Badge>
            </View>
            
            <Paragraph style={styles.ageLevel}>{score.level}</Paragraph>
            
            {score.warnings && score.warnings.length > 0 && (
              <View style={styles.warningsContainer}>
                {score.warnings.map((warning, index) => (
                  <Chip 
                    key={index}
                    icon="alert"
                    style={styles.warningChip}
                    textStyle={styles.warningText}
                  >
                    {warning}
                  </Chip>
                ))}
              </View>
            )}
            
            {score.recommendations && score.recommendations.length > 0 && (
              <View style={styles.recommendationsContainer}>
                {score.recommendations.map((rec, index) => (
                  <Chip 
                    key={index}
                    icon="check-circle"
                    style={styles.recommendationChip}
                    textStyle={styles.recommendationText}
                  >
                    {rec}
                  </Chip>
                ))}
              </View>
            )}
          </Card.Content>
        </Card>
      );
    });
  };

  // Render safety warnings
  const renderSafetyWarnings = () => {
    if (!summary.warnings || summary.warnings.length === 0) {
      return (
        <Chip icon="check-circle" style={styles.safeChip}>
          No major safety concerns detected
        </Chip>
      );
    }

    return (
      <View style={styles.warningsList}>
        {summary.warnings.map((warning, index) => (
          <List.Item
            key={index}
            title={warning}
            left={props => <List.Icon {...props} icon="alert" color="#F44336" />}
            style={styles.warningItem}
          />
        ))}
      </View>
    );
  };

  // Render recommendations
  const renderRecommendations = () => {
    if (!summary.recommendations || summary.recommendations.length === 0) {
      return null;
    }

    return (
      <View style={styles.recommendationsList}>
        {summary.recommendations.map((rec, index) => (
          <List.Item
            key={index}
            title={rec}
            left={props => <List.Icon {...props} icon="lightbulb" color="#4CAF50" />}
            style={styles.recommendationItem}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Product Header */}
      <Card style={styles.productCard}>
        <Card.Content>
          <View style={styles.productHeader}>
            {product.imageUrl ? (
              <Image 
                source={{ uri: product.imageUrl }} 
                style={styles.productImage}
                resizeMode="contain"
              />
            ) : (
              <Avatar.Icon 
                size={80} 
                icon="food" 
                style={styles.productIcon}
              />
            )}
            
            <View style={styles.productInfo}>
              <Title style={styles.productName}>{product.name}</Title>
              <Paragraph style={styles.productBrand}>{product.brand}</Paragraph>
              
              {product.categories && (
                <View style={styles.categoryChips}>
                  {product.categories.split(',').slice(0, 3).map((cat, index) => (
                    <Chip key={index} style={styles.categoryChip} compact>
                      {cat.trim()}
                    </Chip>
                  ))}
                </View>
              )}
            </View>
          </View>
          
          <Divider style={styles.divider} />
          
          {/* Overall Score */}
          <View style={styles.overallScoreContainer}>
            <Title>Overall Safety Score</Title>
            <View style={styles.scoreDisplay}>
              <Badge 
                size={80} 
                style={[styles.overallScoreBadge, { backgroundColor: summary.overallColor }]}
              >
                <Title style={styles.overallScoreText}>{summary.overallScore}</Title>
              </Badge>
              <View style={styles.scoreDetails}>
                <Title style={styles.scoreLevel}>{summary.overallLevel}</Title>
                <Paragraph style={styles.scoreDescription}>
                  {summary.overallScore >= 80 ? 'Excellent choice!' :
                   summary.overallScore >= 60 ? 'Good option' :
                   summary.overallScore >= 40 ? 'Use with caution' :
                   'Not recommended'}
                </Paragraph>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Age-Specific Scores */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Age-Specific Scores</Title>
          <Paragraph style={styles.sectionSubtitle}>
            Scores vary by age due to different nutritional needs and safety concerns
          </Paragraph>
          {renderAgeScoreCards()}
        </Card.Content>
      </Card>

      {/* Safety Warnings */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Safety Information</Title>
          {renderSafetyWarnings()}
        </Card.Content>
      </Card>

      {/* Recommendations */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Recommendations</Title>
          {renderRecommendations()}
        </Card.Content>
      </Card>

      {/* Product Details */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Product Details</Title>
          
          <List.Section>
            {product.barcode && (
              <List.Item
                title="Barcode"
                description={product.barcode}
                left={props => <List.Icon {...props} icon="barcode" />}
              />
            )}
            
            {product.ingredients && (
              <List.Item
                title="Ingredients"
                description={product.ingredients.length > 100 
                  ? `${product.ingredients.substring(0, 100)}...` 
                  : product.ingredients}
                left={props => <List.Icon {...props} icon="format-list-bulleted" />}
              />
            )}
            
            {product.nutriScore && product.nutriScore !== 'unknown' && (
              <List.Item
                title="Nutri-Score"
                description={product.nutriScore.toUpperCase()}
                left={props => <List.Icon {...props} icon="nutrition" />}
              />
            )}
            
            {product.novaGroup && product.novaGroup > 0 && (
              <List.Item
                title="Processing Level"
                description={`Nova Group ${product.novaGroup} (${product.novaGroup === 1 ? 'Unprocessed' :
                  product.novaGroup === 2 ? 'Processed ingredients' :
                  product.novaGroup === 3 ? 'Processed' : 'Ultra-processed'})`}
                left={props => <List.Icon {...props} icon="factory" />}
              />
            )}
          </List.Section>
          
          {product.rawData?.url && (
            <Button 
              mode="outlined" 
              onPress={openProductUrl}
              style={styles.detailsButton}
              icon="open-in-new"
            >
              View Full Product Details
            </Button>
          )}
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Scan')}
          style={styles.scanAgainButton}
          icon="camera"
        >
          Scan Another Product
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Home')}
          style={styles.homeButton}
          icon="home"
        >
          Back to Home
        </Button>
      </View>

      {/* Data Source Attribution */}
      <View style={styles.attribution}>
        <Paragraph style={styles.attributionText}>
          Product data provided by Open Food Facts
        </Paragraph>
        <Paragraph style={styles.disclaimer}>
          Always supervise children during meals and consult with a pediatrician for specific dietary concerns.
        </Paragraph>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  errorCard: {
    margin: 20,
    backgroundColor: '#FFEBEE',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
  productCard: {
    margin: 10,
    elevation: 4,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  productIcon: {
    backgroundColor: '#E8F5E9',
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  categoryChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#E8F5E9',
  },
  divider: {
    marginVertical: 15,
  },
  overallScoreContainer: {
    alignItems: 'center',
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  overallScoreBadge: {
    marginRight: 20,
  },
  overallScoreText: {
    color: 'white',
    fontSize: 24,
  },
  scoreDetails: {
    flex: 1,
  },
  scoreLevel: {
    fontSize: 20,
    color: '#333',
  },
  scoreDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  sectionCard: {
    margin: 10,
    marginTop: 0,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  ageCard: {
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
  },
  ageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  ageTitle: {
    fontSize: 16,
  },
  scoreBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageLevel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  warningsContainer: {
    marginBottom: 10,
  },
  warningChip: {
    backgroundColor: '#FFEBEE',
    marginBottom: 5,
  },
  warningText: {
    color: '#D32F2F',
    fontSize: 12,
  },
  recommendationsContainer: {
    marginTop: 5,
  },
  recommendationChip: {
    backgroundColor: '#E8F5E9',
    marginBottom: 5,
  },
  recommendationText: {
    color: '#2E7D32',
    fontSize: 12,
  },
  safeChip: {
    backgroundColor: '#E8F5E9',
    alignSelf: 'flex-start',
  },
  warningsList: {
    marginTop: 10,
  },
  warningItem: {
    paddingVertical: 5,
  },
  recommendationsList: {
    marginTop: 10,
  },
  recommendationItem: {
    paddingVertical: 5,
  },
  detailsButton: {
    marginTop: 15,
    borderColor: '#4CAF50',
  },
  actionButtons: {
    padding: 20,
    paddingTop: 10,
  },
  scanAgainButton: {
    backgroundColor: '#4CAF50',
    marginBottom: 10,
  },
  homeButton: {
    borderColor: '#4CAF50',
  },
  attribution: {
    padding: 20,
    paddingTop: 0,
    alignItems: 'center',
  },
  attributionText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
  },
  disclaimer: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});