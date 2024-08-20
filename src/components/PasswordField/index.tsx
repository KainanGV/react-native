import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

interface PasswordFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ placeholder, value, onChangeText, onBlur }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.inputPassword}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        secureTextEntry={!visible}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
      />
      <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.eyeIcon}>
        <Ionicons name={visible ? 'eye-off' : 'eye'} size={24} color="#A0A0A0" />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordField;
