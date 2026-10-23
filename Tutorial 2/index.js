require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

// Import Models
const Student = require('./models/Student');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');
const Claim = require('./models/Claim');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus_lost_found';

// Database Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// View Engine & Middleware Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Support HTTP method override for HTML forms (query param & body field)
app.use(
  methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
    if (req.query && '_method' in req.query) {
      return req.query._method;
    }
    return undefined;
  })
);

// Global view variables (helpers, query params for alerts)
app.use((req, res, next) => {
  res.locals.successMessage = req.query.success || null;
  res.locals.errorMessage = req.query.error || null;
  res.locals.currentPath = req.path;
  next();
});

// Helper: respond in JSON or redirect/render based on request type
function sendResponse(req, res, { status = 200, json, redirectUrl, renderView, renderData }) {
  const isApi =
    req.xhr ||
    (req.headers.accept && req.headers.accept.includes('application/json')) ||
    req.is('json') ||
    req.query.format === 'json';

  if (isApi) {
    return res.status(status).json(json);
  }

  if (redirectUrl) {
    return res.redirect(redirectUrl);
  }

  if (renderView) {
    return res.status(status).render(renderView, renderData);
  }

  return res.status(status).json(json);
}

// Helper: render error response or error page
function sendError(req, res, { status = 400, message, details = null }) {
  const isApi =
    req.xhr ||
    (req.headers.accept && req.headers.accept.includes('application/json')) ||
    req.is('json') ||
    req.query.format === 'json';

  if (isApi) {
    return res.status(status).json({
      success: false,
      error: message,
      details,
    });
  }

  return res.status(status).render('error', {
    status,
    message,
    details,
  });
}

