# nxtTrend Cart Features

## Project Overview

**nxtTrend** is a modern React-based e-commerce shopping cart application designed to demonstrate best practices in state management, component architecture, and user authentication. This project implements comprehensive cart management features including item manipulation, real-time price calculations, and a responsive user interface.

## Project Description

The application provides a complete shopping cart experience with the following core functionalities:
- **Secure User Authentication**: Role-based access control with Prime and Non-Prime user accounts
- **Dynamic Cart Management**: Add, remove, and modify product quantities in real-time
- **Smart Inventory Handling**: Prevent duplicate items by consolidating quantities
- **Real-time Calculations**: Automatic total price updates based on cart modifications
- **Responsive Design**: Optimized for desktop and mobile devices

## Core Features

### 1. Authentication & Authorization
- Route protection for authenticated users only
- Automatic redirection to login for unauthenticated access to cart
- Support for multiple user roles (Prime and Non-Prime)

### 2. Product Management
- Browse product catalog
- View detailed product information
- Add products to cart with quantity selection

### 3. Cart Operations
- **Smart Add-to-Cart**: When adding an existing product, quantity is updated rather than creating duplicates
- **Quantity Control**: Increment/decrement buttons for each cart item
- **Automatic Removal**: Items are removed when quantity reaches zero
- **Bulk Actions**: Remove all items from cart with a single action
- **Empty Cart View**: Dedicated view when cart is empty

### 4. Cart Summary
- Real-time total price calculation
- Item count display
- Checkout button with integrated payment flow

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | React | 17.0.1 |
| **Routing** | React Router DOM | 5.2.0 |
| **State Management** | React Context API | Built-in |
| **Icons** | react-icons | 4.2.0 |
| **UI Components** | React Loader Spinner | 4.0.0 |
| **Cookie Management** | js-cookie | 3.0.0 |
| **Testing** | Jest & React Testing Library | 11.2.5 |
| **Code Quality** | ESLint & Prettier | 8.1.0 & 2.2.1 |

## Project Architecture

### Component Hierarchy
```
App
├── LoginForm
├── ProtectedRoute
│   ├── Home
│   ├── Products
│   │   ├── Header
│   │   ├── FiltersGroup
│   │   ├── AllProductsSection
│   │   │   └── ProductCard
│   │   └── PrimeDealsSection
│   │       └── ProductCard
│   ├── ProductItemDetails
│   │   ├── Header
│   │   └── SimilarProductItem
│   └── Cart
│       ├── Header
│       ├── CartListView
│       │   └── CartItem (with quantity controls)
│       ├── CartSummary
│       └── EmptyCartView
└── NotFound
```

### State Management with CartContext

The application uses React Context API for global state management:

```javascript
CartContext = {
  cartList: Array,                          // Array of cart items
  addCartItem: (product, count) => void,    // Add item to cart
  removeCartItem: (productId) => void,      // Remove item from cart
  removeAllCartItems: () => void,           // Clear entire cart
  incrementCartItemQuantity: (productId) => void,  // Increase quantity
  decrementCartItemQuantity: (productId) => void   // Decrease quantity
}
```

## Getting Started

### Prerequisites
- Node.js: ^10.13 || 12 || 14 || 15
- npm: >=6

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajasekhargeddam/nxtTrend.git
   cd nxtTrend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Runs development server with hot reload |
| `npm test` | Launches Jest test runner in watch mode |
| `npm run build` | Creates optimized production build |
| `npm run lint` | Analyzes code for errors and warnings |
| `npm run lint:fix` | Automatically fixes linting issues |
| `npm run format` | Formats code with Prettier |
| `npm run run-all` | Runs tests and lint checks in parallel |

## Key Implementation Files

The following files require implementation or modification:

| File | Purpose |
|------|---------|
| `src/App.js` | Main application component with routing and cart state management |
| `src/components/Cart/index.js` | Cart page displaying items or empty state |
| `src/components/Cart/index.css` | Cart page styling |
| `src/components/CartItem/index.js` | Individual cart item component with controls |
| `src/components/CartItem/index.css` | Cart item styling |
| `src/components/CartSummary/index.js` | Cart totals and checkout summary |
| `src/components/CartSummary/index.css` | Summary section styling |

