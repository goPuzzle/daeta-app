import { getProfile, KakaoProfile, login } from '@react-native-seoul/kakao-login';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import { postKakaoLogin } from '@/shared/api/auth';
import { ENCRYPTED_STORAGE_KEY } from '@/shared/constants';

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login = ({ setIsLoggedIn }: Props) => {
  const signInWithKakao = async () => {
    try {
      await login();
      const { email, nickname, id: snsId } = (await getProfile()) as KakaoProfile;

      const { data } = await postKakaoLogin({ email, nickname, snsId });
      const { accessToken, refreshToken } = data;

      await EncryptedStorage.setItem(ENCRYPTED_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      await EncryptedStorage.setItem(ENCRYPTED_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('login err', err);
    }
  };

  return (
    <SafeAreaView>
      {/* <Pressable style={styles.kakaoButtonContainer} onPress={signOutWithKakao}>
        <View style={{ marginTop: 40 }}>
          <Text>로그아웃하기</Text>
        </View>
      </Pressable> */}
      <Pressable style={styles.kakaoButtonContainer} onPress={signInWithKakao}>
        <Text style={styles.kakaoButtonText}>카카오톡으로 시작</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  kakaoButtonContainer: {
    backgroundColor: '#FFE400',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 24,
    marginBottom: 10,
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
