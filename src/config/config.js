import dotenv from 'dotenv';

dotenv.config();

export default {
      env: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 8080,
      mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
      persistence: process.env.PERSISTENCE || 'memory',
      mail: {
            emailService : process.env.MAIL_SERVICE || 'gmail',
            emailPort : process.env.MAIL_PORT || 587,
            emailUser: process.env.EMAIL_USER,
            emailPassword: process.env.EMAIL_PASSWORD
      },
      privateStripe: process.env.APP_STRIPE_PRIVATE_KEY,
      publicStripe: process.env.APP_STRIPE_PUBLIC_KEY
}
