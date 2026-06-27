# ⚡ Stripe MERN Payment Integration

A full-stack MERN app with two Stripe payment flows — custom card form (Payment Intents API) and Stripe-hosted Checkout.

## Project Structure

```
stripe-mern/
├── server/           # Node.js + Express + MongoDB
│   ├── controllers/
│   │   ├── payment.controller.js   # Stripe logic
│   │   └── order.controller.js
│   ├── models/
│   │   └── Order.js                # Mongoose schema
│   ├── routes/
│   │   ├── payment.routes.js
│   │   └── order.routes.js
│   ├── index.js                    # Express entry point
│   └── .env.example
│
└── client/           # React + Vite + Stripe.js
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── CardPaymentForm.jsx  # Custom Stripe card form
        └── pages/
            ├── Home.jsx       # Shop + cart
            ├── Checkout.jsx   # Choose payment method
            ├── Success.jsx    # Post-payment confirmation
            ├── Cancel.jsx     # Cancelled payment
            └── Orders.jsx     # Order history dashboard
```

## Setup

### 1. Get Stripe Keys
Go to https://dashboard.stripe.com/test/apikeys and grab:
- **Publishable key** → `pk_test_...`
- **Secret key** → `sk_test_...`

### 2. Backend
```bash
cd server
cp .env.example .env
# Fill in your keys in .env
npm install
node index.js
```

### 3. Frontend
```bash
cd client
cp .env.example .env
# Fill in VITE_STRIPE_PUBLISHABLE_KEY
npm install
npm run dev
```

### 4. Stripe Webhook (optional, for production)
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:5000/api/payments/webhook
# Copy the webhook signing secret to STRIPE_WEBHOOK_SECRET in .env
```

## Payment Flows

| Method | How it works |
|--------|-------------|
| **Custom Form** | Uses `CardElement` + Payment Intents API. Card stays on your page. |
| **Stripe Hosted** | Redirects to `stripe.com/checkout`. No PCI scope for you. |

## Test Cards

| Card Number | Result |
|------------|--------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0000 0000 0002` | ❌ Declined |
| `4000 0025 0000 3155` | 🔐 3D Secure required |

Use any future expiry date and any 3-digit CVC.

## API Endpoints

```
POST /api/payments/create-payment-intent     # Custom card form
POST /api/payments/create-checkout-session   # Hosted checkout
GET  /api/payments/verify-session/:id        # Verify after redirect
POST /api/payments/webhook                   # Stripe webhook events
GET  /api/orders                             # All orders
GET  /api/orders/:id                         # Single order
GET  /api/orders/customer/:email             # Orders by email
```
