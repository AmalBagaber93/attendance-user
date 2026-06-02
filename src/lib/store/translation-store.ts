'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { create } from 'zustand';
import { MessageType } from '../@types';

interface TranslationsStore {
  t?: (key: MessageType) => string;
  setT: (t: (key: MessageType) => string) => void;
}

export const useTranslationsStore = create<TranslationsStore>(set => ({
  setT: t => {
    set({ t });
  },
}));

export const getTranslationsStore = () => useTranslationsStore.getState().t;

export const TranslationsStoreProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const t = useTranslations();
  useEffect(() => {
    useTranslationsStore.getState().setT(t);
  }, [t]);

  return children;
};
