import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext
} from 'react';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_AUTH_ANDROID, GOOGLE_AUTH_IOS } from '@env';

type AuthProviderProps = {
  children?: ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type AuthContextData = {
  user: User;
  userStorageLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  useEffect(() => {
    async function loadUserStorageData() {
      const oldData = await AsyncStorage.getItem('@gofinances:user');
      const currentData = oldData ? JSON.parse(oldData) : {};

      setUser(currentData);
      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);

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
        const name = credential.fullName!.givenName!;

        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo: `https://ui-avatars.com/api/?name=${name}`
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

  async function signOut() {
    try {
      await AsyncStorage.removeItem('@gofinances:user');
      setUser({} as User);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userStorageLoading,
        signInWithGoogle,
        signInWithApple,
        signOut
      }}
    >
      {!!children && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
