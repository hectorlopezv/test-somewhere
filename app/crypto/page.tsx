'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap_rank: number;
}

type SortField = 'name' | 'price' | 'change';
type SortDirection = 'asc' | 'desc';

const fetchCryptoData = async (): Promise<CryptoCoin[]> => {
  const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (apiKey) {
    headers['x-cg-demo-api-key'] = apiKey;
  }
  
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
    { headers }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch crypto data');
  }
  
  return response.json();
};

export default function CryptoDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const { data: coins = [], isLoading, error } = useQuery({
    queryKey: ['crypto-data'],
    queryFn: fetchCryptoData,
    refetchInterval: 30000,
  });

  const filteredAndSortedCoins = useMemo(() => {
    let filtered = coins;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.current_price;
          bValue = b.current_price;
          break;
        case 'change':
          aValue = a.price_change_percentage_24h;
          bValue = b.price_change_percentage_24h;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return sorted;
  }, [coins, searchQuery, sortField, sortDirection]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatChange = (change: number) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Crypto Dashboard
          </h1>
          <p className="text-muted-foreground">
            Live cryptocurrency prices and market data
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>
              Search coins by name or symbol, and sort by different criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                <Input
                  type="text"
                  placeholder="Search by name or symbol..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={`${sortField}-${sortDirection}`}
                onValueChange={(value) => {
                  const [field, direction] = value.split('-') as [SortField, SortDirection];
                  setSortField(field);
                  setSortDirection(direction);
                }}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="change-asc">Change (Low to High)</SelectItem>
                  <SelectItem value="change-desc">Change (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Loading crypto data...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-destructive">
            <CardContent className="py-6">
              <p className="text-destructive">
                Error: {error instanceof Error ? error.message : 'An error occurred'}
              </p>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && (
          <>
            <Card className="hidden md:block">
              <CardHeader>
                <CardTitle>Top Cryptocurrencies</CardTitle>
                <CardDescription>
                  Showing {filteredAndSortedCoins.length} of {coins.length} coins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Coin</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="text-right">Price (USD)</TableHead>
                      <TableHead className="text-right">24h Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedCoins.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No coins found matching your search.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAndSortedCoins.map((coin) => (
                        <TableRow key={coin.id}>
                          <TableCell className="text-muted-foreground">
                            #{coin.market_cap_rank}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={coin.image}
                                alt={coin.name}
                                className="h-8 w-8 rounded-full"
                              />
                              <span className="font-medium">{coin.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="uppercase">
                              {coin.symbol}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatPrice(coin.current_price)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant={
                                coin.price_change_percentage_24h >= 0
                                  ? 'default'
                                  : 'destructive'
                              }
                              className={
                                coin.price_change_percentage_24h >= 0
                                  ? 'bg-green-500 hover:bg-green-600'
                                  : ''
                              }
                            >
                              {coin.price_change_percentage_24h >= 0 ? (
                                <TrendingUp className="size-3 mr-1" />
                              ) : (
                                <TrendingDown className="size-3 mr-1" />
                              )}
                              {formatChange(coin.price_change_percentage_24h)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="md:hidden space-y-4">
              {filteredAndSortedCoins.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No coins found matching your search.
                  </CardContent>
                </Card>
              ) : (
                filteredAndSortedCoins.map((coin) => (
                  <Card key={coin.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold">{coin.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs uppercase">
                                {coin.symbol}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Rank #{coin.market_cap_rank}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Price</p>
                          <p className="text-lg font-bold">{formatPrice(coin.current_price)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1">24h Change</p>
                          <Badge
                            variant={
                              coin.price_change_percentage_24h >= 0
                                ? 'default'
                                : 'destructive'
                            }
                            className={
                              coin.price_change_percentage_24h >= 0
                                ? 'bg-green-500 hover:bg-green-600'
                                : ''
                            }
                          >
                            {coin.price_change_percentage_24h >= 0 ? (
                              <TrendingUp className="size-3 mr-1" />
                            ) : (
                              <TrendingDown className="size-3 mr-1" />
                            )}
                            {formatChange(coin.price_change_percentage_24h)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
