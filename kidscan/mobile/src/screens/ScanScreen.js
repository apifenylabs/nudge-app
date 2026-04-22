import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Button, Text, ActivityIndicator, Card } from 'react-native-paper';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import apiService from '../services/api';
import scoringService from '../services/scoring';

export default function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle barcode scan
  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;
    
    setScanned(true);
    setLoading(true);
    
    try {
      console.log(`Barcode scanned: ${data} (type: ${type})`);
      
      // Fetch product data
      const product = await apiService.getProduct(data);
      
      // Calculate age-specific scores
      const ageScores = scoringService.calculateAgeScores(product);
      const summary = scoringService.generateSummary(product, ageScores);
      
      // Navigate to results
      navigation.navigate('Results', {
        product,
        ageScores,
        summary,
        barcode: data,
      });
      
    } catch (error) {
      console.error('Error processing barcode:', error);
      
      Alert.alert(
        'Scan Error',
        `Could not find product information for barcode: ${data}\n\n${error.message}`,
        [
          { text: 'Try Again', onPress: () => resetScanner() },
          { text: 'Manual Entry', onPress: () => {/* TODO: Implement manual entry */} },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset scanner
  const resetScanner = () => {
    setScanned(false);
    setLoading(false);
  };

  // Toggle camera type
  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  // Manual barcode entry (for testing)
  const testWithSampleBarcode = async (barcode) => {
    setScanned(true);
    setLoading(true);
    
    try {
      const product = await apiService.getProduct(barcode);
      const ageScores = scoringService.calculateAgeScores(product);
      const summary = scoringService.generateSummary(product, ageScores);
      
      navigation.navigate('Results', {
        product,
        ageScores,
        summary,
        barcode,
      });
    } catch (error) {
      Alert.alert(
        'Test Error',
        `Test barcode ${barcode} failed: ${error.message}`,
        [{ text: 'OK', onPress: resetScanner }]
      );
    } finally {
      setLoading(false);
    }
  };

  // Show permission request
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  // Show permission denied
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Card style={styles.errorCard}>
          <Card.Content>
            <Text style={styles.errorTitle}>Camera Access Required</Text>
            <Text style={styles.errorText}>
              KidScan needs camera access to scan barcodes. Please enable camera permissions in your device settings.
            </Text>
            <Button 
              mode="contained" 
              onPress={() => Camera.requestCameraPermissionsAsync()}
              style={styles.permissionButton}
            >
              Request Permission Again
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.ean8,
            BarCodeScanner.Constants.BarCodeType.upc_a,
            BarCodeScanner.Constants.BarCodeType.upc_e,
            BarCodeScanner.Constants.BarCodeType.code39,
            BarCodeScanner.Constants.BarCodeType.code128,
          ],
        }}
      >
        <View style={styles.overlay}>
          {/* Scan frame */}
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          
          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructions}>
              Align barcode within the frame
            </Text>
            <Text style={styles.subInstructions}>
              Hold steady for automatic scan
            </Text>
          </View>
        </View>
      </Camera>

      {/* Controls */}
      <View style={styles.controls}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Analyzing product...</Text>
          </View>
        ) : (
          <>
            {scanned ? (
              <Button
                mode="contained"
                onPress={resetScanner}
                style={styles.scanAgainButton}
                icon="camera"
              >
                Scan Another Product
              </Button>
            ) : (
              <Text style={styles.scanningText}>Ready to scan...</Text>
            )}
            
            <View style={styles.buttonRow}>
              <Button
                mode="outlined"
                onPress={toggleCameraType}
                style={styles.cameraButton}
                icon="camera-flip"
              >
                Flip Camera
              </Button>
              
              <Button
                mode="text"
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                icon="arrow-left"
              >
                Back
              </Button>
            </View>
          </>
        )}
      </View>

      {/* Test buttons (development only) */}
      {__DEV__ && (
        <View style={styles.testButtons}>
          <Text style={styles.testTitle}>Test Barcodes:</Text>
          <View style={styles.testButtonRow}>
            <Button
              mode="contained-tonal"
              onPress={() => testWithSampleBarcode('3017620422003')} // Nutella
              style={styles.testButton}
              compact
            >
              Nutella
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => testWithSampleBarcode('5449000000996')} // Coca-Cola
              style={styles.testButton}
              compact
            >
              Coca-Cola
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => testWithSampleBarcode('7613034626844')} // Nesquik
              style={styles.testButton}
              compact
            >
              Nesquik
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#4CAF50',
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  instructions: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  subInstructions: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  controls: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  scanningText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  scanAgainButton: {
    backgroundColor: '#4CAF50',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cameraButton: {
    flex: 1,
    marginRight: 10,
    borderColor: '#4CAF50',
  },
  backButton: {
    flex: 1,
    marginLeft: 10,
  },
  permissionText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  errorCard: {
    margin: 20,
    backgroundColor: '#FFEBEE',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  permissionButton: {
    backgroundColor: '#4CAF50',
  },
  testButtons: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  testTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  testButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  testButton: {
    backgroundColor: '#E8F5E9',
  },
});