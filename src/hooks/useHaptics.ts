/**
 * Peyzart Native Haptic Hook
 * Architecture: Service-Oriented Hook
 */

"use client";

import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';
import { useCallback } from 'react';

const isNative = typeof window !== 'undefined' && Capacitor.isNativePlatform();

export const useHaptics = () => {
  const triggerImpactLight = useCallback(async () => {
    if (isNative) await Haptics.impact({ style: ImpactStyle.Light });
  }, []);

  const triggerImpactMedium = useCallback(async () => {
    if (isNative) await Haptics.impact({ style: ImpactStyle.Medium });
  }, []);

  const triggerSuccess = useCallback(async () => {
    if (isNative) await Haptics.notification({ type: NotificationType.Success });
  }, []);

  const triggerError = useCallback(async () => {
    if (isNative) await Haptics.notification({ type: NotificationType.Error });
  }, []);

  return {
    triggerImpactLight,
    triggerImpactMedium,
    triggerSuccess,
    triggerError,
  };
};
