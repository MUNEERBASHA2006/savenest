import React, { createContext, useContext, useState, useEffect } from 'react';

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

import { db } from '../firebase';
import { useAuth } from './AuthContext';

export interface Transaction {
  id: string;
  title: string;
  time: string;
  amount: number;
  type: string;
  notes?: string;
  userId?: string;
  iconType:
    | 'ShoppingCart'
    | 'Car'
    | 'Coffee'
    | 'GraduationCap'
    | 'Utensils'
    | 'FileText';
}

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (
    transaction: Omit<Transaction, 'id' | 'time'>
  ) => Promise<void>;
}

const TransactionsContext = createContext<
  TransactionsContextType | undefined
>(undefined);

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const auth = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'transactions'),
      orderBy('time', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Transaction[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Transaction, 'id'>),
      }));

      setTransactions(data);
    });

    return () => unsubscribe();
  }, []);

  const addTransaction = async (
    t: Omit<Transaction, 'id' | 'time'>
  ) => {
    await addDoc(collection(db, 'transactions'), {
      ...t,
      userId: auth?.user?.uid,
      time: new Date().toISOString(),
    });
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (context === undefined) {
    throw new Error(
      'useTransactions must be used within a TransactionsProvider'
    );
  }

  return context;
}