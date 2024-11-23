const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config({path: '../.env'});
const prisma = require('../prismaClient/prisma.client');

const JWT_SECRET = "af7b27405f54568dcbac140a9ee075967a1aacc9b0c25803afb235366cb0168b";
const REFRESH_TOKEN_SECRET = "refresh-token-secret"; // Refresh token secret'i

const login = async (req, res, next) => { 
    try {
        const { username, password } = req.body;
        console.log(username);
        console.log(password);
        const authHeader = req.headers['authorization'];
        const existingToken = authHeader && authHeader.split(' ')[1];
        console.log(existingToken);
        
        const user = await prisma.user.findFirst({
            where: { username: username }
        });
        

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = bcrypt.compareSync(password, user.hashedpassword);
        
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Yeni token oluştur
        const token = jwt.sign(
            { 
                username: user.username,
                userId: user.id
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Refresh token oluştur
        const refreshToken = jwt.sign(
            { 
                username: user.username,
                userId: user.id
            },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' } // 7 gün
        );

        res.status(200).json({ 
            message: 'Login successful',
            token: token,
            refreshToken: refreshToken,
            id: user.id,
            email: user.email,
            expiresIn: 3600 // 1 saat (saniye cinsinden)
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Refresh token'ı kullanarak yeni bir access token almak için
const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token required' });
        }

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }

            const token = jwt.sign(
                { 
                    username: decoded.username,
                    userId: decoded.userId
                },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ 
                message: 'New token generated',
                token: token,
                expiresIn: 3600 // 1 saat (saniye cinsinden)
            });
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { login, refreshToken };


 // Eğer token varsa, doğrula
        /*
        if (existingToken) {
            try {
                const decoded = jwt.verify(existingToken, JWT_SECRET);
                // Token hala geçerliyse
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp > currentTime) {
                    return res.status(200).json({ 
                        message: 'Valid token exists',
                        token: existingToken,
                        id: user.id,
                        email: user.email,
                        expiresIn: decoded.exp - currentTime
                    });
                }
            } catch (error) {
                console.log('Token verification failed:', error.message);
            }
        }
        */