/* eslint-disable react-hooks/exhaustive-deps */
import TaskList from "../components/system/TaskList";
import { useAuthStore } from "../stores/auth";
import { useEffect } from "react";

const Dashboard = () => {
  const { loading, fetchUser, userData } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <div className="font-semibold">
        {userData && (
          <h3>Welcome {userData.first_name + " " + userData.last_name}</h3>
        )}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-center py-3 ">Task List</h3>
      </div>
      <TaskList />
    </>
  );
};

export default Dashboard;
