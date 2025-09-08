import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const QRScannerScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const { verifyVotingCenter } = useAuth();

  // Use useFocusEffect for a more reliable focus listener
  useFocusEffect(
    useCallback(() => {
      // Reset state when the screen comes into focus
      setScanned(false);
      setLoading(false);
      return () => {
        // Optional cleanup on blur, if needed
      };
    }, [])
  );

  useEffect(() => {
    // Request permissions only once on component mount
    if (Platform.OS !== "web") {
      requestPermission();
    }
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned || loading) {
      return;
    }

    setScanned(true); // Mark as scanned to prevent new scans
    setLoading(true);

    try {
      let centerCode = data;
      try {
        const centerInfo = JSON.parse(data);
        centerCode = centerInfo.centerCode || data;
      } catch (parseError) {
        // Assume data is the centerCode if JSON parsing fails
        console.warn("Could not parse QR data as JSON. Using raw data.");
      }

      const verificationResult = await verifyVotingCenter(centerCode);

      if (verificationResult.success) {
        navigation.replace("QRDisplay", {
          centerInfo: verificationResult.centerInfo,
        });
      } else {
        Alert.alert(
          "Verification Failed",
          verificationResult.error || "You are not registered at this voting center."
        );
        // Allow rescanning after failure
        setScanned(false);
      }
    } catch (error) {
      console.error("QR scan error:", error);
      Alert.alert("Error", "An error occurred while processing the QR code.");
      // Allow rescanning after error
      setScanned(false);
    } finally {
      setLoading(false);
    }
  };

  // Web fallback, return early
  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="qr-code-outline" size={64} color="#4630EB" />
          <Text style={styles.permissionText}>QR Scanner Not Available</Text>
          <Text style={styles.permissionText}>
            The native camera scanner is not supported on the web platform.
            Please use the Expo Go app on your mobile device.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.permissionButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Handle permission loading state, return early
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading camera permissions...</Text>
      </View>
    );
  }

  // Handle permission denied state, return early
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Ionicons name="camera-off-outline" size={64} color="#ff6b6b" />
        <Text style={styles.title}>Camera Access Denied</Text>
        <Text style={styles.text}>
          We need camera permission to scan QR codes. Please enable camera access
          in your device settings.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: 10 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Main render for when permission is granted
  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onModernBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        isCameraActive={!scanned} // Explicitly control the camera session
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4630EB" />
          <Text style={styles.loadingText}>Verifying...</Text>
        </View>
      )}

      <View style={styles.overlay}>
        <View style={styles.scanFrame} />
        <Text style={styles.instructions}>
          Scan the QR code at your voting center
        </Text>

        {scanned && !loading && (
          <TouchableOpacity
            style={styles.rescanButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close-circle" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#4630EB",
    borderRadius: 16,
  },
  instructions: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 8,
    maxWidth: "80%",
  },
  rescanButton: {
    backgroundColor: "#4630EB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  rescanButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "transparent",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    marginTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 40,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#4630EB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  permissionContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  permissionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  permissionButton: {
    backgroundColor: "#4630EB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QRScannerScreen;
