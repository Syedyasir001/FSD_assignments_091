import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import Comment from './models/Comment.js';
import Vote from './models/Vote.js';

await mongoose.connect('mongodb://127.0.0.1:27017/reddit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log('Connected to MongoDB');

// Wipe existing data
await User.deleteMany({});
await Comment.deleteMany({});
await Vote.deleteMany({});
console.log('Cleared existing data');

// Users
const hash = (p) => bcrypt.hashSync(p, 10);
const users = await User.insertMany([
  { email: 'alice@example.com',   username: 'alice',   password: hash('password123') },
  { email: 'bob@example.com',     username: 'bob',     password: hash('password123') },
  { email: 'charlie@example.com', username: 'charlie', password: hash('password123') },
  { email: 'dave@example.com',    username: 'dave',    password: hash('password123') },
]);
console.log('Created users:', users.map(u => u.username).join(', '));

const daysAgo = (n) => new Date(Date.now() - n * 86400000);

// Root posts
const postsData = [
  {
    author: 'alice',
    title: 'What is this, a time bomb?',
    body: "![Lenovo Laptop](https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80)\n\nMy Lenovo LQ's battery indicator decided to scare me at **12:30 AM**. Thought it was shutting down but nope — just dramatic.\n\n> Anyone else's laptop show weird stats at midnight?",
    postedAt: daysAgo(0.5),
  },
  {
    author: 'bob',
    title: 'I built a full-stack Reddit clone in a weekend',
    body: "![Coding Setup](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80)\n\nUsed **React + Node.js + MongoDB**. Key learnings:\n\n- Tailwind CSS is a game changer for rapid UI\n- JWT cookies are way simpler than I expected\n- MongoDB's flexible schema saved me 3 times during design changes\n\nWould love feedback on the voting system!",
    postedAt: daysAgo(1),
  },
  {
    author: 'charlie',
    title: 'PSA: Stop writing var in 2026. Please.',
    body: "![Bad Code](https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80)\n\nCame across a codebase today using `var` everywhere with no `use strict`.\n\n```js\n// Bad\nvar x = 10;\n\n// Good\nconst x = 10;\nlet y = 20;\n```\n\nModernise your code, it's not that hard.",
    postedAt: daysAgo(2),
  },
  {
    author: 'dave',
    title: "Ask r/webdev: What's your go-to VS Code extension for productivity?",
    body: "![VS Code Setup](https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80)\n\nMine are:\n\n1. **GitHub Copilot** - obvious choice\n2. **Error Lens** - shows errors inline\n3. **Thunder Client** - REST client without leaving VS Code\n4. **Prettier** - non-negotiable\n\nDrop yours below!",
    postedAt: daysAgo(3),
  },
  {
    author: 'alice',
    title: 'TIL: CSS container queries are finally supported everywhere',
    body: "![Responsive Design](https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80)\n\nIf you haven't tried container queries yet, now's the time. Instead of viewport-based breakpoints, you can style components based on their **parent container's size**.\n\n```css\n.card-container {\n  container-type: inline-size;\n}\n\n@container (min-width: 400px) {\n  .card { flex-direction: row; }\n}\n```\n\nThis changes everything for component-level responsive design.",
    postedAt: daysAgo(5),
  },
  {
    author: 'bob',
    title: 'Rant: Why do interview questions still ask about this binding in arrow functions?',
    body: "![Confusing Code](https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80)\n\nIt's 2026. We have React hooks, we have class-free components, we have `const fn = () => {}` everywhere.\n\nYet interviewers still ask \"what does `this` refer to here?\" like it's 2015.\n\nAm I wrong to be annoyed by this?",
    postedAt: daysAgo(7),
  },
];

const posts = await Comment.insertMany(postsData);
console.log('Created', posts.length, 'posts');

// Comments
const commentData = [
  // Post 0 comments
  { author:'bob',     body:'Lenovo battery indicators are always dramatic lmao', parentId: posts[0]._id, rootId: posts[0]._id, postedAt: daysAgo(0.4) },
  { author:'charlie', body:'Mine showed **200% battery** once. Never figured out why.', parentId: posts[0]._id, rootId: posts[0]._id, postedAt: daysAgo(0.3) },
  { author:'dave',    body:'Classic Lenovo behaviour. Have you tried updating the battery driver?', parentId: posts[0]._id, rootId: posts[0]._id, postedAt: daysAgo(0.2) },
  // Post 1 comments
  { author:'charlie', body:'This is awesome! Did you implement real-time updates or just polling?', parentId: posts[1]._id, rootId: posts[1]._id, postedAt: daysAgo(0.9) },
  { author:'dave',    body:'Love the stack choice. MongoDB + React is my go-to combo too.', parentId: posts[1]._id, rootId: posts[1]._id, postedAt: daysAgo(0.8) },
  { author:'alice',   body:'Would love to see the voting system code. Is it on GitHub?', parentId: posts[1]._id, rootId: posts[1]._id, postedAt: daysAgo(0.7) },
  // Post 2 comments
  { author:'alice',   body:'You forgot `let` being block-scoped. That alone should convince people.', parentId: posts[2]._id, rootId: posts[2]._id, postedAt: daysAgo(1.8) },
  { author:'dave',    body:"Had a colleague who defended `var` because 'it's faster'. I wanted to cry.", parentId: posts[2]._id, rootId: posts[2]._id, postedAt: daysAgo(1.6) },
  // Post 3 comments
  { author:'alice',   body:'**ESLint** is my must-have. Catches so many subtle bugs before they hit prod.', parentId: posts[3]._id, rootId: posts[3]._id, postedAt: daysAgo(2.9) },
  { author:'bob',     body:'Auto Rename Tag - invaluable for JSX. Also GitLens for blame history.', parentId: posts[3]._id, rootId: posts[3]._id, postedAt: daysAgo(2.7) },
  { author:'charlie', body:'Peacock. Different colour themes per project so I stop editing the wrong window.', parentId: posts[3]._id, rootId: posts[3]._id, postedAt: daysAgo(2.5) },
  { author:'dave',    body:'Live Share for pair programming. Game changer for remote teams.', parentId: posts[3]._id, rootId: posts[3]._id, postedAt: daysAgo(2.3) },
  // Post 4 comments
  { author:'bob',     body:"Finally! I've been waiting for broad support since 2022. No more hacky JS resize observers.", parentId: posts[4]._id, rootId: posts[4]._id, postedAt: daysAgo(4.8) },
  { author:'dave',    body:'Combined with CSS nesting, 2026 is the best time to be writing CSS.', parentId: posts[4]._id, rootId: posts[4]._id, postedAt: daysAgo(4.5) },
  // Post 5 comments
  { author:'alice',   body:'100% agree. `this` questions feel like a trivia quiz rather than actual coding skill.', parentId: posts[5]._id, rootId: posts[5]._id, postedAt: daysAgo(6.8) },
  { author:'charlie', body:"They ask it because it shows understanding of JS internals. Not saying it's ideal though.", parentId: posts[5]._id, rootId: posts[5]._id, postedAt: daysAgo(6.5) },
  { author:'dave',    body:'The worst part is when they ask it in a React interview. Bro, we use hooks.', parentId: posts[5]._id, rootId: posts[5]._id, postedAt: daysAgo(6.2) },
];

const savedComments = await Comment.insertMany(commentData);
console.log('Created', savedComments.length, 'comments');

// Votes
const voteData = [];
const allUsernames = ['alice', 'bob', 'charlie', 'dave'];

function addVotes(commentId, ups, downs, excludeAuthor) {
  const available = allUsernames.filter(u => u !== excludeAuthor);
  ups.forEach(u => { if (available.includes(u)) voteData.push({ author: u, commentId, direction: 1 }); });
  downs.forEach(u => { if (available.includes(u)) voteData.push({ author: u, commentId, direction: -1 }); });
}

// Post votes
addVotes(posts[0]._id, ['bob', 'charlie', 'dave'], [], 'alice');
addVotes(posts[1]._id, ['alice', 'charlie', 'dave'], [], 'bob');
addVotes(posts[2]._id, ['alice', 'bob', 'dave'], [], 'charlie');
addVotes(posts[3]._id, ['alice', 'bob', 'charlie'], [], 'dave');
addVotes(posts[4]._id, ['bob', 'charlie', 'dave'], [], 'alice');
addVotes(posts[5]._id, ['alice', 'charlie'], ['dave'], 'bob');

// Comment votes
addVotes(savedComments[0]._id, ['alice', 'charlie'], [], 'bob');
addVotes(savedComments[1]._id, ['alice', 'bob'], [], 'charlie');
addVotes(savedComments[2]._id, ['alice'], ['charlie'], 'dave');
addVotes(savedComments[3]._id, ['alice', 'bob', 'dave'], [], 'charlie');
addVotes(savedComments[4]._id, ['charlie'], [], 'dave');
addVotes(savedComments[5]._id, ['bob', 'dave'], ['charlie'], 'alice');
addVotes(savedComments[6]._id, ['bob', 'charlie'], [], 'alice');
addVotes(savedComments[7]._id, ['alice', 'charlie'], [], 'dave');
addVotes(savedComments[8]._id, ['bob'], ['alice'], 'charlie');
addVotes(savedComments[9]._id, ['alice', 'bob', 'charlie'], [], 'dave');

await Vote.insertMany(voteData);
console.log('Created', voteData.length, 'votes');

await mongoose.disconnect();
console.log('Seed complete! Login with: alice/password123, bob/password123, etc.');
