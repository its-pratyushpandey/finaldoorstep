import React from "react";
import { UserCircle, ShieldCheck, UserCog } from "lucide-react";

const User = ({ username, role }) => {
  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return <ShieldCheck className="text-red-500" size={28} />;
      case "Moderator":
        return <UserCog className="text-blue-500" size={28} />;
      default:
        return <UserCircle className="text-green-500" size={28} />;
    }
  };

  return (
    <div className="flex items-center p-4 border rounded-lg shadow-md bg-white max-w-md mx-auto">
      <div className="mr-4">{getRoleIcon(role)}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Welcome, <span className="text-blue-600">{username}</span>
        </h3>
        <p className="text-sm text-gray-600">Logged in as <strong>{role}</strong></p>
      </div>
    </div>
  );
};

export default User;
