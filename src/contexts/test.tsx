import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { logInAsync } from 'expo-google-app-auth';

import { AuthProvider, useAuth } from './Auth';

jest.mock('expo-google-app-auth');

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValue({
      type: 'success',
      user: {
        id: '1',
        email: 'teste@teste.com.br',
        name: 'Teste',
        photo: 'teste.png'
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('teste@teste.com.br');
  });

  it('should not be connect if cancel authentication with Google', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValue({
      type: 'cancel'
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
});