// ==========================================
// 1. HOME & DASHBOARD
// ==========================================
app.get('/', async (req, res, next) => {
  try {
    const [
      totalLost,
      totalFound,
      totalReturned,
      totalStudents,
      recentLost,
      recentFound,
    ] = await Promise.all([
      LostItem.countDocuments(),
      FoundItem.countDocuments(),
      FoundItem.countDocuments({ status: 'Returned' }),
      Student.countDocuments(),
      LostItem.find().sort({ createdAt: -1 }).limit(5).populate('reportedBy'),
      FoundItem.find().sort({ createdAt: -1 }).limit(5).populate('reportedBy'),
    ]);

    res.render('home', {
      stats: {
        totalLost,
        totalFound,
        totalReturned,
        totalStudents,
      },
      recentLost,
      recentFound,
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// 2. STUDENT ROUTES
// ==========================================

// GET /students - List all registered students (useful for directory & forms)
app.get('/students', async (req, res, next) => {
  try {
    const students = await Student.find().sort({ fullName: 1 });
    sendResponse(req, res, {
      status: 200,
      json: { success: true, count: students.length, data: students },
      renderView: 'students',
      renderData: { students },
    });
  } catch (err) {
    next(err);
  }
});

// GET /register-student - Form to register a student
app.get('/register-student', (req, res) => {
  res.render('register-student', { errors: null, formData: {} });
});

// POST /students - Create a student profile
app.post('/students', async (req, res) => {
  try {
    const { fullName, email, department, contactNumber } = req.body;

    // Validate whitespace or missing fields
    if (
      !fullName || !fullName.trim() ||
      !email || !email.trim() ||
      !department || !department.trim() ||
      !contactNumber || !contactNumber.trim()
    ) {
      return sendError(req, res, {
        status: 400,
        message: 'All fields (Full Name, College Email, Department, Contact Number) are required and cannot be empty.',
      });
    }

    // Check duplicate email
    const cleanEmail = email.trim().toLowerCase();
    const existing = await Student.findOne({ email: cleanEmail });
    if (existing) {
      return sendError(req, res, {
        status: 400,
        message: `A student with college email '${cleanEmail}' already exists. Please use a unique email address.`,
      });
    }

    const student = new Student({
      fullName: fullName.trim(),
      email: cleanEmail,
      department: department.trim(),
      contactNumber: contactNumber.trim(),
    });

    await student.save();

    return sendResponse(req, res, {
      status: 201,
      json: { success: true, message: 'Student registered successfully', data: student },
      redirectUrl: `/students/${student._id}?success=${encodeURIComponent('Student profile created successfully!')}`,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return sendError(req, res, {
        status: 400,
        message: 'Validation failed: ' + messages.join(', '),
        details: messages,
      });
    }
    if (err.code === 11000) {
      return sendError(req, res, {
        status: 400,
        message: 'A student with this email address already exists.',
      });
    }
    return sendError(req, res, {
      status: 500,
      message: 'Failed to create student profile: ' + err.message,
    });
  }
});

// GET /students/:id - Display one student profile
app.get('/students/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendError(req, res, {
      status: 400,
      message: `Invalid Student ID format: '${id}'. Must be a 24-character hexadecimal string.`,
    });
  }

  try {
    const student = await Student.findById(id);
    if (!student) {
      return sendError(req, res, {
        status: 404,
        message: `Student with ID '${id}' was not found.`,
      });
    }

    // Fetch related items and claims
    const [lostItems, foundItems, claimsMade] = await Promise.all([
      LostItem.find({ reportedBy: student._id }).sort({ createdAt: -1 }),
      FoundItem.find({ reportedBy: student._id }).sort({ createdAt: -1 }),
      Claim.find({ claimedBy: student._id }).populate('foundItemId').sort({ createdAt: -1 }),
    ]);

    return sendResponse(req, res, {
      status: 200,
      json: {
        success: true,
        data: {
          student,
          lostItems,
          foundItems,
          claimsMade,
        },
      },
      renderView: 'student-profile',
      renderData: {
        student,
        lostItems,
        foundItems,
        claimsMade,
      },
    });
  } catch (err) {
    return sendError(req, res, {
      status: 500,
      message: 'Error retrieving student profile: ' + err.message,
    });
  }
});

// ==========================================
// 3. LOST ITEM ROUTES
// ==========================================

// GET /report-lost - Form to report a lost item
app.get('/report-lost', async (req, res, next) => {
  try {
    const students = await Student.find().sort({ fullName: 1 });
    res.render('report-lost', { students });
  } catch (err) {
    next(err);
  }
});

// GET /lost-items - List lost-item reports (supports search & filter)
app.get('/lost-items', async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const query = {};

    if (category && category.trim()) {
      query.category = category.trim();
    }

    if (status && status.trim()) {
      query.status = status.trim();
    }

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { itemName: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
        { lastSeenLocation: { $regex: term, $options: 'i' } },
      ];
    }

    const lostItems = await LostItem.find(query)
      .populate('reportedBy')
      .sort({ createdAt: -1 });

    return sendResponse(req, res, {
      status: 200,
      json: { success: true, count: lostItems.length, data: lostItems },
      renderView: 'lost-items',
      renderData: {
        lostItems,
        searchQuery: search || '',
        categoryFilter: category || '',
        statusFilter: status || '',
      },
    });
  } catch (err) {
    return sendError(req, res, {
      status: 500,
      message: 'Failed to fetch lost items: ' + err.message,
    });
  }
});

