import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

interface LottieAnimationProps {
  visible: boolean;
  animationType: 'success' | 'celebration' | 'sparkle';
  onAnimationFinish?: () => void;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ 
  visible, 
  animationType, 
  onAnimationFinish 
}) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (visible && animationRef.current) {
      animationRef.current.play();
    }
  }, [visible]);

  if (!visible) return null;

  // Basit JSON animasyonları (gerçek projede LottieFiles'den indirilebilir)
  const getAnimationSource = () => {
    switch (animationType) {
      case 'success':
        return require('../assets/animations/success.json');
      case 'celebration':
        return require('../assets/animations/celebration.json');
      case 'sparkle':
        return require('../assets/animations/sparkle.json');
      default:
        return require('../assets/animations/success.json');
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={getAnimationSource()}
        style={styles.animation}
        loop={false}
        onAnimationFinish={onAnimationFinish}
        autoPlay={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'none',
  },
  animation: {
    width: width * 0.8,
    height: width * 0.8,
  },
});

export default LottieAnimation;
