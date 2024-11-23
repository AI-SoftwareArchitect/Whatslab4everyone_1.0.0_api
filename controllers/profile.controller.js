const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile_' + uniqueSuffix + path.extname(file.originalname).toLowerCase());
  }
});

// Geliştirilmiş dosya filtresi
const fileFilter = (req, file, cb) => {
  // İzin verilen dosya tipleri
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
  if (allowedTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types are: ${allowedTypes.join(', ')}`), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

const setProfileImage = async (req, res, next) => {
  try {
    // Uploads klasörünün varlığını kontrol et
    const uploadDir = 'uploads/profiles';
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }


    upload.single('profile_image')(req, res, async (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size is too large. Max size is 5MB.' });
          }
        }
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Please upload an image file.' });
      }

      const imagePath = req.file.path.replace(/\\/g, '/');

      res.status(200).json({
        message: 'Profile image uploaded successfully',
        imagePath: imagePath
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { setProfileImage };