import React, { useState } from 'react';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButton, Icon, Button, Text, useToast, ScrollView, VStack, Input, FormControl, Pressable, Center } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../services/Login';

const HomeScreen = ({ navigation }) => {
  // const { login } = useAuth() as any;
  const [isFetching, setIsFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <ScrollView>
        <Formik
          validateOnMount
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .min(1, 'Contraseña demasiado corta!')
              .max(50, 'Contraseña demasiado larga!'),
            email: Yup.string()
              .email('Correo inválido')
          })}
          onSubmit={async (values, {
            resetForm,
            setErrors,
            setStatus,
            setSubmitting,
          }): Promise<void> => {
            try {
              // setIsFetching(true);
              // await login(values.email.toLowerCase(), values.password);
              const { email, password } = values;
              const response = await loginUser({
                email,
                password
              });
              console.log('respuestaAxiosHoli', response);
              if (response === 200 ) {
                navigation.navigate('Profile');
              } else {
                console.log('FALLO');
              }
              resetForm();
            } catch (err) {
              console.error(err);
            }
            setSubmitting(false);
            setIsFetching(false);
          }}
        >
          {({
            handleChange,
            handleBlur,
            errors,
            isValid,
            handleSubmit,
            values,
            touched
          }) => (
            <VStack space={5} m={5}>
              <FormControl isInvalid={'email' in errors && 'email' in touched}>
                <Input
                  minH="12"
                  placeholder="Correo electrónico"
                  keyboardType={'email-address'}
                  autoCapitalize='none'
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  value={values.email}
                />
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={'password' in errors && 'password' in touched}>
                <Input
                  minH="12"
                  placeholder="Contraseña"
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  secureTextEntry={!showPassword}
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  value={values.password}
                  InputRightElement={
                    <IconButton
                      variant="ghost"
                      colorScheme="gray"
                      icon={<Icon as={Ionicons} name={showPassword ? 'eye-off' : 'eye'} size={30} color="gray.500" />}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
                <FormControl.ErrorMessage>
                  {errors.password}
                </FormControl.ErrorMessage>
              </FormControl>
              <Button
                onPress={handleSubmit}
                colorScheme="primary"
                rounded={12}
              >
                Ingresar
              </Button>
            </VStack>
          )}
        </Formik>
      </ScrollView>
      <KeyboardAccessoryNavigation
        doneButtonTitle="Hecho"
        avoidKeyboard
        androidAdjustResize
        nextHidden={true}
        previousHidden={true}
      />
    </>
  );
};

export default HomeScreen;
