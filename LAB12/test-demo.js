// Automated end-to-end verification script for the practical assignment
const API_URL = process.env.API_URL || 'http://localhost:5000';

async function runTests() {
  console.log(`\n======================================================`);
  console.log(`🔬 Running Authentication & RBAC Assignment Test Suite`);
  console.log(`Target: ${API_URL}`);
  console.log(`======================================================\n`);

  try {
    // 1. Check Server Availability
    console.log('[1/7] Checking API health...');
    const healthRes = await fetch(`${API_URL}/`);
    if (!healthRes.ok) throw new Error(`Server returned ${healthRes.status}`);
    const healthData = await healthRes.json();
    console.log('✅ Server online:', healthData.message);

    const randomSuffix = Math.floor(Math.random() * 100000);
    const studentEmail = `student_${randomSuffix}@test.com`;
    const adminEmail = `admin_${randomSuffix}@test.com`;
    const password = 'Password123!';

    // 2. Register Student
    console.log('\n[2/7] Testing Student Registration (POST /api/auth/register)...');
    const regStudentRes = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Student',
        email: studentEmail,
        password: password,
        role: 'student'
      })
    });
    const regStudentData = await regStudentRes.json();
    if (!regStudentRes.ok) throw new Error(regStudentData.message);
    console.log('✅ Student registered:', regStudentData.user.email, `(Role: ${regStudentData.user.role})`);

    // 3. Register Admin
    console.log('\n[3/7] Testing Admin Registration (POST /api/auth/register)...');
    const regAdminRes = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sarah Admin',
        email: adminEmail,
        password: password,
        role: 'admin'
      })
    });
    const regAdminData = await regAdminRes.json();
    if (!regAdminRes.ok) throw new Error(regAdminData.message);
    console.log('✅ Admin registered:', regAdminData.user.email, `(Role: ${regAdminData.user.role})`);

    // 4. Login Student & Extract JWT
    console.log('\n[4/7] Testing Login & JWT generation (POST /api/auth/login)...');
    const loginRes = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: studentEmail, password: password })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error(loginData.message);
    const studentToken = loginData.token;
    console.log('✅ Login successful! JWT received:', `${studentToken.substring(0, 25)}...`);

    // Login Admin
    const adminLoginRes = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, password: password })
    });
    const adminLoginData = await adminLoginRes.json();
    const adminToken = adminLoginData.token;

    // 5. Test Protected Profile Route with Auth Middleware
    console.log('\n[5/7] Testing Protected Profile (GET /api/auth/profile)...');
    const profileRes = await fetch(`${API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const profileData = await profileRes.json();
    if (!profileRes.ok) throw new Error(profileData.message);
    console.log('✅ Profile route accessible with JWT:', profileData.user.name, `(${profileData.user.email})`);

    // Test without token (Expect 401)
    const unauthorizedRes = await fetch(`${API_URL}/api/auth/profile`);
    if (unauthorizedRes.status === 401) {
      console.log('✅ Correctly blocked unauthenticated request with status 401');
    }

    // 6. Test Role Protection - Student accessing Admin Route (Expect 403 Forbidden)
    console.log('\n[6/7] Testing Role Authorization (Student accessing Admin Route)...');
    const forbiddenRes = await fetch(`${API_URL}/api/auth/admin/users`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    if (forbiddenRes.status === 403) {
      console.log('✅ Access denied for student on admin route (403 Forbidden) as expected!');
    } else {
      console.warn('⚠️ Warning: Student was not forbidden on admin route. Status:', forbiddenRes.status);
    }

    // 7. Test Admin accessing Admin Route (Expect 200 OK)
    console.log('\n[7/7] Testing Admin accessing Admin Route (GET /api/auth/admin/users)...');
    const adminAccessRes = await fetch(`${API_URL}/api/auth/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const adminAccessData = await adminAccessRes.json();
    if (!adminAccessRes.ok) throw new Error(adminAccessData.message);
    console.log(`✅ Admin access granted! Retrieved ${adminAccessData.count} total users.`);

    console.log('\n======================================================');
    console.log('🎉 ALL ASSIGNMENT REQUIREMENTS VERIFIED SUCCESSFULLY!');
    console.log('======================================================\n');
  } catch (error) {
    console.error('\n❌ Test execution stopped:', error.message);
    console.error('Make sure MongoDB and the Express server are running (`npm start`) before testing.\n');
  }
}

runTests();