// POST /lost-items - Create a lost-item report
app.post('/lost-items', async (req, res) => {
  try {
    const { itemName, category, description, lastSeenLocation, dateLost, reportedBy } = req.body;

    if (
      !itemName || !itemName.trim() ||
      !category || !category.trim() ||
      !description || !description.trim() ||
      !lastSeenLocation || !lastSeenLocation.trim() ||
      !reportedBy || !reportedBy.trim()
    ) {
      return sendError(req, res, {
        status: 400,
        message: 'All fields (Item Name, Category, Description, Last Seen Location, Reported By) are required.',
      });
    }

    // Verify student exists
    if (!mongoose.Types.ObjectId.isValid(reportedBy.trim())) {
      return sendError(req, res, {
        status: 400,
        message: `Invalid reporting Student ID: '${reportedBy}'. Must be a valid MongoDB ID.`,
      });
    }

    const studentExists = await Student.findById(reportedBy.trim());
    if (!studentExists) {
      return sendError(req, res, {
        status: 404,
        message: `Reporting Student with ID '${reportedBy}' does not exist.`,
      });
    }

    const lostItem = new LostItem({
      itemName: itemName.trim(),
      category: category.trim(),
      description: description.trim(),
      lastSeenLocation: lastSeenLocation.trim(),
      dateLost: dateLost ? new Date(dateLost) : new Date(),
      reportedBy: studentExists._id,
      status: 'Lost',
    });

    await lostItem.save();

    return sendResponse(req, res, {
      status: 201,
      json: { success: true, message: 'Lost item report created successfully', data: lostItem },
      redirectUrl: `/lost-items/${lostItem._id}?success=${encodeURIComponent('Lost item report posted successfully!')}`,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return sendError(req, res, {
        status: 400,
        message: 'Validation failed: ' + messages.join(', '),
        details: messages,
      });
    }
    return sendError(req, res, {
      status: 500,
      message: 'Failed to report lost item: ' + err.message,
    });
  }
});

// GET /lost-items/:id - Display one lost-item report
app.get('/lost-items/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendError(req, res, {
      status: 400,
      message: `Invalid Lost Item ID format: '${id}'.`,
    });
  }

  try {
    const item = await LostItem.findById(id).populate('reportedBy');
    if (!item) {
      return sendError(req, res, {
        status: 404,
        message: `Lost item report with ID '${id}' was not found.`,
      });
    }

    return sendResponse(req, res, {
      status: 200,
      json: { success: true, data: item },
      renderView: 'lost-item-details',
      renderData: { item },
    });
  } catch (err) {
    return sendError(req, res, {
      status: 500,
      message: 'Error fetching lost item: ' + err.message,
    });
  }
});

// ==========================================
// 4. FOUND ITEM ROUTES
// ==========================================

// GET /report-found - Form to report a found item
app.get('/report-found', async (req, res, next) => {
  try {
    const students = await Student.find().sort({ fullName: 1 });
    res.render('report-found', { students });
  } catch (err) {
    next(err);
  }
});

// GET /found-items - List found-item reports
app.get('/found-items', async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const query = {};

    if (category && category.trim()) {
      query.category = category.trim();
    }

    if (status && status.trim()) {
      query.status = status.trim();
    }

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { itemName: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
        { foundLocation: { $regex: term, $options: 'i' } },
      ];
    }

    const foundItems = await FoundItem.find(query)
      .populate('reportedBy')
      .sort({ createdAt: -1 });

    return sendResponse(req, res, {
      status: 200,
      json: { success: true, count: foundItems.length, data: foundItems },
      renderView: 'found-items',
      renderData: {
        foundItems,
        searchQuery: search || '',
        categoryFilter: category || '',
        statusFilter: status || '',
      },
    });
  } catch (err) {
    return sendError(req, res, {
      status: 500,
      message: 'Failed to fetch found items: ' + err.message,
    });
  }
});

