// components/InputField.tsx
import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, View, Text } from "react-native";

import { styles } from './styles';

interface InputFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  maxLength?: number;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  secureTextEntry,
  keyboardType,
  maxLength,
  errorMessage,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      )}
    />
    {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
  </View>
);

export default InputField;
