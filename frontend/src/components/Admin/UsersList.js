import React from "react";
import { User, Mail, UserCircle } from "lucide-react";

const UsersList = ({ users = [] }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl shadow-lg bg-white mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center space-x-2">
                  <UserCircle className="h-4 w-4" />
                  <span>Kullanıcı</span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>E-posta</span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Kullanıcı Tipi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <User className="h-8 w-8 mb-2 text-gray-400" />
                    <span>Henüz kullanıcı bulunmamaktadır.</span>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-full">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name} {user.surname}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.userType === "admin"
                          ? "bg-purple-100 text-purple-800 border border-purple-200"
                          : "bg-green-100 text-green-800 border border-green-200"
                      }`}
                    >
                      {user.userType}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
