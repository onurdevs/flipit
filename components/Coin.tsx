import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

interface CoinProps {
  isFlipping: boolean;
  result: 'heads' | 'tails' | null;
  onAnimationComplete: () => void;
  onPress: () => void;
}

const Coin: React.FC<CoinProps> = ({ isFlipping, result, onAnimationComplete, onPress }) => {
  const { t } = useTranslation();
  
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const ringRotation = useRef(new Animated.Value(0)).current;
  const [currentSide, setCurrentSide] = useState<'heads' | 'tails'>('heads');

  const rotateY = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1800deg'], // 5 tam dönüş
  });

  const glowOpacity = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.8],
  });

  const ringRotate = ringRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    // Idle ring rotation animation
    if (!isFlipping) {
      Animated.loop(
        Animated.timing(ringRotation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isFlipping]);

  useEffect(() => {
    if (isFlipping) {
      const interval = setInterval(() => {
        setCurrentSide(prev => prev === 'heads' ? 'tails' : 'heads');
      }, 60);

      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowAnimation, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(glowAnimation, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.sequence([
          Animated.spring(scaleAnimation, {
            toValue: 1.3,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.timing(flipAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        if (result) {
          setCurrentSide(result);
        }
        clearInterval(interval);
        Animated.spring(scaleAnimation, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }).start(() => {
          onAnimationComplete();
        });
      });

      return () => clearInterval(interval);
    } else {
      flipAnimation.setValue(0);
      scaleAnimation.setValue(1);
      glowAnimation.setValue(0);
    }
  }, [isFlipping, result]);

  const coinSide = !isFlipping && result ? result : currentSide;

  return (
    <View style={styles.container}>
      {/* Animated Glow */}
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: glowOpacity,
            transform: [{ scale: scaleAnimation }],
          },
        ]}
      />

      {/* Rotating Ring - Only visible when not flipping */}
      {!isFlipping && (
        <Animated.View
          style={[
            styles.rotatingRing,
            {
              transform: [{ rotate: ringRotate }],
            },
          ]}
        >
          <View style={styles.ringDot1} />
          <View style={styles.ringDot2} />
          <View style={styles.ringDot3} />
        </Animated.View>
      )}

      {/* Coin - Now Touchable */}
      <TouchableOpacity
        onPress={onPress}
        disabled={isFlipping}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.coin,
            {
              transform: [
                { rotateY },
                { scale: scaleAnimation },
              ],
            },
          ]}
        >
          <View style={styles.coinFace}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>
                {coinSide === 'heads' ? '👑' : '🦅'}
              </Text>
            </View>
            <Text style={styles.label}>
              {coinSide === 'heads' ? t('heads') : t('tails')}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    marginVertical: 15,
  },
  glow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 30,
  },
  coin: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 6,
    borderColor: '#FFA500',
    position: 'relative',
  },
  coinFace: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '900',
    color: '#8B4513',
    letterSpacing: 1.5,
  },
  rotatingRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  ringDot1: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  },
  ringDot2: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFA500',
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 6,
  },
  ringDot3: {
    position: 'absolute',
    top: '50%',
    right: 0,
    marginTop: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFE55C',
    shadowColor: '#FFE55C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
});

export default Coin;
