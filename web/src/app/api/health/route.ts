import { NextResponse } from 'next/server';
import { hasSupabaseCredentials } from '@/lib/env';

export function GET() {
  return NextResponse.json({
    status: 'ok',
    supabase: hasSupabaseCredentials ? 'configured' : 'missing-env',
    timestamp: new Date().toISOString(),
  });
}