// POST /found-items - Create a found-item report
app.post('/found-items', async (req, res) => {
  try {
    const { itemName, category, description, foundLocation, dateFound, reportedBy } = req.body;

    if (
      !itemName || !itemName.trim() ||
      !category || !category.trim() ||
      !description || !description.trim() ||
      !foundLocation || !foundLocation.trim() ||
      !reportedBy || !reportedBy.trim()
    ) {
      return sendError(req, res, {
        status: 400,
        message: 'All fields (Item Name, Category, Description, Found Location, Reported By) are required.',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(reportedBy.trim())) {
      return sendError(req, res, {
        status: 400,
        message: `Invalid reporting Student ID: '${reportedBy}'. Must be a valid MongoDB ID.`,
      });
    }

    const studentExists = await Student.findById(reportedBy.trim());
    if (!studentExists) {
      return sendError(req, res, {
        status: 404,
        message: `Reporting Student with ID '${reportedBy}' does not exist.`,
      });
    }

    const foundItem = new FoundItem({
      itemName: itemName.trim(),
      category: category.trim(),
      description: description.trim(),
      foundLocation: foundLocation.trim(),
      dateFound: dateFound ? new Date(dateFound) : new Date(),
      reportedBy: studentExists._id,
      status: 'Found',
    });

    await foundItem.save();

    return sendResponse(req, res, {
      status: 201,
      json: { success: true, message: 'Found item report created successfully', data: foundItem },
      redirectUrl: `/found-items/${foundItem._id}?success=${encodeURIComponent('Found item report posted successfully!')}`,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return sendError(req, res, {
        status: 400,
        message: 'Validation failed: ' + messages.join(', '),
        details: messages,
      });
    }
    return sendError(req, res, {
      status: 500,
      message: 'Failed to report found item: ' + err.message,
    });
  }
});

// GET /found-items/:id - Display one found item and its claim options
app.get('/found-items/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendError(req, res, {
      status: 400,
      message: `Invalid Found Item ID format: '${id}'.`,
    });
  }

  try {
    const item = await FoundItem.findById(id).populate('reportedBy');
    if (!item) {
      return sendError(req, res, {
        status: 404,
        message: `Found item report with ID '${id}' was not found.`,
      });
    }

    // Retrieve claims for this found item
    const claims = await Claim.find({ foundItemId: item._id })
      .populate('claimedBy')
      .sort({ createdAt: -1 });

    const allStudents = await Student.find().sort({ fullName: 1 });

    return sendResponse(req, res, {
      status: 200,
      json: {
        success: true,
        data: {
          item,
          claims,
        },
      },
      renderView: 'found-item-details',
      renderData: {
        item,
        claims,
        allStudents,
      },
    });
  } catch (err) {
    return sendError(req, res, {
      status: 500,
      message: 'Error fetching found item details: ' + err.message,
    });
  }
});

// PATCH /found-items/:id/status - Update item status directly (e.g. Returned / Found)
app.patch('/found-items/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, requesterStudentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendError(req, res, {
      status: 400,
      message: `Invalid Found Item ID format: '${id}'.`,
    });
  }

  if (!status || !['Found', 'Returned'].includes(status)) {
    return sendError(req, res, {
      status: 400,
      message: "Status must be either 'Found' or 'Returned'.",
    });
  }

  try {
    const item = await FoundItem.findById(id);
    if (!item) {
      return sendError(req, res, {
        status: 404,
        message: `Found item with ID '${id}' was not found.`,
      });
    }

    // Ownership check: If requesterStudentId is provided, enforce that only reporter can change status
    if (requesterStudentId) {
      if (item.reportedBy.toString() !== requesterStudentId.toString()) {
        return sendError(req, res, {
          status: 403,
          message: 'Unauthorized: Only the student who reported this found item can update its status.',
        });
      }
    }

    item.status = status;
    await item.save();

    return sendResponse(req, res, {
      status: 200,
      json: {
        success: true,
        message: `Found item status updated to '${status}'.`,
        data: item,
      },
      redirectUrl: `/found-items/${item._id}?success=${encodeURIComponent(`Item status updated to ${status}`)}`,
    });
  } catch (err) {
    return sendError(req, res, {
      status: 500,
      message: 'Error updating found item status: ' + err.message,
    });
  }
});

// ==========================================
// 5. CLAIM AND RETURN WORKFLOW
// ==========================================

