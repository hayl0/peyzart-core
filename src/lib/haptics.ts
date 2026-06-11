/**
 * Peyzart Native Haptic Manager
 * Provides physical feedback for mobile interactions using Capacitor Haptics.
 * 
 * @module Haptics
 */

import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

/**
 * Trigger a light impact feedback. 
 * Perfect for button clicks and small interactions.
 */
export const hapticImpactLight = async () => {
  if (isNative) {
    await Haptics.impact({ style: ImpactStyle.Light });
  }
};

/**
 * Trigger a medium impact feedback.
 * Used for major toggles or selections.
 */
export const hapticImpactMedium = async () => {
  if (isNative) {
    await Haptics.impact({ style: ImpactStyle.Medium });
  }
};

/**
 * Trigger a success notification feedback.
 */
export const hapticSuccess = async () => {
  if (isNative) {
    await Haptics.notification({ type: NotificationType.Success });
  }
};

/**
 * Trigger a warning/error feedback.
 */
export const hapticError = async () => {
  if (isNative) {
    await Haptics.notification({ type: NotificationType.Error });
  }
};

/**
 * Feedback for selection changes (pickers, sliders).
 */
export const hapticSelection = async () => {
  if (isNative) {
    await Haptics.selectionChanged();
  }
};
