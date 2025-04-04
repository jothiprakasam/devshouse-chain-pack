"use client";

import { useState } from "react";
import {
  LogOut,
  Settings,
  User,
  LayoutDashboard,
  Package,
  Download,
  Activity,
  Search,
  Plus,
  Folder,
  Bell,
  Moon,
  Sun,
  X,
  Upload,
  FileText,
  CheckCircle,
} from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";

// Define types for DashboardCard props
interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

// Define types for SidebarButton props
interface SidebarButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Mock function to simulate file upload
  const handleUpload = () => {
    if (!uploadFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Content for different sections
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard
                title="Total Packages"
                value="12"
                icon={<Package className="h-5 w-5" />}
                trend="+2 this week"
                trendUp={true}
              />
              <DashboardCard
                title="Downloads"
                value="1.2K"
                icon={<Download className="h-5 w-5" />}
                trend="+15% this month"
                trendUp={true}
              />
              <DashboardCard
                title="API Usage"
                value="90%"
                icon={<Activity className="h-5 w-5" />}
                trend="-5% from last week"
                trendUp={false}
              />
            </div>

            {/* Recent Activity */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 backdrop-blur-sm">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between p-2 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-blue-500/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">Package-{item} updated</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full border border-gray-200 dark:border-gray-700">
                        v1.{item}.0
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  onClick={() => setShowUploadModal(true)}
                >
                  <Plus className="h-4 w-4" /> Upload Package
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  <Folder className="h-4 w-4" /> View My Packages
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                  <Activity className="h-4 w-4" /> View Analytics
                </button>
              </div>
            </div>
          </>
        );
      case "packages":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Packages</h2>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={() => setShowUploadModal(true)}
              >
                <Plus className="h-4 w-4" /> New Package
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-md bg-blue-500/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Package-{item}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        v1.{item}.0
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    A sample package description that explains what this package
                    does and how it can be used.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Updated 2 days ago
                    </span>
                    <button className="text-blue-500 hover:text-blue-600 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard
                title="Total Downloads"
                value="5.2K"
                icon={<Download className="h-5 w-5" />}
                trend="+22% this month"
                trendUp={true}
              />
              <DashboardCard
                title="Active Users"
                value="328"
                icon={<User className="h-5 w-5" />}
                trend="+15 this week"
                trendUp={true}
              />
              <DashboardCard
                title="Avg. Response Time"
                value="42ms"
                icon={<Activity className="h-5 w-5" />}
                trend="-5ms from last week"
                trendUp={true}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium mb-4">Monthly Downloads</h3>
              <div className="h-64 flex items-end space-x-2">
                {[35, 45, 30, 65, 85, 75, 60, 80, 95, 70, 55, 65].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className="w-full bg-blue-500 rounded-t-sm"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs mt-1">
                        {
                          [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ][index]
                        }
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Profile</h2>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-2">
                    JD
                  </div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Developer
                  </p>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value="john.doe@example.com"
                      className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value="John Doe"
                      className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Bio
                    </label>
                    <textarea
                      className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      rows={3}
                      defaultValue="Software developer with 5 years of experience in web development."
                    ></textarea>
                  </div>

                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-medium mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                </div>

                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Settings</h2>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-medium mb-4">Appearance</h3>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Toggle between light and dark themes
                  </p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-medium mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive email updates about your account
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-medium mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative">
        {/* Background Beams */}
        <BackgroundBeams
          className="opacity-40"
          colors={
            darkMode
              ? ["#0a2463", "#3e92cc", "#2a628f", "#13293d", "#16324f"]
              : ["#e0f2fe", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7"]
          }
        />

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0 -ml-64"
          } min-h-screen p-5 z-10 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
              <Package className="h-5 w-5" />
            </div>
            <div className="font-bold text-xl">ChainPack</div>
          </div>

          <nav className="flex flex-col space-y-4">
            <SidebarButton
              icon={<LayoutDashboard />}
              text="Dashboard"
              isActive={activeSection === "dashboard"}
              onClick={() => setActiveSection("dashboard")}
            />
            <SidebarButton
              icon={<Package />}
              text="Packages"
              isActive={activeSection === "packages"}
              onClick={() => setActiveSection("packages")}
            />
            <SidebarButton
              icon={<Activity />}
              text="Analytics"
              isActive={activeSection === "analytics"}
              onClick={() => setActiveSection("analytics")}
            />
            <SidebarButton
              icon={<User />}
              text="Profile"
              isActive={activeSection === "profile"}
              onClick={() => setActiveSection("profile")}
            />
            <SidebarButton
              icon={<Settings />}
              text="Settings"
              isActive={activeSection === "settings"}
              onClick={() => setActiveSection("settings")}
            />
            <Link href="/auth/login" className="mt-auto">
              <SidebarButton
                icon={<LogOut />}
                text="Logout"
                className="text-red-500"
                onClick={() => {}}
              />
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6 relative z-10 overflow-auto">
          <header className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="9" x2="9" y1="3" y2="21" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold">Welcome to ChainPack</h1>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bell className="h-5 w-5" />
              </button>

              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              <div
                className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer"
                onClick={() => setActiveSection("profile")}
              >
                <User className="h-4 w-4" />
              </div>
            </div>
          </header>

          {/* Search Bar */}
          <div className="my-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
            <input
              placeholder="Search packages..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
            />
          </div>

          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </div>

      {/* Upload Package Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => {
                setShowUploadModal(false);
                setUploadFile(null);
                setUploadProgress(0);
                setIsUploading(false);
              }}
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-semibold mb-4">Upload Package</h3>

            {uploadProgress === 100 ? (
              <div className="text-center py-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-medium">Upload Complete!</p>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Your package has been uploaded successfully.
                </p>
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadFile(null);
                    setUploadProgress(0);
                    setIsUploading(false);
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Package Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      placeholder="my-awesome-package"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Version
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      placeholder="1.0.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      rows={3}
                      placeholder="A brief description of your package"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Package File
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-4 text-center">
                      {uploadFile ? (
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <span>{uploadFile.name}</span>
                          <button
                            className="ml-auto text-red-500"
                            onClick={() => setUploadFile(null)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Drag and drop your file here, or{" "}
                            <label className="text-blue-500 cursor-pointer">
                              browse
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                  e.target.files &&
                                  setUploadFile(e.target.files[0])
                                }
                              />
                            </label>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {isUploading && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleUpload}
                    disabled={!uploadFile || isUploading}
                  >
                    Upload
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Sidebar Button Component
const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  text,
  onClick,
  className = "",
  isActive = false,
}) => (
  <button
    className={`flex items-center gap-3 p-3 rounded-lg ${
      isActive
        ? "bg-gray-100 dark:bg-gray-700"
        : "hover:bg-gray-100 dark:hover:bg-gray-700"
    } ${className}`}
    onClick={onClick}
  >
    {icon}
    <span>{text}</span>
  </button>
);

// Dashboard Card Component
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendUp,
}) => (
  <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
    <div className="p-4 pb-2">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">{title}</h3>
        <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
          {icon}
        </div>
      </div>
    </div>
    <div className="px-4 pb-4">
      <p className="text-3xl font-bold">{value}</p>
      {trend && (
        <p
          className={`text-sm mt-1 ${
            trendUp ? "text-green-500" : "text-red-500"
          } flex items-center gap-1`}
        >
          {trendUp ? "↑" : "↓"} {trend}
        </p>
      )}
    </div>
  </div>
);
