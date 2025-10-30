'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DebugAuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  const testLogin = async () => {
    setLogs([]);
    setIsLoading(true);

    try {
      const supabase = createClient();

      addLog('🔍 Step 1: Checking current session...');
      const { data: currentSession } = await supabase.auth.getSession();
      addLog(`Current session: ${currentSession.session ? 'EXISTS ✅' : 'NONE ❌'}`);

      if (currentSession.session) {
        addLog(`Current user: ${currentSession.session.user.email}`);
      }

      addLog('\n🔐 Step 2: Attempting login...');
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        addLog(`❌ LOGIN FAILED: ${loginError.message}`);
        addLog(`Error code: ${loginError.status}`);
        return;
      }

      addLog('✅ Login successful!');
      addLog(`User ID: ${loginData.user.id}`);
      addLog(`User email: ${loginData.user.email}`);
      addLog(`Session exists: ${loginData.session ? 'YES ✅' : 'NO ❌'}`);

      addLog('\n💾 Step 3: Checking localStorage...');
      await new Promise(resolve => setTimeout(resolve, 100));

      const allKeys = Object.keys(localStorage);
      addLog(`All localStorage keys: ${allKeys.length}`);

      const supabaseKeys = allKeys.filter(k => k.includes('supabase') || k.includes('sb-'));
      addLog(`Supabase keys found: ${supabaseKeys.length}`);

      supabaseKeys.forEach(key => {
        const value = localStorage.getItem(key);
        addLog(`  - ${key}: ${value ? `${value.substring(0, 50)}...` : 'EMPTY'}`);
      });

      addLog('\n🔄 Step 4: Verifying session again...');
      const { data: verifySession } = await supabase.auth.getSession();
      addLog(`Session after login: ${verifySession.session ? 'EXISTS ✅' : 'NONE ❌'}`);

      if (verifySession.session) {
        addLog(`Verified user: ${verifySession.session.user.email}`);
      }

      addLog('\n📊 Step 5: Checking user profile...');
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', loginData.user.id)
        .single();

      if (profileError) {
        addLog(`❌ Profile error: ${profileError.message}`);
      } else {
        addLog(`✅ Profile found: ${profile.email || profile.full_name || 'NO NAME'}`);
      }

      addLog('\n✅ ALL TESTS COMPLETED!');

    } catch (error: any) {
      addLog(`❌ UNEXPECTED ERROR: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const checkStorageDirectly = () => {
    setLogs([]);
    addLog('🔍 Checking localStorage directly...');

    const allKeys = Object.keys(localStorage);
    addLog(`Total keys in localStorage: ${allKeys.length}`);

    allKeys.forEach(key => {
      const value = localStorage.getItem(key);
      addLog(`  ${key}: ${value ? `${value.substring(0, 100)}...` : 'EMPTY'}`);
    });
  };

  const clearStorage = () => {
    localStorage.clear();
    addLog('🗑️ localStorage cleared!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔧 Debug Authentication</h1>

        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Test Login</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 text-white"
                placeholder="••••••••"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={testLogin}
                disabled={isLoading || !email || !password}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded font-medium"
              >
                {isLoading ? 'Testing...' : 'Test Login'}
              </button>

              <button
                onClick={checkStorageDirectly}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded font-medium"
              >
                Check Storage
              </button>

              <button
                onClick={clearStorage}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-medium"
              >
                Clear Storage
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">📋 Logs</h2>

          {logs.length === 0 ? (
            <p className="text-gray-400">No logs yet. Click "Test Login" to start.</p>
          ) : (
            <div className="bg-black p-4 rounded font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className={
                  log.includes('❌') ? 'text-red-400' :
                  log.includes('✅') ? 'text-green-400' :
                  log.includes('⚠️') ? 'text-yellow-400' :
                  'text-gray-300'
                }>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <p>Cette page de debug va tester TOUS les aspects de l'authentification :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Vérifier la session actuelle</li>
            <li>Tester le login Supabase</li>
            <li>Vérifier la persistence dans localStorage</li>
            <li>Vérifier le profil utilisateur</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
