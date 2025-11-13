'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MapPin, Wifi, WifiOff } from 'lucide-react';

const ATMMap = dynamic(() => import('@/components/atm-map').then((mod) => mod.ATMMap), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
});

interface ATM {
  id: number;
  location: string;
  status: 'Online' | 'Offline';
  latitude?: number;
  longitude?: number;
}

const sampleATMs: ATM[] = [
  { id: 1, location: 'Toronto', status: 'Online', latitude: 43.6532, longitude: -79.3832 },
  { id: 2, location: 'Montreal', status: 'Offline', latitude: 45.5017, longitude: -73.5673 },
  { id: 3, location: 'Vancouver', status: 'Online', latitude: 49.2827, longitude: -123.1207 },
  { id: 4, location: 'Calgary', status: 'Online', latitude: 51.0447, longitude: -114.0719 },
  { id: 5, location: 'Ottawa', status: 'Offline', latitude: 45.4215, longitude: -75.6972 },
  { id: 6, location: 'Edmonton', status: 'Online', latitude: 53.5461, longitude: -113.4938 },
  { id: 7, location: 'Winnipeg', status: 'Online', latitude: 49.8951, longitude: -97.1384 },
  { id: 8, location: 'Quebec City', status: 'Offline', latitude: 46.8139, longitude: -71.2080 },
];

export default function ATMLocator() {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [selectedATM, setSelectedATM] = useState<ATM | null>(null);

  const filteredATMs = useMemo(() => {
    if (showOnlineOnly) {
      return sampleATMs.filter((atm) => atm.status === 'Online');
    }
    return sampleATMs;
  }, [showOnlineOnly]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            ATM Locator
          </h1>
          <p className="text-muted-foreground">
            Find Localcoin ATMs near you
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Filter ATMs</CardTitle>
                <CardDescription>
                  {filteredATMs.length} ATM{filteredATMs.length !== 1 ? 's' : ''} found
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  id="online-only"
                  checked={showOnlineOnly}
                  onCheckedChange={setShowOnlineOnly}
                />
                <label
                  htmlFor="online-only"
                  className="text-sm font-medium cursor-pointer"
                >
                  Show Online Only
                </label>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card className="hidden md:block">
              <CardHeader>
                <CardTitle>Available ATMs</CardTitle>
                <CardDescription>
                  Click on an ATM to view it on the map
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredATMs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                          No ATMs found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredATMs.map((atm) => (
                        <TableRow
                          key={atm.id}
                          className={`cursor-pointer ${
                            selectedATM?.id === atm.id ? 'bg-muted' : ''
                          }`}
                          onClick={() => setSelectedATM(atm)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="size-4 text-muted-foreground" />
                              <span className="font-medium">{atm.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={atm.status === 'Online' ? 'default' : 'outline'}
                              className={
                                atm.status === 'Online'
                                  ? 'bg-green-500 hover:bg-green-600 text-white border-transparent'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                              }
                            >
                              {atm.status === 'Online' ? (
                                <Wifi className="size-3 mr-1" />
                              ) : (
                                <WifiOff className="size-3 mr-1" />
                              )}
                              {atm.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedATM(atm);
                              }}
                            >
                              View Map
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="md:hidden space-y-4">
              {filteredATMs.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No ATMs found.
                  </CardContent>
                </Card>
              ) : (
                filteredATMs.map((atm) => (
                  <Card
                    key={atm.id}
                    className={`cursor-pointer transition-colors ${
                      selectedATM?.id === atm.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedATM(atm)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-5 text-muted-foreground" />
                          <h3 className="text-lg font-semibold">{atm.location}</h3>
                        </div>
                        <Badge
                          variant={atm.status === 'Online' ? 'default' : 'outline'}
                          className={
                            atm.status === 'Online'
                              ? 'bg-green-500 hover:bg-green-600 text-white border-transparent'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          }
                        >
                          {atm.status === 'Online' ? (
                            <Wifi className="size-3 mr-1" />
                          ) : (
                            <WifiOff className="size-3 mr-1" />
                          )}
                          {atm.status}
                        </Badge>
                      </div>
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedATM(atm);
                        }}
                      >
                        View on Map
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Map Preview</CardTitle>
              <CardDescription>
                {selectedATM
                  ? `Viewing ${selectedATM.location} ATM`
                  : 'Select an ATM to view on map'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ATMMap atm={selectedATM} />
              {selectedATM && (
                <div className="p-4 bg-muted mt-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        <MapPin className="size-4" />
                        {selectedATM.location}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Status:{' '}
                        <Badge
                          variant={selectedATM.status === 'Online' ? 'default' : 'outline'}
                          className={
                            selectedATM.status === 'Online'
                              ? 'bg-green-500 hover:bg-green-600 text-white border-transparent ml-1'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 ml-1'
                          }
                        >
                          {selectedATM.status === 'Online' ? (
                            <Wifi className="size-3 mr-1" />
                          ) : (
                            <WifiOff className="size-3 mr-1" />
                          )}
                          {selectedATM.status}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
