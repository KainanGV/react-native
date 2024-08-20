import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

interface SubmitButtonProps {
  title: string;
  onPress: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
