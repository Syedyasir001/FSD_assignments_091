require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');
const Claim = require('./models/Claim');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus_lost_found';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Promise.all([
      Student.deleteMany({}),
      LostItem.deleteMany({}),
      FoundItem.deleteMany({}),
      Claim.deleteMany({}),
    ]);
    console.log('Cleared existing collections.');

    // 1. Create Students
    const studentsData = [
      {
        fullName: 'Aarav Sharma',
        email: 'aarav.sharma@campus.edu',
        department: 'Computer Science & Engineering',
        contactNumber: '+91 98765 43210',
      },
      {
        fullName: 'Priya Patel',
        email: 'priya.patel@campus.edu',
        department: 'Electronics & Communication',
        contactNumber: '+91 98123 45678',
      },
      {
        fullName: 'Rohan Mehta',
        email: 'rohan.mehta@campus.edu',
        department: 'Mechanical Engineering',
        contactNumber: '+91 97234 56789',
      },
      {
        fullName: 'Ananya Iyer',
        email: 'ananya.iyer@campus.edu',
        department: 'Information Technology',
        contactNumber: '+91 96345 67890',
      },
      {
        fullName: 'Vikram Singh',
        email: 'vikram.singh@campus.edu',
        department: 'Business Administration',
        contactNumber: '+91 95456 78901',
      },
    ];

    const students = await Student.insertMany(studentsData);
    console.log(`Created ${students.length} students.`);

    const [aarav, priya, rohan, ananya, vikram] = students;

    // 2. Create Lost Items
    const lostItemsData = [
      {
        itemName: 'Sony WH-1000XM4 Wireless Headphones (Black)',
        category: 'Electronics',
        description: 'Black over-ear noise-cancelling headphones inside a matte grey hard travel case. Case has a small scratch near the zipper.',
        lastSeenLocation: 'Central Library, 2nd Floor Study Room 204',
        dateLost: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        status: 'Lost',
        reportedBy: aarav._id,
      },
      {
        itemName: 'Leather College ID Card Holder with Lanyard',
        category: 'Documents & IDs',
        description: 'Dark brown leather badge holder containing University ID card for Priya Patel, plus campus hostel mess card.',
        lastSeenLocation: 'Engineering Block Cafeteria, Counter #2',
        dateLost: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        status: 'Lost',
        reportedBy: priya._id,
      },
      {
        itemName: 'Scientific Calculator Casio fx-991EX',
        category: 'Books & Stationery',
        description: 'ClassWiz model with name initials "RM" etched on the back cover with permanent marker.',
        lastSeenLocation: 'Mechanical Workshop Hall B',
        dateLost: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'Lost',
        reportedBy: rohan._id,
      },
      {
        itemName: 'Set of 3 Bike Keys with Batman Keychain',
        category: 'Keys',
        description: 'Two Honda motorcycle keys and a small padlock key attached to a metal Batman symbol keyring.',
        lastSeenLocation: 'Student Parking Lot Area C',
        dateLost: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'Lost',
        reportedBy: vikram._id,
      },
    ];

    const lostItems = await LostItem.insertMany(lostItemsData);
    console.log(`Created ${lostItems.length} lost items.`);

    // 3. Create Found Items
    const foundItemsData = [
      {
        itemName: 'Apple AirPods Pro 2nd Gen (White Case)',
        category: 'Electronics',
        description: 'White charging case found on a wooden bench. Case has a subtle matte silicone protective sleeve with a carabiner.',
        foundLocation: 'Campus Sports Ground, Bleachers near Pavilion',
        dateFound: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'Found',
        reportedBy: ananya._id,
      },
      {
        itemName: 'Stainless Steel Milton Water Bottle (Matte Blue, 750ml)',
        category: 'Accessories',
        description: 'Blue insulated water flask with some mountain hiking stickers around the lower rim.',
        foundLocation: 'Auditorium Row G, Seat 14',
        dateFound: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'Found',
        reportedBy: aarav._id,
      },
      {
        itemName: 'Data Structures and Algorithms Textbook (Cormen)',
        category: 'Books & Stationery',
        description: 'Hardcover edition of CLRS DSA textbook. Left on table with sticky note markers inside Chapter 4.',
        foundLocation: 'Library Quiet Reading Zone, Table 8',
        dateFound: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        status: 'Returned', // Already claimed & returned demonstration
        reportedBy: priya._id,
      },
    ];

    const foundItems = await FoundItem.insertMany(foundItemsData);
    console.log(`Created ${foundItems.length} found items.`);

    const [airpods, waterBottle, clrsBook] = foundItems;

    // 4. Create Claims
    const claimsData = [
      {
        foundItemId: airpods._id,
        claimedBy: rohan._id,
        reason: 'I was jogging at the sports ground yesterday evening and dropped my AirPods case. The Bluetooth device name is "Rohan Pro" and inside the silicone sleeve there is a tiny sticker of a red dragon.',
        status: 'Pending',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
      {
        foundItemId: waterBottle._id,
        claimedBy: vikram._id,
        reason: 'This is my Milton bottle from the college orientation event. The sticker has "Himalayan Trek 2025" printed on it.',
        status: 'Pending',
        createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      },
      {
        foundItemId: clrsBook._id,
        claimedBy: ananya._id,
        reason: 'I forgot my CLRS hardcover in the library after exam prep. The first page contains my student registration roll number written in pencil.',
        status: 'Approved',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
    ];

    const claims = await Claim.insertMany(claimsData);
    console.log(`Created ${claims.length} claims.`);

    console.log('\n======================================================');
    console.log(' SEEDING COMPLETED SUCCESSFULLY!');
    console.log(' Sample Student IDs for quick testing:');
    students.forEach((s) => {
      console.log(` - ${s.fullName} (${s.department}): ID = ${s._id}`);
    });
    console.log('======================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
