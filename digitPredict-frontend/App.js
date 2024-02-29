import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, Platform, Touchable } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Svg, { Path } from 'react-native-svg';

const App = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [paths, setPaths] = useState([]);
  const drawAreaRef = useRef();

  const getRelativePosition = (event) => {
    if (Platform.OS === 'web') {
      const { pageX, pageY } = event.nativeEvent;
      const rect = drawAreaRef.current.getBoundingClientRect();
  
      // Calculate scaling factors if any scaling is applied
      const scaleX = drawAreaRef.current.offsetWidth / rect.width;
      const scaleY = drawAreaRef.current.offsetHeight / rect.height;
  
      // Adjust pageX and pageY based on the scaling factors
      const locationX = (pageX - rect.left) * scaleX;
      const locationY = (pageY - rect.top) * scaleY;
  
      return { locationX, locationY };
    } else {
      return event.nativeEvent;
    }
  };
  
  const handleStartDrawing = (event) => {
    setIsDrawing(true);
    const { locationX, locationY } = getRelativePosition(event);
    setCurrentPath(`M${locationX},${locationY}`);
  };

  const handleDrawing = (event) => {
    if (!isDrawing) return;
    const { locationX, locationY } = getRelativePosition(event);
    setCurrentPath(prev => `${prev} L${locationX},${locationY}`);
  };

  const handleEndDrawing = () => {
    setIsDrawing(false);
    setPaths(prev => [...prev, currentPath]);
    setCurrentPath("");
  };

  // Function to capture the drawing area
  const captureDrawing = async () => {
    try {
      const uri = await captureViewRef(drawAreaRef, {
        format: 'jpg',
        quality: 0.8,
      });
      console.log('Image saved to', uri);
      Alert.alert('Image Captured', uri);
    } catch (error) {
      console.error('Capture failed', error);
      Alert.alert('Error', 'Failed to capture drawing');
    }
  };

  const clearDrawing = () => {
    setPaths([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Intelligent Digit Interpreter</Text>
      <Text style={styles.subtitle}>By Evan Chen & RAISO w'24</Text>
      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>Trace your cursor to draw a digit in the box below.</Text>
      </View>
      <View style={styles.drawArea} ref={drawAreaRef}>
        <Svg style={StyleSheet.absoluteFill}>
          {paths.map((path, index) => (
            <Path key={index} d={path} stroke="#FF0000" strokeWidth={4} fill="none" />
          ))}
          <Path d={currentPath} stroke="#FF0000" strokeWidth={4} fill="none" />
        </Svg>
        <View
          style={StyleSheet.absoluteFill}
          onStartShouldSetRespotnder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={handleStartDrawing}
          onResponderMove={handleDrawing}
          onResponderRelease={handleEndDrawing}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={captureDrawing} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Capture Drawing</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearDrawing} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear Drawing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#caf0f8',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: '#333',
    marginBottom: 50,
    textAlign: 'center',
  },
  instructions: {
    marginBottom: 20,
  },
  instructionsText: {
    fontSize: 16,
    color: '#333',
  },
  drawArea: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    position: 'relative',
  },
  clearButton: {
    backgroundColor: '#fdf0d5',
    margin: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: -50,
  },
});

export default App;