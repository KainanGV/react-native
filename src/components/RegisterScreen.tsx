import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object().shape({
  login: yup.string().required('O login é obrigatório.'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória.'),
});

const RegisterScreen: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = async (data: any) => {
    try {
      const response = await axios.post('https://don-saude-server-dev-e347759d6bc1.herokuapp.com/mobile/patient/auth/signin', data);

      if (response.status === 200) {
        const { access_token } = response.data;
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        router.push('../home');
        // Salvar token ou redirecionar o usuário conforme necessário
      } else {
        Alert.alert('Erro', 'Falha ao realizar o login.');
      }
    } catch (error) {
      console.error("error",JSON.stringify(error));
      Alert.alert('Erro', 'Falha ao realizar o login.');
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

          <View style={styles.imageContainer}>
            <Image source={require('../../assets/images/registerImage.png')} style={styles.image} />
          </View>
          <Text style={styles.title}>Acesse</Text>
          <Text style={styles.subtitle}>Entre com seus dados de acesso Don Saúde.</Text>

          <Text style={styles.label}>E-mail ou Código</Text>
          <Controller
            control={control}
            name="login"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail ou código de parceiro"
                placeholderTextColor="#A0A0A0"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.login && <Text style={styles.errorText}>{errors.login.message}</Text>}

          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    style={styles.inputPassword}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={!passwordVisible}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                    <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="#A0A0A0" />
                  </TouchableOpacity>
                </>
              )}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
          </View>

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit(handleLogin)}>
            <Text style={styles.buttonTextPrimary}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonTextSecondary}>Esqueceu sua senha?</Text>
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
    height: 60, // Altura do topo
  },
  content: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 44,
    marginTop: -24, // Para sobrepor a borda arredondada no topo rosa
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    paddingTop: 24, // Adicionado para garantir que o header fique dentro do container branco
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 299.84,
    height: 291.89,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#841245',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 24,
    textAlign: 'left',
    width: '100%',
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
  inputPassword: {
    flex: 1,
    height: 44,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  buttonPrimary: {
    width: '100%',
    height: 44,
    backgroundColor: '#D0005E',
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 500,
    backgroundColor: 'transparent', // Mantém o fundo transparente para o botão
  },
  buttonTextSecondary: {
    color: '#D0005E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default RegisterScreen;
