# SastoKinBech

Nepali storefront with product search, category filters, variant-aware cart, Cash On Delivery checkout, Google Sheets records, business order alerts and customer confirmation emails.

Live website: https://newsastokinbech.vercel.app

## Run locally

Use Node.js 24. Run npm ci, copy .env.example to .env.local, fill the credentials, then run npm run dev. Open http://127.0.0.1:3001. This server supports the order API; a plain static server does not. Run npm test and npm run build before deployment. Vercel serves only the explicitly built dist folder and runs api/order.js as a Node function.

Keep .env.local private. Use Vercel Production environment settings for all credentials, and redeploy after changing them. Never commit credentials. Rotate any disclosed credentials.

## Configuration

Google: enable Sheets API and share the spreadsheet with GOOGLE_SERVICE_ACCOUNT_EMAIL as Editor. Set GOOGLE_SHEET_ID and GOOGLE_PRIVATE_KEY. Actual newlines or literal backslash-n sequences work in the private key. GOOGLE_SHEET_TAB_NAME points to the existing oder tab. GOOGLE_LEDGER_TAB_NAME defaults to _OrderRequests.

Email: use a Gmail App Password with smtp.gmail.com, port 587 and STARTTLS. SMTP_USER authenticates EMAIL_FROM. BUSINESS_EMAIL receives seller alerts and replies. FRONTEND_URL must match the production origin exactly. All variable names appear in .env.example.

npm run setup:sheet formats a blank compatible order sheet. It refuses incompatible existing headings. Re-running keeps compatible order rows and refreshes styling, filters and dropdowns. Do not run on unrelated spreadsheets.

## Product and shipping settings

catalog.js is the shared source for browser and authoritative server prices. White dress is product 9, NPR 1,999 (original 2,999). Denim jacket is product 2, NPR 2,999 (original 3,999). Other catalogue content comes from the initial demo; the owner should verify it before advertising. Availability, size, delivery time and return conditions are confirmed by phone. Inventory management and customer accounts are not included.

Existing shipping policy is preserved: NPR 100 inside Kathmandu Valley, NPR 150 elsewhere in Nepal, free for merchandise totals of NPR 2,000 or more. Server calculates totals independently. Maximum 20 distinct options, 12 units per option and 50 units per order. Unknown products, colors and sizes are rejected. Quick-add products without chosen variants are standard and confirmed by phone.

## Order flow

Checkout collects name, Nepali mobile, email, region, city and address; landmark and note are optional. It disables duplicate clicks and posts JSON to /api/order. Server validates fields, origin, honeypot and catalogue options, calculates the total and creates an SKB reference with New Order and Cash On Delivery.

The hidden _OrderRequests tab stores request UUIDs, payload hashes and processing progress. The earliest appended claim owns each request. A completed identical retry returns the same receipt. It first saves the order summary in oder, then line items in Order Items, then sends the seller email and customer email. Both notifications use styled HTML and a plain-text fallback. Success is returned only after all required steps complete. Email status changes to Sent when SMTP accepts it. Inbox delivery is not guaranteed; check spam/bounces when necessary.

The browser clears the cart only after success and displays the thank-you receipt. It stores only the request UUID and a receipt without customer contact details in sessionStorage.

## Sheet layout

Existing oder tab is preserved. Title row 2, context row 3, headings row 5, data from row 6. Dark header, orange accent, alternating rows, frozen headings, filter, number formats, Nepal date/time display and colored status dropdowns.

A-M: Order ID, Date & Time, Customer Name, Phone Number, Email Address, Exact Location, Product Name / Options, Quantity, Price Per Piece, Total Price, Payment Method, Order Status, Notes. N-R: Subtotal, Delivery, Delivery Area, Business Email, Customer Email. Total includes delivery. For multiple items, unit price says See Order Items; numeric individual prices and line totals are in Order Items. Dates are numeric spreadsheet date-times in Nepal time; phones are text. RAW writes prevent customer input becoming spreadsheet formulas.

Order status: New Order, Order Confirmed, Order Ongoing, Delivered, Cancelled. Update column L as orders progress. This version does not send status-change emails. Email states are Pending, Sent and Needs review. Do not reorder columns or insert rows above the headings. The hidden ledger is a layout aid, not a security boundary: keep sharing private.

## Failures and recovery

Sheets and SMTP are not a single transaction. Every external step is marked pending before it begins. Provider errors or uncertain responses stop processing and show a clear support/reference message. A saved order may exist without a success redirect; check before asking the customer to reorder. Incomplete requests intentionally require review rather than blindly repeating writes or email.

Administrators should inspect the ledger, order rows and sender logs, verify external outcomes and resolve pending stages manually. There is no automatic reconciliation worker or public recovery endpoint. Back up data before manual ledger edits. Never clear an unknown pending stage and replay blindly.

The claim workflow relies on Sheets append/read consistency and targets a small store; Sheets is not a transactional order database. For higher traffic use a database with unique constraints plus an outbox/queue. Basic rate limiting is per function instance (30 attempts per 10 minutes per observed IP), not a global bot defence. Restrict access to contact details and define a retention policy for order and ledger data.

## Testing and deployment

npm test covers prices/shipping, invalid fields, Nepal digits, bad variants, duplicate items, notification order, retries, concurrent claims, provider failures and email HTML escaping with mocks. It sends no real email.

Verify production separately with a clearly labeled test order: one summary row, correct line items/totals, both SMTP notifications, successful receipt, then identical retry without duplicate records. Mark the test order Cancelled after testing.

Vercel uses vercel.json and the linked GitHub repository. Environment values remain in private project settings. Check function logs for order reference and failed stage; secrets and customer details are intentionally omitted. Do not share .env.local contents in logs or screenshots.
