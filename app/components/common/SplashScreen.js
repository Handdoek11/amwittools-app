// app/components/common/SplashScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Animated, Easing, Dimensions } from 'react-native';
import { colors } from '../../themes/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  // Animation values
  const logoFadeAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.9)).current;
  const circleScaleAnim = useRef(new Animated.Value(0)).current;
  const circleFadeAnim = useRef(new Animated.Value(0)).current;
  
  // Letter animation state
  const [visibleLetters, setVisibleLetters] = useState(0);
  const companyName = "Amwittools International";
  
  useEffect(() => {
    // Circle and logo animation
    Animated.sequence([
      // First show the circle
      Animated.parallel([
        Animated.timing(circleScaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(circleFadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]),
      
      // Show the logo container
      Animated.parallel([
        Animated.timing(logoFadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(logoScaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.2)),
        }),
      ]),
      
      // Wait before starting letters animation
      Animated.delay(200),
    ]).start();
    
    // Start letter-by-letter animation
    const lettersTimer = setTimeout(() => {
      // Animation for each letter with interval
      let letterIndex = 0;
      const interval = setInterval(() => {
        letterIndex++;
        setVisibleLetters(letterIndex);
        
        if (letterIndex >= companyName.length) {
          clearInterval(interval);
          
          // Wait a bit after all letters are shown before finishing
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 1200);
        }
      }, 100); // 100ms between each letter
      
      return () => clearInterval(interval);
    }, 1600);
    
    return () => clearTimeout(lettersTimer);
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Animating background circle */}
        <Animated.View
          style={[
            styles.backgroundCircle,
            {
              opacity: circleFadeAnim,
              transform: [{ scale: circleScaleAnim }]
            }
          ]}
        />
        
        {/* Logo container */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoFadeAnim,
              transform: [{ scale: logoScaleAnim }]
            }
          ]}
        >
          {/* Letter-by-letter animation for company name */}
          <View style={styles.logoTextContainer}>
            <Text style={styles.logoText}>
              {companyName.split('').map((letter, index) => (
                <Text
                  key={index}
                  style={[
                    styles.letterText,
                    index < visibleLetters ? styles.visibleLetter : styles.hiddenLetter
                  ]}
                >
                  {letter}
                </Text>
              ))}
            </Text>
          </View>
        </Animated.View>
        
        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <LoadingBar />
        </View>
      </View>
    </View>
  );
};

// Custom loading bar component
const LoadingBar = () => {
  const loadingAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Loop the loading animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.cubic),
        }),
        Animated.timing(loadingAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.cubic),
        }),
      ])
    ).start();
  }, []);
  
  // Use loadingAnim to animate the width and opacity of the loading indicator
  const width = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['10%', '80%']
  });
  
  const opacity = loadingAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 1, 0.4]
  });
  
  return (
    <View style={styles.loadingBarContainer}>
      <Animated.View
        style={[
          styles.loadingBar,
          {
            width: width,
            opacity: opacity
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary, // Deep blue background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    zIndex: -1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    padding: 20,
  },
  logoTextContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  letterText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  visibleLetter: {
    opacity: 1,
    color: '#fff',
  },
  hiddenLetter: {
    opacity: 0,
    color: 'transparent',
  },
  loadingContainer: {
    width: 200,
    marginTop: 40,
  },
  loadingBarContainer: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  loadingBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1.5,
  },
});

export default SplashScreen;