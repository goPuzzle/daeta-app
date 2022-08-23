import { login } from '@react-native-seoul/kakao-login';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();

      console.log(token);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('login err', err);
    }
  };

  return (
    <SafeAreaView>
      <Pressable style={styles.kakaoButtonContainer} onPress={() => signInWithKakao()}>
        <Text style={styles.kakaoButtonText}>카카오톡으로 시작</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  kakaoButtonContainer: {
    marginTop: '100%',
    backgroundColor: '#FFE400',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 24,
    borderRadius: 6,
  },
  kakaoButtonText: {
    color: '#662500',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
});

export default Login;
