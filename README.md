# NMAI Current Affairs - Full Stack Website

A complete full-stack web application for current affairs and competitive exam preparation with Daily Current Affairs, MCQs, User Authentication, Admin Panel, and Google AdSense integration.

## 🚀 Features

### Frontend
- ✅ Responsive React-based UI
- ✅ Daily Current Affairs with filtering & search
- ✅ MCQ Practice with instant results
- ✅ User Authentication (Register/Login)
- ✅ User Dashboard with saved articles
- ✅ Category-wise content organization
- ✅ Exam-specific filtering (UPSC, SSC, Banking, etc.)
- ✅ Newsletter subscription
- ✅ SEO optimized pages
- ✅ Google AdSense ready

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ JWT authentication
- ✅ Role-based access control (User/Author/Admin)
- ✅ Article management system
- ✅ MCQ management with statistics
- ✅ User profile management
- ✅ Newsletter system
- ✅ Admin dashboard

### Admin Panel
- ✅ Dashboard with statistics
- ✅ Article creation & management
- ✅ MCQ creation & management
- ✅ User management
- ✅ Content moderation

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/nmai-website.git
cd nmai-website
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables (.env):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/nmai-current-affairs
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@nmai.in
ADMIN_PASSWORD=Admin@123
```

**For MongoDB Atlas (Production):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nmai
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens on http://localhost:3000
```

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

## 📦 Database Seeding (Optional)

To populate the database with sample data:

```bash
cd backend
npm run seed
```

This creates:
- Sample articles
- Sample MCQs
- Admin user
- Test users

## 🔑 Default Admin Credentials

```
Email: admin@nmai.in
Password: Admin@123
```

**⚠️ IMPORTANT: Change these in production!**

## 📁 Project Structure

```
nmai-website/
├── backend/
│   ├── models/
│   │   ├── Article.js
│   │   ├── MCQ.js
│   │   └── User.js
│   ├── routes/
│   │   ├── articles.js
│   │   ├── mcqs.js
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── newsletter.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- PUT `/api/auth/update-profile` - Update profile
- PUT `/api/auth/change-password` - Change password
- POST `/api/auth/forgot-password` - Request password reset
- POST `/api/auth/reset-password/:token` - Reset password

### Articles
- GET `/api/articles` - Get all articles (with filters)
- GET `/api/articles/latest` - Get latest articles
- GET `/api/articles/trending` - Get trending articles
- GET `/api/articles/:slug` - Get single article
- GET `/api/articles/category/:category` - Get by category
- POST `/api/articles` - Create article (Admin/Author)
- PUT `/api/articles/:id` - Update article (Admin/Author)
- DELETE `/api/articles/:id` - Delete article (Admin)

### MCQs
- GET `/api/mcqs` - Get all MCQs (with filters)
- GET `/api/mcqs/daily-quiz` - Get random 10 MCQs
- POST `/api/mcqs/submit` - Submit quiz answers
- GET `/api/mcqs/categories` - Get categories
- GET `/api/mcqs/stats` - Get statistics
- POST `/api/mcqs` - Create MCQ (Admin/Author)
- PUT `/api/mcqs/:id` - Update MCQ (Admin)
- DELETE `/api/mcqs/:id` - Delete MCQ (Admin)

### Users
- POST `/api/users/save-article/:id` - Save article
- DELETE `/api/users/save-article/:id` - Unsave article
- GET `/api/users/saved-articles` - Get saved articles
- GET `/api/users/quiz-history` - Get quiz history

### Newsletter
- POST `/api/newsletter/subscribe` - Subscribe
- POST `/api/newsletter/unsubscribe` - Unsubscribe

### Admin
- GET `/api/admin/dashboard-stats` - Dashboard statistics
- GET `/api/admin/users` - Get all users
- PUT `/api/admin/users/:id` - Update user
- DELETE `/api/admin/users/:id` - Delete user

## 🎨 Frontend Components to Create

### Core Components
1. `Navbar.js` - Navigation header
2. `Footer.js` - Footer with legal links
3. `ArticleCard.js` - Article preview card
4. `MCQCard.js` - MCQ question card
5. `CategoryFilter.js` - Filter by category
6. `SearchBar.js` - Search functionality

### Pages
1. `Home.js` - Homepage with latest articles
2. `CurrentAffairs.js` - Daily current affairs list
3. `ArticleDetail.js` - Single article view
4. `MCQPractice.js` - MCQ practice page
5. `DailyQuiz.js` - Daily quiz interface
6. `Login.js` - Login page
7. `Register.js` - Registration page
8. `Profile.js` - User profile/dashboard
9. `AdminDashboard.js` - Admin panel
10. Legal pages (already created)

## 🎨 CSS Styling

The application uses:
- Modern CSS3 with Flexbox/Grid
- Responsive design (mobile-first)
- Color scheme inspired by GKToday/DrishtiIAS
- Google Fonts (Inter/Roboto)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies (optional)
- Helmet.js security headers
- Rate limiting
- Input validation
- XSS protection
- CORS configuration

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 💰 Monetization (Google AdSense)

### Setup Instructions:

1. Get AdSense approval
2. Add AdSense script to `public/index.html`:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-ID"
     crossorigin="anonymous"></script>
```

3. Add ad units in components:

```jsx
<ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-YOUR-ID"
     data-ad-slot="YOUR-SLOT-ID"
     data-ad-format="auto"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## 🚀 Deployment

### Backend (Heroku/Railway/Render)

1. Create account on deployment platform
2. Connect GitHub repository
3. Add environment variables
4. Deploy

### Frontend (Netlify/Vercel)

1. Build production version
```bash
npm run build
```

2. Deploy `build` folder to Netlify/Vercel
3. Configure environment variables
4. Set up custom domain

### MongoDB (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create cluster
3. Create database user
4. Get connection string
5. Update MONGODB_URI in .env

## 📊 MongoDB Collections

### users
- User accounts
- Authentication data
- Subscriptions
- Saved articles
- Quiz history

### articles
- Current affairs content
- Metadata
- Categories
- Exam relevance
- View counts

### mcqs
- Questions
- Options
- Correct answers
- Explanations
- Statistics

## 🔧 Environment-Specific Configurations

### Development
- Detailed error messages
- Hot reloading
- CORS: `http://localhost:3000`
- Debug mode ON

### Production
- Minified builds
- Error tracking (Sentry)
- CORS: Your domain
- Debug mode OFF
- HTTPS enforcement

## 📈 Analytics Integration

### Google Analytics
Add to `public/index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR-ID');
</script>
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or use different port in .env
PORT=5001
```

### CORS Errors
- Check FRONTEND_URL in backend .env
- Verify CORS configuration in server.js

## 📞 Support

For issues or questions:
- Email: support@nmai.in
- GitHub Issues: [Create Issue]

## 📄 License

MIT License - feel free to use for your own projects!

## 🙏 Credits

Inspired by:
- GKToday (https://www.gktoday.in)
- DrishtiIAS (https://www.drishtiias.com)

## ⭐ Show Your Support

If this project helps you, please give it a star on GitHub!

---

**Built with ❤️ for Competitive Exam Aspirants**