"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/app/actions/auth";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function UserStatsCharts() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getAllUsers();
        if (res.success && Array.isArray(res.users)) {
          setUsers(res.users);
        } else {
          setError(res.message || "Erreur lors du chargement des utilisateurs");
        }
      } catch (err) {
        setError("Erreur lors du chargement des utilisateurs");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Chargement des statistiques utilisateurs...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!users.length) return <div>Aucun utilisateur trouvé.</div>;

  // Pie chart: users by role
  const roles = ["user", "admin"];
  const usersByRole = roles.map(role => users.filter(u => u.role === role).length);

  // Bar chart: users by registration date (grouped by month)
  const months: string[] = [];
  const usersByMonth: Record<string, number> = {};
  users.forEach(u => {
    const date = new Date(u.created_at);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    if (!months.includes(month)) months.push(month);
    usersByMonth[month] = (usersByMonth[month] || 0) + 1;
  });
  months.sort();
  const usersPerMonth = months.map(m => usersByMonth[m]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Statistiques des Utilisateurs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie chart: Users by role */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Répartition par rôle</h3>
          <div className="h-64">
            <Pie
              data={{
                labels: roles.map(r => r.charAt(0).toUpperCase() + r.slice(1)),
                datasets: [
                  {
                    data: usersByRole,
                    backgroundColor: [
                      "rgba(54, 162, 235, 0.5)",
                      "rgba(255, 99, 132, 0.5)",
                    ],
                    borderColor: [
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 99, 132, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>
        {/* Bar chart: Users by registration month */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Inscriptions par mois</h3>
          <div className="h-64">
            <Bar
              data={{
                labels: months,
                datasets: [
                  {
                    label: "Utilisateurs inscrits",
                    data: usersPerMonth,
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 