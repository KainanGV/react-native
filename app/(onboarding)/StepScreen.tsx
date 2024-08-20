import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const StepScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const steps = [
    {
      title: 'Bem-vindo ao App Don Saúde',
      text: 'O app da Don para fazer seus atendimentos sozinho, veja como é simples!',
      image: require('../../assets/images/bro.png'),
    },
    {
      title: 'Acesse ou cadastre-se no App!',
      text: 'Você tem acesso a solicitar atendimentos, acompanhar e ao exclusivo CLUB DON!',
      image: require('../../assets/images/onlineDoctor.png'),
    },
    {
      title: 'Vamos começar?',
      text: 'Entre ou cadastre-se para começar a aproveitar o app Don Saúde',
      image: require('../../assets/images/orthopedic.png'),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('../register');
    }
  };
  

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const { title, text, image } = steps[currentStep - 1];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.footer}>
        <View style={styles.dots}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentStep === index + 1 ? styles.activeDot : {},
              ]}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleNext}>
          <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#841245',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  image: {
    width: 380,
    height: 360,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left', // Alinhado à esquerda
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'left', // Alinhado à esquerda
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
    marginHorizontal: 4,
  },
  activeDot: {
    opacity: 1,
  },
});

export default StepScreen;
