import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Função para validar o CPF
const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Verifica se o CPF tem 11 dígitos e não é uma sequência repetida

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
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
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>
            <Image source={require('../../assets/images/logoBlack.png')} style={styles.logo} />
          </View>

          <Text style={styles.title}>Cadastre-se</Text>
          <Text style={styles.subtitle}>Preencha os dados abaixo</Text>

          <Text style={styles.label}>Nome completo</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#A0A0A0"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

          <Text style={styles.label}>E-mail</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail ou código de parceiro"
                placeholderTextColor="#A0A0A0"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          <Text style={styles.label}>CPF</Text>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Digite seu CPF"
                placeholderTextColor="#A0A0A0"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                maxLength={11}
              />
            )}
          />
          {errors.cpf && <Text style={styles.errorText}>{errors.cpf.message}</Text>}

          <Text style={styles.label}>Telefone</Text>
          <View style={styles.phoneContainer}>
            <View style={styles.countryCodeContainer}>
              <Picker
                selectedValue={selectedCountryCode}
                style={styles.countryCodePicker}
                onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}
              >
                <Picker.Item label="+1" value="+1" />
                <Picker.Item label="+55" value="+55" />
                <Picker.Item label="+44" value="+44" />
              </Picker>
            </View>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.phoneInput]}
                  placeholder="DDD + celular"
                  placeholderTextColor="#A0A0A0"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              )}
            />
          </View>
          {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}

          <Text style={styles.label}>Crie uma senha</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#A0A0A0"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                  <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="#A0A0A0" />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

          <Text style={styles.label}>Repita a senha</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#A0A0A0"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!confirmPasswordVisible}
                />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIcon}>
                  <Ionicons name={confirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#A0A0A0" />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit(handleSignUp)}>
            <Text style={styles.buttonTextPrimary}>Criar conta</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#841245',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
    paddingLeft: 0, // Alinhado à esquerda com os outros componentes
    paddingTop: 0,
    paddingRight: 0,
  },
  subtitle: {
    fontSize: 16,
    color: '#667085',
    paddingBottom: 32,
    width: '100%',
    textAlign: 'left', // Alinhado à esquerda
    paddingLeft: 0,
    paddingRight: 0,
  },
  label: {
    fontSize: 14,
    color: '#841245',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 44,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 8,
    marginBottom: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  countryCodeContainer: {
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 8,
    marginRight: 8,
    height: 44, // Altura uniforme
    justifyContent: 'center',
  },
  countryCodePicker: {
    height: 44,
    width: 100,
  },
  phoneInput: {
    flex: 1,
    height: 44, // Altura uniforme
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  inputPassword: {
    flex: 1,
    height: 44,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 8,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  buttonPrimary: {
    width: 380, // Largura fixa
    height: 44,
    backgroundColor: '#D0005E',
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    alignSelf: 'center', // Centraliza o botão
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default SignUpScreen;
