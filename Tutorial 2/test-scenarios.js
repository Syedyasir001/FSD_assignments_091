require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./index');

const Student = require('./models/Student');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');
const Claim = require('./models/Claim');

let server;
const PORT = 3999;
const BASE_URL = `http://127.0.0.1:${PORT}`;

let passedCount = 0;
let failedCount = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${testName}`);
    passedCount++;
  } else {
    console.error(`  \x1b[31m✖ FAIL\x1b[0m: ${testName} - ${details}`);
    failedCount++;
  }
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const method = options.method || 'GET';
  const headers = options.headers || {};
  
  if (!headers['Accept']) {
    headers['Accept'] = 'application/json';
  }
  if (options.body && typeof options.body === 'object') {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, {
    method,
    headers,
    body: options.body,
  });

  let data = null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  return { status: res.status, data, headers: res.headers };
}

async function runTests() {
  console.log('\n======================================================');
  console.log(' RUNNING COMPREHENSIVE TEST SUITE');
  console.log(' Campus Lost & Found Management System');
  console.log('======================================================\n');

  // Start test server
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));

  try {
    // --------------------------------------------------------
    console.log('\n--- 1. STUDENT PROFILES & VALIDATION ---');
    // --------------------------------------------------------

    // Test 1.1: Successful student creation
    const stuRes1 = await request('/students', {
      method: 'POST',
      body: {
        fullName: 'Test Student Alpha',
        email: 'alpha.test@campus.edu',
        department: 'Biotechnology',
        contactNumber: '+91 9123456780',
      },
    });
    assert(stuRes1.status === 201 && stuRes1.data.data._id, 'POST /students - Successful student creation', JSON.stringify(stuRes1.data));
    const studentAId = stuRes1.data.data?._id;

    // Test 1.2: Student B creation
    const stuRes2 = await request('/students', {
      method: 'POST',
      body: {
        fullName: 'Test Student Beta',
        email: 'beta.test@campus.edu',
        department: 'Physics',
        contactNumber: '+91 9123456781',
      },
    });
    assert(stuRes2.status === 201 && stuRes2.data.data._id, 'POST /students - Second student creation', JSON.stringify(stuRes2.data));
    const studentBId = stuRes2.data.data?._id;

    // Test 1.3: Duplicate email validation
    const dupRes = await request('/students', {
      method: 'POST',
      body: {
        fullName: 'Imposter Student',
        email: 'alpha.test@campus.edu',
        department: 'Chemistry',
        contactNumber: '+91 9123456799',
      },
    });
    assert(dupRes.status === 400 && dupRes.data.error.includes('already exists'), 'POST /students - Rejects duplicate email', dupRes.data.error);

    // Test 1.4: Invalid form data (missing/whitespace fields)
    const emptyRes = await request('/students', {
      method: 'POST',
      body: {
        fullName: '   ',
        email: 'invalid@campus.edu',
        department: 'Physics',
        contactNumber: '1234567',
      },
    });
    assert(emptyRes.status === 400, 'POST /students - Rejects whitespace-only name', emptyRes.data.error);

    // Test 1.5: Get student by ID
    const getStuRes = await request(`/students/${studentAId}`);
    assert(getStuRes.status === 200 && getStuRes.data.data.student.email === 'alpha.test@campus.edu', 'GET /students/:id - Retrieve profile by MongoDB ID');

    // Test 1.6: Invalid student ID
    const badStuIdRes = await request('/students/not-a-valid-id');
    assert(badStuIdRes.status === 400 && badStuIdRes.data.error.includes('Invalid Student ID format'), 'GET /students/:id - Rejects malformed ObjectId');

    // Test 1.7: Missing student record
    const fakeId = new mongoose.Types.ObjectId();
    const missingStuRes = await request(`/students/${fakeId}`);
    assert(missingStuRes.status === 404, 'GET /students/:id - Handles non-existent student 404');


    // --------------------------------------------------------
    console.log('\n--- 2. LOST-ITEM REPORTS & FILTERING ---');
    // --------------------------------------------------------

    // Test 2.1: Create lost item
    const lostRes = await request('/lost-items', {
      method: 'POST',
      body: {
        itemName: 'Blue Titan Watch',
        category: 'Accessories',
        description: 'Titan analog watch with navy blue dial and silver strap.',
        lastSeenLocation: 'Gymnasium Locker Room',
        reportedBy: studentAId,
      },
    });
    assert(lostRes.status === 201 && lostRes.data.data.itemName === 'Blue Titan Watch', 'POST /lost-items - Create lost item linked to student');
    const lostItemId = lostRes.data.data?._id;

    // Test 2.2: View lost item details
    const getLostRes = await request(`/lost-items/${lostItemId}`);
    assert(getLostRes.status === 200 && getLostRes.data.data.reportedBy._id === studentAId, 'GET /lost-items/:id - Dynamic details with populated reportedBy');

    // Test 2.3: List lost items with search query
    const searchLostRes = await request('/lost-items?search=Titan');
    assert(searchLostRes.status === 200 && searchLostRes.data.data.length >= 1, 'GET /lost-items?search=Titan - Search filter works dynamically');

    // Test 2.4: Invalid lost item ID
    const badLostId = await request('/lost-items/123xyz');
    assert(badLostId.status === 400, 'GET /lost-items/:id - Rejects malformed ID');


    // --------------------------------------------------------
    console.log('\n--- 3. FOUND-ITEM REPORTS ---');
    // --------------------------------------------------------

    // Test 3.1: Create found item (reported by Student A)
    const foundRes = await request('/found-items', {
      method: 'POST',
      body: {
        itemName: 'SanDisk 128GB Flash Drive',
        category: 'Electronics',
        description: 'Red and black sliding USB drive found near projector table.',
        foundLocation: 'Seminar Hall 1',
        reportedBy: studentAId,
      },
    });
    assert(foundRes.status === 201 && foundRes.data.data.itemName === 'SanDisk 128GB Flash Drive', 'POST /found-items - Create found item linked to student');
    const foundItemId = foundRes.data.data?._id;

    // Test 3.2: View found item details
    const getFoundRes = await request(`/found-items/${foundItemId}`);
    assert(getFoundRes.status === 200 && getFoundRes.data.data.item.status === 'Found', 'GET /found-items/:id - Retrieve found item details');


    // --------------------------------------------------------
    console.log('\n--- 4. CLAIMS, BUSINESS RULES & PERMISSIONS ---');
    // --------------------------------------------------------

    // Test 4.1: Self-claim check (Finder cannot claim own found item)
    const selfClaimRes = await request(`/found-items/${foundItemId}/claims`, {
      method: 'POST',
      body: {
        claimedBy: studentAId, // Student A found it
        reason: 'This is actually mine!',
      },
    });
    assert(selfClaimRes.status === 400 && selfClaimRes.data.error.includes('person who reported finding it'), 'POST /found-items/:id/claims - Finder cannot claim own found item');

    // Test 4.2: Valid claim submission by Student B (begins as Pending)
    const claimRes = await request(`/found-items/${foundItemId}/claims`, {
      method: 'POST',
      body: {
        claimedBy: studentBId,
        reason: 'The USB contains my Final Year Project presentation slides in PDF format named FYP_Beta.pdf.',
      },
    });
    assert(claimRes.status === 201 && claimRes.data.data.status === 'Pending', 'POST /found-items/:id/claims - New claim created with status=Pending');
    const claimId = claimRes.data.data?._id;

    // Test 4.3: Duplicate claim prevention (Thinking Challenge 4)
    const dupClaimRes = await request(`/found-items/${foundItemId}/claims`, {
      method: 'POST',
      body: {
        claimedBy: studentBId,
        reason: 'Second duplicate claim attempt.',
      },
    });
    assert(dupClaimRes.status === 409 && dupClaimRes.data.error.includes('already have an active'), 'POST /found-items/:id/claims - Prevent duplicate claim by same student (409 Conflict)');

    // Test 4.4: Ownership check (Thinking Challenge 1) - Student B CANNOT approve claim
    const unauthApproveRes = await request(`/claims/${claimId}/status`, {
      method: 'PATCH',
      body: {
        status: 'Approved',
        reviewerStudentId: studentBId, // Student B did NOT find the item!
      },
    });
    assert(unauthApproveRes.status === 403 && unauthApproveRes.data.error.includes('Forbidden'), 'PATCH /claims/:id/status - Unauthorized approval attempt rejected with 403 Forbidden');

    // Test 4.5: Authorized approval by the genuine finder (Student A)
    const authApproveRes = await request(`/claims/${claimId}/status`, {
      method: 'PATCH',
      body: {
        status: 'Approved',
        reviewerStudentId: studentAId, // Correct finder
      },
    });
    assert(authApproveRes.status === 200 && authApproveRes.data.data.status === 'Approved', 'PATCH /claims/:id/status - Authorized approval by finder succeeds');

    // Test 4.6: Item status marked as Returned upon approval
    const verifiedItemRes = await request(`/found-items/${foundItemId}`);
    assert(verifiedItemRes.data.data.item.status === 'Returned', 'PATCH /claims/:id/status - Found item automatically marked as Returned');

    // Test 4.7: State check (Thinking Challenge 3) - Reject new claims on Returned item
    // Create Student C
    const stuCRes = await request('/students', {
      method: 'POST',
      body: {
        fullName: 'Test Student Charlie',
        email: 'charlie.test@campus.edu',
        department: 'Civil Engineering',
        contactNumber: '+91 9123456782',
      },
    });
    const studentCId = stuCRes.data.data?._id;

    const claimReturnedRes = await request(`/found-items/${foundItemId}/claims`, {
      method: 'POST',
      body: {
        claimedBy: studentCId,
        reason: 'I want to claim this even though it is already returned.',
      },
    });
    assert(claimReturnedRes.status === 400 && claimReturnedRes.data.error.includes('already been marked as Returned'), 'POST /found-items/:id/claims - Reject claims on already returned item');

    // Test 4.8: Safe update verification (Thinking Challenge 5)
    // Check that claim reason and timestamps were preserved
    const checkClaim = await Claim.findById(claimId);
    assert(
      checkClaim.status === 'Approved' &&
      checkClaim.reason.includes('Final Year Project') &&
      checkClaim.claimedBy.toString() === studentBId.toString(),
      'Safe update - Claim record updated only status without overwriting reason or claimant'
    );

    console.log('\n======================================================');
    console.log(` TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
    console.log('======================================================\n');

  } catch (err) {
    console.error('Fatal test error:', err);
    failedCount++;
  } finally {
    if (server) {
      server.close();
    }
    await mongoose.disconnect();
    process.exit(failedCount > 0 ? 1 : 0);
  }
}

runTests();
