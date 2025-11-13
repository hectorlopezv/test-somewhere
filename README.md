# Localcoin - Crypto Dashboard & ATM Locator

A modern web application built with Next.js, featuring a cryptocurrency dashboard and ATM locator. This project demonstrates frontend development skills with live data fetching, interactive maps, and responsive design.

## Features

### 1. Crypto Dashboard
- **Live cryptocurrency prices** from CoinGecko API
- **Top 10 cryptocurrencies** display with real-time updates
- **Search functionality** - Filter coins by name or symbol
- **Client-side sorting** - Sort by name, price, or 24h change
- **Color-coded changes** - Green for positive, red for negative 24h changes
- **Auto-refresh** - Updates every 30 seconds using React Query
- **Responsive design** - Optimized for mobile and desktop

### 2. ATM Locator
- **Interactive map** using Leaflet with OpenStreetMap tiles
- **ATM status display** - Online/Offline status with color coding
- **Filter toggle** - Show only online ATMs
- **Map preview** - Click any ATM to view it on an interactive map
- **Multiple locations** - Sample data for Canadian cities
- **Responsive layout** - Table view on desktop, cards on mobile

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Query (TanStack Query)** - Data fetching and caching
- **Leaflet** - Interactive maps
- **React Leaflet** - React bindings for Leaflet
- **Lucide React** - Icon library

## Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- CoinGecko API key (free tier available)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd somewheretest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
   ```
   
   To get a CoinGecko API key:
   - Visit [CoinGecko API](https://www.coingecko.com/en/api)
   - Sign up for a free account
   - Generate an API key
   - Add it to your `.env.local` file

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
somewheretest/
├── app/
│   ├── crypto/
│   │   └── page.tsx          # Crypto Dashboard page
│   ├── atm/
│   │   └── page.tsx           # ATM Locator page
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx               # Home page with navigation
│   ├── providers.tsx          # React Query provider
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   └── atm-map.tsx            # Leaflet map component
├── lib/
│   └── utils.ts               # Utility functions
└── public/                    # Static assets
```

## Usage Guide

### Home Page

The home page (`/`) provides navigation cards to access both features:
- **Crypto Dashboard** - Click to view live cryptocurrency prices
- **ATM Locator** - Click to find ATM locations

### Crypto Dashboard (`/crypto`)

1. **Viewing Cryptocurrencies**
   - The dashboard automatically loads the top 10 cryptocurrencies
   - Data refreshes every 30 seconds automatically
   - Each coin displays:
     - Rank
     - Name and symbol
     - Current price in USD
     - 24-hour price change percentage

2. **Searching Coins**
   - Use the search box to filter coins by name or symbol
   - Search is case-insensitive and updates in real-time

3. **Sorting**
   - Use the dropdown to sort by:
     - Name (A-Z or Z-A)
     - Price (Low to High or High to Low)
     - 24h Change (Low to High or High to Low)

4. **Understanding Colors**
   - **Green badges** - Positive 24h change (price increased)
   - **Red badges** - Negative 24h change (price decreased)

5. **Responsive Views**
   - **Desktop**: Table view with all columns visible
   - **Mobile**: Card view with essential information

### ATM Locator (`/atm`)

1. **Viewing ATMs**
   - The page displays a list of available ATMs
   - Each ATM shows:
     - Location name
     - Status (Online/Offline)
     - Action button to view on map

2. **Filtering ATMs**
   - Toggle the "Show Online Only" switch to filter offline ATMs
   - The count updates automatically

3. **Viewing on Map**
   - Click any ATM row or "View Map" button
   - The map updates to show the selected ATM location
   - The marker includes a popup with location and status
   - You can zoom and pan the map interactively

4. **Map Features**
   - Interactive zoom and pan
   - Marker popup with ATM details
   - Responsive design

5. **Responsive Views**
   - **Desktop**: Table view with map side-by-side
   - **Mobile**: Card view with map below

## API Configuration

### CoinGecko API

The application uses the CoinGecko API for cryptocurrency data. The free tier includes:
- 10-50 calls per minute
- Sufficient for development and small-scale use

**API Endpoint Used:**
```
GET https://api.coingecko.com/api/v3/coins/markets
```

**Parameters:**
- `vs_currency=usd` - Prices in USD
- `order=market_cap_desc` - Ordered by market cap
- `per_page=10` - Top 10 coins
- `page=1` - First page

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_COINGECKO_API_KEY` | CoinGecko API key for cryptocurrency data | Yes |

## Troubleshooting

### Map not loading
- Ensure Leaflet CSS is imported (handled automatically)
- Check browser console for errors
- Verify ATM coordinates are valid

### API errors
- Verify your CoinGecko API key is correct
- Check API rate limits (free tier: 10-50 calls/minute)
- Ensure `.env.local` file exists and is in the root directory

### Styling issues
- Clear browser cache
- Ensure Tailwind CSS is properly configured
- Check that all dependencies are installed

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

This project uses shadcn/ui. To add new components:

```bash
npx shadcn@latest add [component-name]
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- React Query for data fetching

## License

This project is for demonstration purposes.

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.
