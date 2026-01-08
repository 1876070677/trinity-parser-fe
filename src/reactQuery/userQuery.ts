import { useMutation, useQuery } from '@tanstack/react-query';

import { BASE_URL } from '@/common/const';
import { throwIfNotOk } from '@/lib/httpError';
import { LoginParams, UserInfo } from '@/common/types/user';

const loginProcess = async ({ id, password }: LoginParams) => {
  // 1. /api/login-form 요청
  const loginFormRes = await fetch(`${BASE_URL}/api/login-form`, {
    method: 'POST',
  });
  throwIfNotOk(loginFormRes, 'login-form 요청 실패');
  const { samlRequest } = await loginFormRes.json();

  // 2. /api/auth 요청 (id, password, samlRequest body에 포함)
  const authRes = await fetch(`${BASE_URL}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, password, samlRequest }),
  });
  throwIfNotOk(authRes, 'auth 요청 실패');
  const { samlResponse } = await authRes.json();

  // 3. /api/login 요청 (samlResponse body에 포함)
  const loginRes = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ samlResponse }),
  });
  throwIfNotOk(loginRes, 'login 요청 실패');

  const data = await loginRes.json();
  localStorage.setItem('accessToken', data.accessToken);
  return data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginProcess,
  });
};

const logoutProcess = async () => {
  const res = await fetch(`${BASE_URL}/api/logout`, {
    method: 'POST',
  });
  localStorage.removeItem('accessToken');
  throwIfNotOk(res, 'logout 요청 실패');
  return res.json();
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutProcess,
  });
};

const fetchUserInfo = async (): Promise<UserInfo> => {
  const res = await fetch(`${BASE_URL}/api/user-info`, {
    method: 'GET',
  });
  throwIfNotOk(res, 'user-info 요청 실패');
  const data = await res.json();
  return data.userInfo;
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });
};