// POST /found-items/:id/claims - Submit a claim for a found item
app.post('/found-items/:id/claims', async (req, res) => {
  const { id } = req.params;
  const { claimedBy, reason } = req.body;

  // 1. Validate Found Item ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendError(req, res, {
      status: 400,
      message: `Invalid Found Item ID format: '${id}'.`,
    });
  }

  // 2. Validate input fields
  if (!claimedBy || !claimedBy.trim() || !reason || !reason.trim()) {
    return sendError(req, res, {
      status: 400,
      message: 'Both Claimant Student and Reason are required.',
    });
  }

  // 3. Validate Claimant Student ID format
  if (!mongoose.Types.ObjectId.isValid(claimedBy.trim())) {
    return sendError(req, res, {
      status: 400,
      message: `Invalid Claimant Student ID: '${claimedBy}'. Must be a valid MongoDB ID.`,
    });
  }

  try {
    // 4. Relationship check: Found item must exist
    const foundItem = await FoundItem.findById(id);
    if (!foundItem) {
      return sendError(req, res, {
        status: 404,
        message: `Found item with ID '${id}' was not found. Cannot submit claim.`,
      });
    }

    // 5. Relationship check: Student must exist
    const student = await Student.findById(claimedBy.trim());
    if (!student) {
      return sendError(req, res, {
        status: 404,
        message: `Claimant Student with ID '${claimedBy}' does not exist.`,
      });
    }

    // 6. Ownership / sanity check: Reporter cannot claim their own found item
    if (foundItem.reportedBy.toString() === student._id.toString()) {
      return sendError(req, res, {
        status: 400,
        message: 'Cannot claim this item: You are the person who reported finding it.',
      });
    }

    // 7. State check: Once an item is marked Returned, new claims must be rejected!
    if (foundItem.status === 'Returned') {
      return sendError(req, res, {
        status: 400,
        message: 'This item has already been marked as Returned and cannot be claimed again.',
      });
    }

    // 8. Duplicate-claim check: Prevent duplicate pending or approved claims by the same student for the same found item
    const existingClaim = await Claim.findOne({
      foundItemId: foundItem._id,
      claimedBy: student._id,
      status: { $in: ['Pending', 'Approved'] },
    });

    if (existingClaim) {
      return sendError(req, res, {
        status: 409,
        message: `You already have an active (${existingClaim.status}) claim on this item. Duplicate claims are not allowed.`,
      });
    }

    // 9. Create claim with initial status = 'Pending'
    const newClaim = new Claim({
      foundItemId: foundItem._id,
      claimedBy: student._id,
      reason: reason.trim(),
      status: 'Pending',
    });

    await newClaim.save();

    return sendResponse(req, res, {
      status: 201,
      json: {
        success: true,
        message: 'Claim submitted successfully. Awaiting review by the finder.',
        data: newClaim,
      },
      redirectUrl: `/found-items/${foundItem._id}?success=${encodeURIComponent('Claim submitted successfully!')}`,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return sendError(req, res, {
        status: 400,
        message: 'Validation error: ' + messages.join(', '),
      });
    }
    return sendError(req, res, {
      status: 500,
      message: 'Failed to submit claim: ' + err.message,
    });
  }
});