## Feature Requirements

### Feature 1: Duplicate Product Handling
When an authenticated user adds the same product multiple times:
- Product quantity is incremented
- Cart item count in header remains unchanged
- No duplicate entries created

### Feature 2: Cart Summary Display
The Cart route displays:
- Total amount of all items
- Number of items in the cart
- Checkout button

### Feature 3: Cart Item Controls
Each cart item includes:
- **Plus Button** (BsPlusSquare): Increments quantity by 1
- **Minus Button** (BsDashSquare): Decrements quantity by 1 or removes item when quantity = 1
- **Remove Button** (AiFillCloseCircle): Removes item from cart
- **Dynamic Pricing**: Total updates based on quantity changes

### Feature 4: Single Item Removal
- Remove button functionality for individual items
- Immediate UI update after removal

### Feature 5: Clear Cart
- "Remove All" button to clear entire cart
- Display empty cart view upon successful removal

## Test Credentials

### Prime User Account
```
Username: rahul
Password: rahul@2021
```

### Non-Prime User Account
```
Username: raja
Password: raja@2021
```

## Design Resources

### Responsive Breakpoints
- **Extra Small**: Width < 576px
- **Small**: Width ≥ 576px
- **Medium**: Width ≥ 768px
- **Large**: Width ≥ 992px
- **Extra Large**: Width ≥ 1200px

### Color Palette
| Color Name | Hex Code | Usage |
|-----------|----------|-------|
| Primary Blue | `#0b69ff` | Buttons, links, primary actions |
| Dark Navy | `#171f46` | Text, backgrounds |
| Medium Gray | `#616e7c` | Secondary text, icons |
| White | `#ffffff` | Background, text contrast |

### Typography
- **Font Family**: Roboto
- **Line Height**: 1.5 (for readability)

## Testing Requirements

### Test Data Attributes
The following `data-testid` attributes are required for test compatibility:

| Component | Attribute | Value |
|-----------|-----------|-------|
| CartItem | Minus Button | `minus` |
| CartItem | Plus Button | `plus` |
| CartItem | Remove Button | `remove` |
| CartItem | Product Image | `alt={product.title}` |

### Icon Requirements
- **Plus Icon**: `BsPlusSquare` from react-icons/bs
- **Minus Icon**: `BsDashSquare` from react-icons/bs
- **Remove Icon**: `AiFillCloseCircle` from react-icons/ai

## Development Best Practices

### Code Quality
- Follow Airbnb ESLint configuration
- Use Prettier for consistent code formatting
- Maintain component-scoped CSS modules
- Write descriptive component and function names

### Pre-commit Hooks
- Automated linting and formatting via Husky
- Staged file validation before commits
- Prevents code quality degradation

### Component Structure
- All components reside in `src/components`
- Maintain existing folder names (used in test imports)
- Keep pre-filled code intact
- Use functional components with hooks where applicable

## Browser Support

| Browser | Versions |
|---------|----------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Edge | Last 2 versions |
| Firefox ESR | Latest |
| IE | 11+ |

## Performance Considerations

- Lazy loading of product images
- Optimized re-renders using React.memo
- Efficient state updates in CartContext
- CSS-in-JS for component-scoped styling

## Future Enhancements

- Payment gateway integration
- Order history and tracking
- Wishlist functionality
- Product recommendations
- Guest checkout option
- Multi-currency support
- Inventory synchronization

## Project Resources

- [React Documentation](https://reactjs.org)
- [React Router Documentation](https://reactrouter.com)
- [react-icons Library](https://react-icons.github.io/react-icons/)
- [Jest Testing Documentation](https://jestjs.io)

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/feature-name`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to branch (`git push origin feature/feature-name`)
5. Submit a Pull Request

## License

This project is private and intended for educational purposes.

## Support & Questions

For issues or questions regarding the project implementation, please refer to the test specifications or contact the development team.

---

**Version**: 1.0.0
**Last Updated**: April 2026
**Language Composition**: JavaScript (59.2%), CSS (37.2%), HTML (3.6%)