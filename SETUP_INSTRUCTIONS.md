# Setup Instructions for EmailJS & Firebase

## Step 1: Create .env.local file

Create a file named `.env.local` in the root directory with the following content:

```env
# EmailJS Configuration
# Get these from https://www.emailjs.com/
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here

# Firebase Configuration
# Get these from Firebase Console > Project Settings > Your apps > Web app
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

## Step 2: Replace the placeholder values

Replace all `your_*_here` values with your actual credentials from EmailJS and Firebase.

## Step 3: Restart development server

After creating the .env.local file, restart your development server:

```bash
npm run dev
```

## EmailJS Setup Guide

1. Go to https://www.emailjs.com/ and create a free account
2. Add a new Email Service (Gmail recommended)
3. Create an Email Template with these variables:
   - {{from_name}}
   - {{from_email}}
   - {{message}}
4. Get your Service ID, Template ID, and Public Key
5. Add them to .env.local

## Firebase Setup Guide

1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable Firestore Database in production mode
4. Set Firestore Rules (see below)
5. Go to Project Settings > Your apps > Web
6. Register a web app
7. Copy the config values to .env.local

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['name', 'message', 'timestamp']) 
                    && request.resource.data.name is string 
                    && request.resource.data.message is string
                    && request.resource.data.name.size() > 0
                    && request.resource.data.message.size() > 0
                    && request.resource.data.name.size() <= 100
                    && request.resource.data.message.size() <= 500;
      allow update, delete: if false;
    }
  }
}
```

## Testing

After setup:
1. Test the contact form - you should receive an email
2. Test the comments section - comments should save to Firebase and display in real-time

