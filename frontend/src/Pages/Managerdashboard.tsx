
// AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import "../styles/admin.styles/AdminDashboard.scss";
import { useAuth } from "../Context/AuthContext";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Managerdashboard = () => {
  const { getMyProperties, getCourtierProperties, getMyDossier } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [dossiers, setDossiers] = useState<any[]>([]);
  const [monthlyStats, setMonthlyStats] = useState([
    { month: "Jan", count: 0 },
    { month: "Feb", count: 0 },
    { month: "Mar", count: 0 },
    { month: "Apr", count: 0 },
    { month: "May", count: 0 },
    { month: "Jun", count: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const propsData = await getCourtierProperties();
      const dossierData = await getMyDossier();
      setProperties(propsData.properties || []);
      setDossiers(dossierData.files || []);
      // Example: compute monthly stats from dossiers
      const stats = [...monthlyStats];
      dossierData.files?.forEach((f: any) => {
        const month = new Date(f.createdAt).toLocaleString("default", { month: "short" });
        const index = stats.findIndex(s => s.month === month);
        if (index >= 0) stats[index].count += 1;
      });
      setMonthlyStats(stats);
    };
    fetchData();
  }, []);

  return (
    <div className="manager-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="manager-cards">
        <div className="manager-card users">
          <h3>Total Properties</h3>
          <p>{properties.length}</p>
        </div>
        <div className="manager-card clients">
          <h3>Total Dossiers</h3>
          <p>{dossiers.length}</p>
        </div>
      </div>

      <div className="manager-chart-box">
        <h2>Monthly Dossier Registrations</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#4a90e2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default Managerdashboard;
