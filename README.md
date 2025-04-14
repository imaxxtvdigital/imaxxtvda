# Registration Form with Firebase and Razorpay (Client-Side Only)

This project implements a registration form that stores user data in Firebase Firestore and processes payments using Razorpay, all directly from the browser without requiring a Node.js server.

## Setup Instructions

### Prerequisites
- Firebase account
- Razorpay account
- Web hosting service (GitHub Pages, Netlify, Vercel, etc.)

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Set up Firestore security rules to allow write access for your registration form
4. The Firebase configuration is already included in the HTML file

### Razorpay Setup
1. Create a Razorpay account at [Razorpay](https://razorpay.com/)
2. Get your API key from the Razorpay Dashboard
3. The Razorpay key is already included in the HTML file (you may want to replace it with your own)

### Deployment
1. Upload the files to your web hosting service
2. Access the registration form at your domain

## Features
- User registration form
- Data storage in Firebase Firestore
- Secure payment processing with Razorpay
- Responsive design for all devices
- No server-side code required

## How It Works
1. User fills out the registration form
2. Form data is submitted directly to Firebase Firestore
3. Razorpay payment modal is opened
4. Upon successful payment, the user's payment status is updated in Firebase
5. User receives confirmation of registration

## Firestore Database Structure
- **users**: Collection storing user registration data
  - User details (name, email, etc.)
  - Payment status
  - Timestamp
- **payments**: Collection storing payment records
  - Payment ID
  - User ID
  - Amount
  - Status
  - Timestamp

## Security Considerations
Since this is a client-side only implementation, you should set up proper Firestore security rules to protect your data. Here's a basic example:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow create: if request.resource.data.paymentStatus == 'pending';
      allow update: if request.resource.data.paymentStatus == 'paid';
    }
    match /payments/{paymentId} {
      allow create: if request.resource.data.status == 'completed';
    }
  }
}
```

## Customization
- Update the Firebase configuration with your own project details if needed
- Update the Razorpay key with your own key
- Modify the form fields as needed for your specific use case 