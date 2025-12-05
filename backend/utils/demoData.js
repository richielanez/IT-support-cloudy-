export const demoUser = {
  _id: "000000000000000000000000",
  name: "Demo User",
  email: "demo@cloudy-demo.test",
  companyName: "DemoCorp",
  vatNumber: "VAT-DEMO-123",
  address: "123 Demo Street",
  city: "Demo City",
  country: "DemoLand",
  phone: "+31 6 12345678",
  subscriptionStatus: "active",
  subscriptionPlan: "monthly",
  subscriptionCurrentPeriodEnd: new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  ),
};

export const demoInvoices = [
  {
    _id: "inv1",
    invoiceNumber: "INV-10001",
    customerEmail: "demo@cloudy-demo.test",
    customerName: "Demo User",
    grandTotal: 149.99,
    total: 129.99,
    tax: 20.0,
    paymentStatus: "paid",
    createdAt: new Date(),
    items: [
      { description: "Remote IT Support Session (2h)", quantity: 1, price: 129.99 },
    ],
  },
  {
    _id: "inv2",
    invoiceNumber: "INV-10002",
    customerEmail: "demo@cloudy-demo.test",
    customerName: "Demo User",
    grandTotal: 89.99,
    total: 79.99,
    tax: 10.0,
    paymentStatus: "unpaid",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    items: [
      { description: "Laptop Tune‑Up & Cleanup", quantity: 1, price: 79.99 },
    ],
  },
  {
    _id: "inv3",
    invoiceNumber: "INV-10003",
    customerEmail: "demo@cloudy-demo.test",
    customerName: "Demo User",
    grandTotal: 249.99,
    total: 219.99,
    tax: 30.0,
    paymentStatus: "failed",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    items: [
      { description: "Small Office Network Setup", quantity: 1, price: 219.99 },
    ],
  },
];

export const demoActivities = [
  {
    _id: "act1",
    type: "login_success",
    createdAt: new Date(),
    ip: "127.0.0.1",
    meta: {},
  },
  {
    _id: "act2",
    type: "invoice_paid",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    ip: "127.0.0.1",
    meta: { invoiceNumber: "INV-10001", provider: "stripe" },
  },
  {
    _id: "act3",
    type: "profile_updated",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    ip: "127.0.0.1",
    meta: {},
  },
];
