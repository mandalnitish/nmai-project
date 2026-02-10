// backend/middleware/imageOptimization.js
// Install required packages: npm install sharp multer cloudinary

const sharp = require('sharp');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// ============================================
// OPTION 1: FILE SYSTEM STORAGE WITH OPTIMIZATION
// ============================================

// Configure multer for temporary storage
const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/temp/',
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files (JPEG, PNG, WebP) are allowed!'));
  }
});

// Process and optimize uploaded images
const processImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const tempPath = req.file.path;
    const filename = req.file.filename;
    const baseName = path.parse(filename).name;
    
    // Create directories if they don't exist
    await fs.mkdir('./uploads/full', { recursive: true });
    await fs.mkdir('./uploads/thumbs', { recursive: true });
    await fs.mkdir('./uploads/cards', { recursive: true });

    // Full size (optimized)
    const fullPath = `./uploads/full/${baseName}.jpg`;
    await sharp(tempPath)
      .resize(1200, 675, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 85,
        progressive: true 
      })
      .toFile(fullPath);

    // Card size (for article cards)
    const cardPath = `./uploads/cards/${baseName}.jpg`;
    await sharp(tempPath)
      .resize(400, 250, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ 
        quality: 80,
        progressive: true 
      })
      .toFile(cardPath);

    // Thumbnail
    const thumbPath = `./uploads/thumbs/${baseName}.jpg`;
    await sharp(tempPath)
      .resize(150, 150, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ 
        quality: 75,
        progressive: true 
      })
      .toFile(thumbPath);

    // Delete temp file
    await fs.unlink(tempPath);

    // Add processed images to request
    req.processedImages = {
      full: `/uploads/full/${baseName}.jpg`,
      card: `/uploads/cards/${baseName}.jpg`,
      thumb: `/uploads/thumbs/${baseName}.jpg`,
      filename: `${baseName}.jpg`
    };

    next();
  } catch (error) {
    console.error('Image processing error:', error);
    // Clean up temp file on error
    try {
      await fs.unlink(req.file.path);
    } catch (e) {}
    res.status(500).json({ error: 'Image processing failed' });
  }
};

// ============================================
// OPTION 2: CLOUDINARY INTEGRATION (RECOMMENDED)
// ============================================

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (file) => {
  try {
    // Upload original with transformations
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'nmai-articles',
      transformation: [
        { width: 1200, height: 675, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' } // Serves WebP to supporting browsers
      ],
      eager: [
        // Generate card size immediately
        { width: 400, height: 250, crop: 'fill', quality: 80 },
        // Generate thumbnail immediately
        { width: 150, height: 150, crop: 'fill', quality: 75 }
      ]
    });

    // Delete local file after upload
    await fs.unlink(file.path);

    return {
      full: result.secure_url,
      card: result.eager[0].secure_url,
      thumb: result.eager[1].secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// ============================================
// EXPRESS ROUTES
// ============================================

// Article upload route (File System)
const createArticleWithImageFS = async (req, res) => {
  try {
    const Article = require('../models/Article'); // Your model

    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      summary: req.body.summary,
      featuredImage: {
        url: req.processedImages.card, // Use card size for listings
        fullUrl: req.processedImages.full,
        thumbnail: req.processedImages.thumb,
        filename: req.processedImages.filename
      },
      author: req.user._id,
      publishDate: req.body.publishDate || Date.now()
    });

    await article.save();

    res.status(201).json({
      success: true,
      article
    });
  } catch (error) {
    console.error('Article creation error:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
};

// Article upload route (Cloudinary)
const createArticleWithImageCloudinary = async (req, res) => {
  try {
    const Article = require('../models/Article');

    // Upload to Cloudinary
    const imageData = await uploadToCloudinary(req.file);

    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      summary: req.body.summary,
      featuredImage: {
        url: imageData.card, // Use card size for listings
        fullUrl: imageData.full,
        thumbnail: imageData.thumb,
        cloudinaryId: imageData.publicId
      },
      author: req.user._id,
      publishDate: req.body.publishDate || Date.now()
    });

    await article.save();

    res.status(201).json({
      success: true,
      article
    });
  } catch (error) {
    console.error('Article creation error:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
};

// Serve images with caching (File System only)
const serveImage = (req, res) => {
  const { size, filename } = req.params; // size: full, cards, thumbs
  const filepath = path.join(__dirname, '..', 'uploads', size, filename);

  // Set aggressive caching headers
  res.set({
    'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
    'Expires': new Date(Date.now() + 31536000000).toUTCString(),
    'ETag': filename, // Simple ETag based on filename
  });

  res.sendFile(filepath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Image not found' });
    }
  });
};

// ============================================
// OPTIMIZED ARTICLE QUERIES
// ============================================

const getArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const query = {};
    
    // Filters
    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }
    if (req.query.examRelevance) {
      query.examRelevance = req.query.examRelevance;
    }
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Optimized query - only fetch needed fields
    const articles = await Article.find(query)
      .select('title slug category publishDate summary featuredImage.url author createdAt')
      .populate('author', 'name') // Only fetch author name
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // Returns plain objects (faster)

    const total = await Article.countDocuments(query);

    res.json({
      success: true,
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page < Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

// Get single article (with full content)
const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug })
      .populate('author', 'name email')
      .lean();

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Increment view count asynchronously (don't wait)
    Article.updateOne(
      { _id: article._id },
      { $inc: { viewCount: 1 } }
    ).exec();

    res.json({
      success: true,
      article
    });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
};

// ============================================
// EXPORTS
// ============================================

module.exports = {
  // Multer upload
  upload,
  
  // Middleware
  processImage,
  
  // Cloudinary
  uploadToCloudinary,
  
  // Routes
  createArticleWithImageFS,
  createArticleWithImageCloudinary,
  serveImage,
  getArticles,
  getArticleBySlug
};

// ============================================
// EXAMPLE EXPRESS APP SETUP
// ============================================

/*
const express = require('express');
const { 
  upload, 
  processImage, 
  createArticleWithImageFS,
  serveImage,
  getArticles,
  getArticleBySlug
} = require('./middleware/imageOptimization');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable compression
const compression = require('compression');
app.use(compression());

// CORS
const cors = require('cors');
app.use(cors());

// Routes
app.post('/api/articles', 
  authMiddleware, // Your auth middleware
  upload.single('image'), 
  processImage, 
  createArticleWithImageFS
);

app.get('/api/articles', getArticles);
app.get('/api/articles/:slug', getArticleBySlug);
app.get('/uploads/:size/:filename', serveImage);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/