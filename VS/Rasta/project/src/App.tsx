import React, { useState } from 'react';
import { MapPin, Bus, Clock, Navigation, Search, Star, Menu, X, MapIcon, List, Info, Settings, BellRing } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('route-finder');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapView, setMapView] = useState('standard');
  const [showLiveTracking, setShowLiveTracking] = useState(false);
  const [savedRoutes, setSavedRoutes] = useState<string[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleRouteSelect = (route: string) => {
    setSelectedRoute(route);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would trigger an API call to search for routes
    console.log('Searching for:', query);
  };

  const toggleSaveRoute = (route: string) => {
    if (savedRoutes.includes(route)) {
      setSavedRoutes(savedRoutes.filter(r => r !== route));
    } else {
      setSavedRoutes([...savedRoutes, route]);
    }
  };

  const toggleLiveTracking = () => {
    setShowLiveTracking(!showLiveTracking);
  };

  const changeMapView = (view: string) => {
    setMapView(view);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Bus className="h-8 w-8 mr-2" />
              <h1 className="text-xl font-bold">TN Bus Navigator</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <button 
                className={`px-3 py-2 rounded-md ${activeTab === 'route-finder' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
                onClick={() => handleTabChange('route-finder')}
              >
                <span className="flex items-center">
                  <Navigation className="h-5 w-5 mr-1" />
                  Route Finder
                </span>
              </button>
              <button 
                className={`px-3 py-2 rounded-md ${activeTab === 'live-tracking' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
                onClick={() => handleTabChange('live-tracking')}
              >
                <span className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  Live Tracking
                </span>
              </button>
              <button 
                className={`px-3 py-2 rounded-md ${activeTab === 'timings' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
                onClick={() => handleTabChange('timings')}
              >
                <span className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  Bus Timings
                </span>
              </button>
              <button 
                className={`px-3 py-2 rounded-md ${activeTab === 'nearby' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
                onClick={() => handleTabChange('nearby')}
              >
                <span className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  Nearby Stops
                </span>
              </button>
            </div>
            <button 
              className="md:hidden text-white"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 relative">
        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-blue-700 text-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={toggleSidebar}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <Bus className="h-8 w-8 mr-2" />
                  <span className="text-xl font-bold">TN Bus Navigator</span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  <button 
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${activeTab === 'route-finder' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
                    onClick={() => handleTabChange('route-finder')}
                  >
                    <Navigation className="mr-4 h-6 w-6" />
                    Route Finder
                  </button>
                  <button 
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${activeTab === 'live-tracking' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
                    onClick={() => handleTabChange('live-tracking')}
                  >
                    <MapPin className="mr-4 h-6 w-6" />
                    Live Tracking
                  </button>
                  <button 
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${activeTab === 'timings' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
                    onClick={() => handleTabChange('timings')}
                  >
                    <Clock className="mr-4 h-6 w-6" />
                    Bus Timings
                  </button>
                  <button 
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${activeTab === 'nearby' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
                    onClick={() => handleTabChange('nearby')}
                  >
                    <MapPin className="mr-4 h-6 w-6" />
                    Nearby Stops
                  </button>
                  <button 
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${activeTab === 'saved' ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
                    onClick={() => handleTabChange('saved')}
                  >
                    <Star className="mr-4 h-6 w-6" />
                    Saved Routes
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Search Box - Always visible */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search for bus routes, stops, or bus numbers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                />
                <button 
                  className="absolute inset-y-0 right-0 px-4 text-blue-600 hover:text-blue-800"
                  onClick={() => handleSearch(searchQuery)}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === 'route-finder' && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Bus className="mr-2 text-blue-600" size={24} />
                    Bus Route Finder
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      {/* Route Selection Controls */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Starting Point</label>
                          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select starting point</option>
                            <option value="chennai">Chennai</option>
                            <option value="coimbatore">Coimbatore</option>
                            <option value="madurai">Madurai</option>
                            <option value="trichy">Trichy</option>
                            <option value="salem">Salem</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select destination</option>
                            <option value="chennai">Chennai</option>
                            <option value="coimbatore">Coimbatore</option>
                            <option value="madurai">Madurai</option>
                            <option value="trichy">Trichy</option>
                            <option value="salem">Salem</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Travel</label>
                          <input 
                            type="date" 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time of Travel</label>
                          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select time</option>
                            <option value="morning">Morning (6 AM - 12 PM)</option>
                            <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                            <option value="evening">Evening (6 PM - 12 AM)</option>
                            <option value="night">Night (12 AM - 6 AM)</option>
                          </select>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                          Find Routes
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* Map Display */}
                      <div className="bg-gray-200 rounded-lg h-96 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-gray-500">Interactive Map will be displayed here</p>
                        </div>
                        
                        {/* Map Controls */}
                        <div className="absolute top-2 right-2 bg-white rounded-md shadow-md p-2">
                          <div className="flex flex-col space-y-2">
                            <button 
                              className={`p-2 rounded-md ${mapView === 'standard' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                              onClick={() => changeMapView('standard')}
                              title="Standard View"
                            >
                              <MapIcon size={20} />
                            </button>
                            <button 
                              className={`p-2 rounded-md ${mapView === 'satellite' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                              onClick={() => changeMapView('satellite')}
                              title="Satellite View"
                            >
                              <MapIcon size={20} />
                            </button>
                            <button 
                              className={`p-2 rounded-md ${mapView === 'terrain' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                              onClick={() => changeMapView('terrain')}
                              title="Terrain View"
                            >
                              <MapIcon size={20} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Live Tracking Toggle */}
                        <div className="absolute bottom-2 left-2 bg-white rounded-md shadow-md p-2">
                          <button 
                            className={`flex items-center space-x-1 ${showLiveTracking ? 'text-blue-600' : 'text-gray-600'}`}
                            onClick={toggleLiveTracking}
                          >
                            <BellRing size={16} />
                            <span className="text-sm">{showLiveTracking ? 'Live Tracking On' : 'Enable Live Tracking'}</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Route Information */}
                      <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Route Information</h3>
                        <p className="text-gray-500 text-sm">Select a route to view detailed information</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'live-tracking' && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <MapPin className="mr-2 text-blue-600" size={24} />
                    Live Bus Tracking
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bus Number</label>
                          <input 
                            type="text" 
                            placeholder="Enter bus number" 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select route</option>
                            <option value="chennai-coimbatore">Chennai - Coimbatore</option>
                            <option value="madurai-trichy">Madurai - Trichy</option>
                            <option value="salem-chennai">Salem - Chennai</option>
                          </select>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                          Track Bus
                        </button>
                        
                        <div className="mt-4">
                          <h3 className="text-md font-medium text-gray-800 mb-2">Notifications</h3>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="notify" 
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="notify" className="ml-2 block text-sm text-gray-700">
                              Notify me when bus is approaching
                            </label>
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notification Distance</label>
                            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                              <option value="5">5 minutes away</option>
                              <option value="10">10 minutes away</option>
                              <option value="15">15 minutes away</option>
                              <option value="30">30 minutes away</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* Live Tracking Map */}
                      <div className="bg-gray-200 rounded-lg h-96 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-gray-500">Live Tracking Map will be displayed here</p>
                        </div>
                        
                        {/* Map Controls */}
                        <div className="absolute top-2 right-2 bg-white rounded-md shadow-md p-2">
                          <div className="flex flex-col space-y-2">
                            <button 
                              className={`p-2 rounded-md ${mapView === 'standard' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                              onClick={() => changeMapView('standard')}
                              title="Standard View"
                            >
                              <MapIcon size={20} />
                            </button>
                            <button 
                              className={`p-2 rounded-md ${mapView === 'satellite' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                              onClick={() => changeMapView('satellite')}
                              title="Satellite View"
                            >
                              <MapIcon size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Live Bus Information */}
                      <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Live Bus Information</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Current Location:</span>
                            <span className="font-medium">Tambaram</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Next Stop:</span>
                            <span className="font-medium">Chromepet (ETA: 5 mins)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Speed:</span>
                            <span className="font-medium">45 km/h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Occupancy:</span>
                            <span className="font-medium">Medium</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timings' && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Clock className="mr-2 text-blue-600" size={24} />
                    Bus Timings & Schedules
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bus Stop</label>
                          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select bus stop</option>
                            <option value="central">Chennai Central</option>
                            <option value="tambaram">Tambaram</option>
                            <option value="koyambedu">Koyambedu</option>
                            <option value="guindy">Guindy</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
                          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="all">All Day</option>
                            <option value="morning">Morning (6 AM - 12 PM)</option>
                            <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                            <option value="evening">Evening (6 PM - 12 AM)</option>
                            <option value="night">Night (12 AM - 6 AM)</option>
                          </select>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                          Show Timings
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* Bus Timings Table */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bus No.
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Route
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Arrival Time
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Departure Time
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                23C
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Chennai - Tambaram
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                08:30 AM
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                08:35 AM
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  On Time
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                45B
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Koyambedu - Tambaram
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                09:00 AM
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                09:05 AM
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  Delayed (10 min)
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                17D
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Guindy - Tambaram
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                09:15 AM
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                09:20 AM
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  On Time
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                29C
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Chennai - Chromepet
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                09:30 AM
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                09:35 AM
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Cancelled
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Pagination */}
                      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify- between sm:hidden">
                          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Previous
                          </button>
                          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Next
                          </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm text-gray-700">
                              Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">12</span> results
                            </p>
                          </div>
                          <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span className="sr-only">Previous</span>
                                &larr;
                              </button>
                              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                1
                              </button>
                              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                                2
                              </button>
                              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                3
                              </button>
                              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span className="sr-only">Next</span>
                                &rarr;
                              </button>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'nearby' && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <MapPin className="mr-2 text-blue-600" size={24} />
                    Nearby Bus Stops
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
                          <div className="flex">
                            <input 
                              type="text" 
                              placeholder="Enter your location" 
                              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button className="bg-blue-600 text-white px-3 rounded-r-md hover:bg-blue-700">
                              <MapPin size={20} />
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Or use your current location</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="500m">Within 500m</option>
                            <option value="1km">Within 1km</option>
                            <option value="2km">Within 2km</option>
                            <option value="5km">Within 5km</option>
                          </select>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                          Find Nearby Stops
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* Nearby Stops Map */}
                      <div className="bg-gray-200 rounded-lg h-96 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-gray-500">Nearby Stops Map will be displayed here</p>
                        </div>
                      </div>
                      
                      {/* Nearby Stops List */}
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Nearby Bus Stops</h3>
                        <ul className="space-y-3">
                          <li className="bg-gray-50 p-3 rounded-md border border-gray-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-800">Tambaram Bus Stand</h4>
                                <p className="text-sm text-gray-600">0.3 km away (5 min walk)</p>
                                <div className="mt-1 text-xs text-gray-500">
                                  Buses: 23C, 45B, 17D, 29C
                                </div>
                              </div>
                              <button className="text-blue-600 hover:text-blue-800">
                                <Navigation size={20} />
                              </button>
                            </div>
                          </li>
                          <li className="bg-gray-50 p-3 rounded-md border border-gray-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-800">Chromepet Bus Stop</h4>
                                <p className="text-sm text-gray-600">0.8 km away (12 min walk)</p>
                                <div className="mt-1 text-xs text-gray-500">
                                  Buses: 23C, 45B, 29C
                                </div>
                              </div>
                              <button className="text-blue-600 hover:text-blue-800">
                                <Navigation size={20} />
                              </button>
                            </div>
                          </li>
                          <li className="bg-gray-50 p-3 rounded-md border border-gray-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-800">Pallavaram Bus Terminal</h4>
                                <p className="text-sm text-gray-600">1.5 km away (20 min walk)</p>
                                <div className="mt-1 text-xs text-gray-500">
                                  Buses: 17D, 29C, 45B, 23C, 70
                                </div>
                              </div>
                              <button className="text-blue-600 hover:text-blue-800">
                                <Navigation size={20} />
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'saved' && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Star className="mr-2 text-blue-600" size={24} />
                    Saved Routes
                  </h2>
                  
                  {savedRoutes.length === 0 ? (
                    <div className="text-center py-8">
                      <Star className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No saved routes</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Start by saving your favorite routes for quick access.
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {savedRoutes.map((route, index) => (
                        <li key={index} className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Bus className="h-6 w-6 text-gray-400" />
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{route}</p>
                                <p className="text-sm text-gray-500">Last used: Yesterday</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Navigation size={20} />
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-800"
                                onClick={() => toggleSaveRoute(route)}
                              >
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TN Bus Navigator</h3>
              <p className="text-gray-300 text-sm">
                Official bus route navigator and tracker for Tamil Nadu State Transport Corporation.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.527 2.013 9.867 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Contact</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5 mr-2" />
                  Chennai, Tamil Nadu
                </li>
                <li className="flex items-center text-gray-300">
                  <Info className="h-5 w-5 mr-2" />
                  Toll-free: 1800-XXX-XXXX
                </li>
                <li className="flex items-center text-gray-300">
                  <Settings className="h-5 w-5 mr-2" />
                  Support: support@tnbus.gov.in
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>&copy; 2025 TN Bus Navigator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;