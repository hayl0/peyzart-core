'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandscaperPage() {
  const router = useRouter();
  useEffect(() => { router.replace('/landscaper/dashboard'); }, [router]);
  return null;
}
