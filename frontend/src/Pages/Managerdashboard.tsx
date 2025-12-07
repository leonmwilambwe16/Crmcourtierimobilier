import "../styles/admin.styles/AdminDashboard.scss";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Managerdashboard = () => {
  const stats = {
    totalUsers: 120,
    totalCourtiers: 25,
    totalClients: 95,
    monthlyRegistrations: [
      { month: "Jan", count: 10 },
      { month: "Feb", count: 15 },
      { month: "Mar", count: 22 },
      { month: "Apr", count: 18 },
      { month: "May", count: 30 },
      { month: "Jun", count: 25 },
    ],
  };

  return (
    <div className="manager-dashboard">
      <h1>Manager Dashboard</h1>

      {/* CARDS */}
      <div className="manager-cards">
        <div className="manager-card users">
          <h3>Total Utilisateurs</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="manager-card courtiers">
          <h3>Total Courtiers</h3>
          <p>{stats.totalCourtiers}</p>
        </div>

        <div className="manager-card clients">
          <h3>Total Clients</h3>
          <p>{stats.totalClients}</p>
        </div>
      </div>

      {/* CHART */}
      <div className="manager-chart-box">
        <h2>Inscriptions Mensuelles</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.monthlyRegistrations}>
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