// PATCH /claims/:id/status - Approve or reject a claim
app.patch('/claims/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, reviewerStudentId } = req.body;

  // 1. Validate Claim ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendError(req, res, {
      status: 400,
      message: `Invalid Claim ID format: '${id}'.`,
    });
  }

  // 2. Validate target status
  if (!status || !['Approved', 'Rejected'].includes(status)) {
    return sendError(req, res, {
      status: 400,
      message: "Claim status must be updated to either 'Approved' or 'Rejected'.",
    });
  }

  // 3. Reviewer ID required for ownership check
  if (!reviewerStudentId || !reviewerStudentId.trim()) {
    return sendError(req, res, {
      status: 400,
      message: 'Reviewer Student ID (reviewerStudentId) is required to verify ownership.',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(reviewerStudentId.trim())) {
    return sendError(req, res, {
      status: 400,
      message: `Invalid Reviewer Student ID format: '${reviewerStudentId}'.`,
    });
  }

  try {
    // Retrieve claim and populate found item
    const claim = await Claim.findById(id).populate('foundItemId');
    if (!claim) {
      return sendError(req, res, {
        status: 404,
        message: `Claim with ID '${id}' was not found.`,
      });
    }

    const foundItem = claim.foundItemId;
    if (!foundItem) {
      return sendError(req, res, {
        status: 404,
        message: 'The associated found item for this claim no longer exists.',
      });
    }

    // 4. OWNERSHIP CHECK (Required Thinking Challenge 1):
    // Only the student who reported the found item can approve or reject claims.
    if (foundItem.reportedBy.toString() !== reviewerStudentId.trim()) {
      return sendError(req, res, {
        status: 403,
        message: 'Forbidden: You are not authorized to review claims for this item. Only the student who reported finding the item can approve or reject claims.',
      });
    }

    // Check if the item is already returned and someone tries to approve another claim
    if (status === 'Approved' && foundItem.status === 'Returned' && claim.status !== 'Approved') {
      return sendError(req, res, {
        status: 400,
        message: 'Cannot approve claim: This found item has already been marked as Returned.',
      });
    }

    // 5. SAFE UPDATE: Update only the status field
    claim.status = status;
    await claim.save();

    // 6. If Approved, mark the found item as 'Returned'
    if (status === 'Approved') {
      foundItem.status = 'Returned';
      await foundItem.save();

      // Automatically reject any other pending claims for this item
      await Claim.updateMany(
        {
          foundItemId: foundItem._id,
          _id: { $ne: claim._id },
          status: 'Pending',
        },
        { status: 'Rejected' }
      );
    }

    return sendResponse(req, res, {
      status: 200,
      json: {
        success: true,
        message: `Claim has been ${status.toLowerCase()} successfully.`,
        data: claim,
      },
      redirectUrl: `/found-items/${foundItem._id}?success=${encodeURIComponent(`Claim successfully ${status.toLowerCase()}!`)}`,
    });
  } catch (err) {
    return sendError(req, res, {
      status: 500,
      message: 'Failed to update claim status: ' + err.message,
    });
  }
});

// Also support POST on /claims/:id/status in case client form posts directly without method-override
app.post('/claims/:id/status', async (req, res, next) => {
  // Delegate directly to PATCH handler logic
  req.method = 'PATCH';
  app._router.handle(req, res, next);
});

// ==========================================
// 6. 404 & ERROR HANDLING
// ==========================================

// 404 Not Found Handler
app.use((req, res) => {
  const isApi =
    req.xhr ||
    (req.headers.accept && req.headers.accept.includes('application/json')) ||
    req.is('json') ||
    req.query.format === 'json';

  if (isApi) {
    return res.status(404).json({
      success: false,
      error: `Resource not found: ${req.method} ${req.originalUrl}`,
    });
  }

  return res.status(404).render('404', { url: req.originalUrl });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);

  const isApi =
    req.xhr ||
    (req.headers.accept && req.headers.accept.includes('application/json')) ||
    req.is('json') ||
    req.query.format === 'json';

  if (isApi) {
    return res.status(500).json({
      success: false,
      error: 'An unexpected internal server error occurred',
      message: err.message,
    });
  }

  return res.status(500).render('error', {
    status: 500,
    message: 'An unexpected internal server error occurred',
    details: err.message,
  });
});

// Start Server (only if not loaded in test mode)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` Campus Lost & Found Management System`);
    console.log(` Server is running on http://localhost:${PORT}`);
    console.log(` Connected to MongoDB: ${MONGODB_URI}`);
    console.log(`====================================================`);
  });
}

module.exports = app;
