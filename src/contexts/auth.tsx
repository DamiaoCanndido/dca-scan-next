'use client';
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from 'react';

export interface childrenType {
  children: ReactNode;
}

interface ContextProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<ContextProps>({
  username: '',
  setUsername: (): string => '',
  token: '',
  setToken: (): string => '',
});

export const AuthContextProvider = (props: childrenType) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{ username, setUsername, token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthContextGlobal = () => {
  return useContext(AuthContext);
};
