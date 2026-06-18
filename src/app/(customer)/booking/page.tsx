import { Suspense } from 'react';
import BookingForm from './BookingForm';

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-bright-green/30 border-t-bright-green rounded-full animate-spin" />
      </div>
    }>
      <BookingForm />
    </Suspense>
  );
}
