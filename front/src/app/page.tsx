"use client";
import { Button } from "@/components/ui/button";
import { userApi } from "@/axios";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userApi.getUsers();
      setUsers(data.users);
    };

    fetchUsers();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-3">
      <h1>User List</h1>

      {users.map((u) => (
        <div key={u._id} className="bg-white">
          {u.userName}
        </div>
      ))}
    </div>
  );
}

export default App;
