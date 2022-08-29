import { createAxiosInstance, postRequest } from '@/shared/api';

interface LoginProps {
  email: string;
  nickname: string;
  snsId: string;
}

export const postKakaoLogin = async ({ email, nickname, snsId }: LoginProps) => {
  const { data } = await postRequest('/join/kakao', {
    email,
    nickname,
    snsId,
  });

  return data;
};
