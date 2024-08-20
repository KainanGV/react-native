// screens/SignUpScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SignUpHeader from '../components/SignUpHeader';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import PickerField from '../components/PickerField';
import PasswordField from '../components/PasswordField';
import { validateCPF } from '../utils/validateCPF';

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');

  const validationSchema = yup.object().shape({
    name: yup.string().required('Nome completo é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    cpf: yup.string()
      .length(11, 'CPF deve ter 11 dígitos')
      .test('cpf-is-valid', 'CPF inválido', value => validateCPF(value || ''))
      .required('CPF é obrigatório'),
    phoneNumber: yup.string().min(10, 'Telefone deve ter pelo menos 10 dígitos').required('Telefone é obrigatório'),
    password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'As senhas não coincidem')
      .required('Confirmação de senha é obrigatória'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSignUp = async (data: any) => {
    try {
      const response = await axios.post('https://don-saude-server-dev-e347759d6bc1.herokuapp.com/mobile/patient/auth/create', {
        ...data,
        phoneNumber: `${selectedCountryCode}${data.phoneNumber}`,
      });
  
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Paciente criado com sucesso!');
        router.push('../login');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar o paciente.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#841245' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.toolbar} />

        <View style={styles.content}>
          <SignUpHeader />
          <InputField control={control} name="name" label="Nome completo" placeholder="Digite seu nome completo" errorMessage={errors.name?.message} />
          <InputField control={control} name="email" label="E-mail" placeholder="Digite seu e-mail ou código de parceiro" keyboardType="email-address" errorMessage={errors.email?.message} />
          <InputField control={control} name="cpf" label="CPF" placeholder="Digite seu CPF" keyboardType="numeric" maxLength={11} errorMessage={errors.cpf?.message} />
          <PickerField selectedValue={selectedCountryCode} onValueChange={setSelectedCountryCode} options={[]} />
          <InputField control={control} name="phoneNumber" label="Telefone" placeholder="DDD + celular" keyboardType="phone-pad" errorMessage={errors.phoneNumber?.message} />
          <PasswordField control={control} name="password" label="Crie uma senha" errorMessage={errors.password?.message} />
          <PasswordField control={control} name="confirmPassword" label="Repita a senha" errorMessage={errors.confirmPassword?.message} />
          <SubmitButton onPress={handleSubmit(handleSignUp)} title={''} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#841245',
  },
  toolbar: {
    backgroundColor: '#841245',
    height: 60,
  },
  content: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 44,
    marginTop: -24,
  },
});

export default SignUpScreen;
