import { useState } from 'react';

type UserResults = {
  ux: string;
  frontend: string;
  backend: string;
};

function useLocalStorage<T>(key: string, initialValue: UserResults) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error retrieving localStorage item:', error);
      return initialValue;
    }
  });

  const setValue = (value: any | ((val: any) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
