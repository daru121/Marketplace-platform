import React from "react";
import { ChartBarIcon, CurrencyDollarIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/24/outline";

function Overview() {
  const stats = [
    {
      name: "Total Sales",
      value: "Rp 2.4M",
      change: "+12%",
      icon: CurrencyDollarIcon,
      trend: "up",
    },
    {
      name: "Active Users",
      value: "1,234",
      change: "+8%",
      icon: UserGroupIcon,
      trend: "up",
    },
    {
      name: "Total Orders",
      value: "456",
      change: "+23%",
      icon: ShoppingBagIcon,
      trend: "up",
    },
    {
      name: "Conversion Rate",
      value: "3.2%",
      change: "-2%",
      icon: ChartBarIcon,
      trend: "down",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary-600" />
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Add your recent activity items here */}
          <p className="text-gray-500">No recent activity</p>
        </div>
      </div>
    </div>
  );
}

export default Overview; 