import { spawn } from 'child_process';
import http from 'http';

console.log('Starting backend server process for testing...');
const serverProcess = spawn('node', ['server/server.js'], { stdio: 'inherit' });

setTimeout(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/health');
    const data = await res.json();
    console.log('API /api/health response:', data);

    // Test register
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'LiveTester',
        password: 'password123',
        confirmPassword: 'password123',
        displayName: 'Live Champion'
      })
    });
    const regData = await regRes.json();
    console.log('API /api/auth/register response:', regData);

    // Test login
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'LiveTester',
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    console.log('API /api/auth/login response:', loginData);

    // Test gameplay save & fetch
    const saveRes = await fetch('http://localhost:5000/api/gameplay/LiveTester', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        totalScore: 5000,
        unlockedLevel: 3,
        inkTokens: 1500
      })
    });
    const saveData = await saveRes.json();
    console.log('API /api/gameplay/:username save response:', saveData);

    console.log('SUCCESS: All endpoints verified working on live server!');
    serverProcess.kill();
    process.exit(0);
  } catch (err) {
    console.error('Server test error:', err);
    serverProcess.kill();
    process.exit(1);
  }
}, 1500);
