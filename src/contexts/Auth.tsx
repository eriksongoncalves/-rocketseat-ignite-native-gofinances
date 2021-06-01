import React, { useState, createContext, ReactNode, useContext } from 'react';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_AUTH_ANDROID, GOOGLE_AUTH_IOS } from '@env';

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type AuthContextData = {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId: GOOGLE_AUTH_IOS,
        androidClientId: GOOGLE_AUTH_ANDROID,
        scopes: ['email', 'profile']
      });

      if (result.type === 'success') {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        };

        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged)
        );

        setUser(userLogged);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: undefined
        };

        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged)
        );

        setUser(userLogged);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
