import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { getError } from "@/utils/error";
import DashboardCard from "./DashboardCard;";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const AdminDashboardScreen = () => {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(162, 222, 208, 1)",
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <Layout title="Admin Panel">
      <div className="grid  md:grid-cols-2 md:gap-5">
        {/*
        <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
          <ul className="space-y-6">
            <li>
              <Link href="/admin/dashboard" className="font-bold text-blue-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products">Catalogs </Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        */}
        <div className="md:col-span-3">
          <h1 className="mb-6 mt-4 text-3xl font-bold text-gray-800 pb-2 border-b-2 border-gray-300 shadow-sm">
            Admin Dashboard
          </h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                  value={summary.ordersPrice}
                  label="Sales"
                  link="/admin/orders"
                />
                <DashboardCard
                  value={summary.ordersCount}
                  label="Orders"
                  link="/admin/orders"
                />
                <DashboardCard
                  value={summary.productsCount}
                  label="Catalogs"
                  link="/admin/products"
                />
                <DashboardCard
                  value={summary.usersCount}
                  label="Users"
                  link="/admin/users"
                />
              </div>
              <div className="sales-report mt-8">
                <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
                <div className="chart-container">
                  <Bar
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: true, position: "bottom" },
                      },
                      scales: {
                        x: {
                          grid: { display: false },
                          title: { display: true, text: "Months" },
                        },
                        y: {
                          grid: { color: "rgba(0, 0, 0, 0.1)" },
                          title: { display: true, text: "Sales Amount ($)" },
                        },
                      },
                    }}
                    data={data}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
