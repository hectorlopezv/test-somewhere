import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, MapPin, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <main className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            Welcome to Localcoin
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore our cryptocurrency dashboard and ATM locator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Crypto Dashboard Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Crypto Dashboard</CardTitle>
              </div>
              <CardDescription>
                View live cryptocurrency prices, search and filter coins, and track market changes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ArrowRight className="size-4" />
                  Top 10 cryptocurrencies
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="size-4" />
                  Real-time price updates
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="size-4" />
                  Search and sorting
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="size-4" />
                  Responsive design
                </li>
              </ul>
              <Link href="/crypto">
                <Button className="w-full" size="lg">
                  View Dashboard
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* ATM Locator Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">ATM Locator</CardTitle>
              </div>
              <CardDescription>
                Find Localcoin ATMs near you with real-time status and map integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ArrowRight className="size-4" />
                  Multiple locations
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="size-4" />
                  Online/Offline status
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="size-4" />
                  Interactive map view
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="size-4" />
                  Filter by status
                </li>
              </ul>
              <Link href="/atm">
                <Button className="w-full" size="lg">
                  Find ATMs
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
