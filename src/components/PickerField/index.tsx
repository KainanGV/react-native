import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles';

interface PickerFieldProps {
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  options: { label: string; value: string }[];
}

const PickerField: React.FC<PickerFieldProps> = ({ selectedValue, onValueChange, options }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={onValueChange}
      >
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
};

export default PickerField;
