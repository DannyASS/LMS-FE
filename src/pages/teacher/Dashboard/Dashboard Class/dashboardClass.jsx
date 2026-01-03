import { BookOpen, Users, FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { motion } from "framer-motion";
import ContainerMution from '@/compenent/partial/ContainerCustom';

const stats = [
  { icon: BookOpen, label: 'Total Courses', value: '12', change: '+2 this semester', color: 'bg-blue-500' },
  { icon: Users, label: 'Total Students', value: '384', change: '+24 this month', color: 'bg-green-500' },
  { icon: FileText, label: 'Active Assignments', value: '28', change: '8 due this week', color: 'bg-orange-500' },
  { icon: TrendingUp, label: 'Avg. Completion', value: '87%', change: '+5% from last month', color: 'bg-purple-500' },
];

const courses = [
  { id: 1, name: 'Computer Science 101', students: 45, progress: 78, status: 'active', lastUpdated: '2 hours ago' },
  { id: 2, name: 'Data Structures & Algorithms', students: 38, progress: 65, status: 'active', lastUpdated: '5 hours ago' },
  { id: 3, name: 'Web Development Fundamentals', students: 52, progress: 92, status: 'active', lastUpdated: '1 day ago' },
  { id: 4, name: 'Database Management Systems', students: 41, progress: 45, status: 'active', lastUpdated: '3 days ago' },
  { id: 5, name: 'Mobile App Development', students: 35, progress: 30, status: 'active', lastUpdated: '1 week ago' },
];

const recentActivities = [
  { id: 1, type: 'submission', message: 'John Smith submitted "Final Project Report"', time: '10 minutes ago', icon: CheckCircle },
  { id: 2, type: 'deadline', message: 'Assignment "Chapter 5 Quiz" due tomorrow', time: '2 hours ago', icon: Clock },
  { id: 3, type: 'submission', message: 'Emma Wilson submitted "Lab Assignment 3"', time: '3 hours ago', icon: CheckCircle },
  { id: 4, type: 'deadline', message: 'Course material update needed for CS 101', time: '1 day ago', icon: Clock },
];

export function DashboardClass() {
  return (
      <ContainerMution 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6">
        <div className='my-15'>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Class</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Current Courses</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Course Name</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Students</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Progress</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-gray-800">{course.name}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{course.students}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{course.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {course.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">{course.lastUpdated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 leading-relaxed">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
                View All Activities
              </button>
            </div>
          </div>
        </div>
      </ContainerMution>
  );
}
