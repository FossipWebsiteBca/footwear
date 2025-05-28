import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RecentInvoices from "../components/RecentInvoices";
import TotalRevenueCard from "../components/TotalRevenueCard";
import TopProductsCard from "../components/TopProductsCard";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { db } from "../scripts/firebase.Config";
import card1 from "../assets/Card1.png"; // Check capitalization matches file
import card2 from "../assets/Card2.png";
import card3 from "../assets/Card3.png";
import card4 from "../assets/Card4.png";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { subDays } from "date-fns";
import * as XLSX from "xlsx";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [tempFromDate, setTempFromDate] = useState("");
  const [tempToDate, setTempToDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [range, setRange] = useState("30");
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const invoiceSnap = await getDocs(collection(db, "Invoice"));
        const productSnap = await getDocs(collection(db, "Product"));

        const invoicesData = invoiceSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const productsData = productSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set invoice data and counts
        setInvoices(invoicesData);
        setInvoiceCount(invoicesData.length);
        setTotalProducts(productsData.length);

        // Top-selling products calculation
        const salesCountMap = {};
        invoicesData.forEach((inv) => {
          const code = inv.code;
          if (code) {
            salesCountMap[code] = (salesCountMap[code] || 0) + 1;
          }
        });

        const top5Codes = Object.entries(salesCountMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([code, sales]) => ({ code, sales }));

        const mergedTopProducts = top5Codes
          .map(({ code, sales }) => {
            const product = productsData.find((p) => p.code === Number(code));
            if (!product) {
              console.warn("Product not found for code:", code);
              return null;
            }
            return {
              code,
              name: product.name,
              sales,
            };
          })
          .filter((p) => p !== null);

        setTopProducts(mergedTopProducts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);
  // Fetch invoices and calculate total revenue
  useEffect(() => {
    const calculateRevenueFromInvoices = async () => {
      try {
        const today = new Date();
        const startDate = subDays(today, range === "7" ? 7 : 30);
        const startTimestamp = Timestamp.fromDate(startDate);

        const q = query(
          collection(db, "Invoice"),
          where("date", ">=", startTimestamp)
        );
        const querySnapshot = await getDocs(q);

        const invoices = querySnapshot.docs.map((doc) => doc.data());

        const rangeStart = subDays(today, parseInt(range));
        const totalRangeRevenue = invoices
          .filter((item) => item.date.toDate() >= rangeStart)
          .reduce((sum, item) => sum + item.amount, 0);

        let formatted = [];

        if (range === "7") {
          const dailyTotals = {};

          invoices.forEach((item) => {
            const date = item.date.toDate();
            if (date >= rangeStart) {
              const dateString = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              });
              dailyTotals[dateString] =
                (dailyTotals[dateString] || 0) + item.amount;
            }
          });

          formatted = Object.entries(dailyTotals).map(([date, revenue]) => ({
            name: date,
            revenue,
          }));
        } else {
          const monthlyTotals = Array(12).fill(0);
          invoices.forEach((item) => {
            const date = item.date.toDate();
            const month = date.getMonth();
            monthlyTotals[month] += item.amount;
          });

          const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          formatted = monthNames.map((name, i) => ({
            name,
            revenue: monthlyTotals[i],
          }));
        }

        setRevenueData(formatted);
        setTotalRevenue(totalRangeRevenue);
      } catch (err) {
        console.error("Error calculating invoice revenue:", err);
      }
    };

    calculateRevenueFromInvoices();
  }, [range]);

  // Apply date and search filters to invoices
  const applyDateFilter = () => {
    let filtered = invoices;

    if (searchTerm) {
      filtered = filtered.filter((invoice) =>
        invoice.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (tempFromDate && tempToDate) {
      const from = new Date(tempFromDate);
      const to = new Date(tempToDate);
      filtered = filtered.filter((invoice) => {
        const invDate = invoice.date.toDate();
        return invDate >= from && invDate <= new Date(to.getTime() + 86400000);
      });

      setFromDate(tempFromDate);
      setToDate(tempToDate);
    }

    setFilteredInvoices(filtered);
    setShowDateFilter(false);
  };

  useEffect(() => {
    let filtered = invoices;

    if (searchTerm) {
      filtered = filtered.filter((invoice) =>
        invoice.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = filtered.filter((invoice) => {
        const invDate = invoice.date.toDate();
        return invDate >= from && invDate <= new Date(to.getTime() + 86400000);
      });
    }

    setFilteredInvoices(filtered);
  }, [searchTerm, fromDate, toDate, invoices]);

  const handleExport = () => {
    let dataToExport = filteredInvoices;

    if (!fromDate || !toDate) {
      const today = new Date();
      const past30 = new Date();
      past30.setDate(today.getDate() - 30);

      dataToExport = invoices.filter((invoice) => {
        const invDate = invoice.date.toDate();
        return invDate >= past30 && invDate <= today;
      });
    }

    const excelData = dataToExport.map((inv) => ({
      Code: inv.code,
      Customer: inv.customer,
      Email: inv.email,
      Amount: inv.amount,
      Date: inv.date.toDate().toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");

    XLSX.writeFile(workbook, "Recent_Invoices.xlsx");
  };

useEffect(() => {
  const fetchAttendanceData = async () => {
    try {
      const employeesSnap = await getDocs(collection(db, "Employees"));

      let totalEmployees = 0;
      let presentCount = 0;

      for (const employeeDoc of employeesSnap.docs) {
        const attendanceRef = collection(
          db,
          "Employees",
          employeeDoc.id,
          "attendance"
        );
        const attendanceSnap = await getDocs(attendanceRef);

        let employeePresentDays = 0;
        let employeeTotalDays = 0;

        attendanceSnap.forEach((doc) => {
          const data = doc.data();
          employeeTotalDays++;
          if (data.status?.toLowerCase() === "present") {
            employeePresentDays++;
          }
        });

        // Consider employee counted only if they have attendance data
        if (employeeTotalDays > 0) {
          totalEmployees++;
          if (employeePresentDays > 0) presentCount++;
        }
      }

      const attendancePercentage =
        totalEmployees === 0
          ? 0
          : Math.round((presentCount / totalEmployees) * 100);

      setTotalEmployees(totalEmployees);
      setAttendancePercentage(attendancePercentage);
    } catch (error) {
      console.error("Error fetching nested attendance data:", error);
    }
  };

  fetchAttendanceData();
}, []);


  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1 relative w-full max-w-full">
        {/* <Navbar /> */}
        <main className="flex-1 bg-gray-50 px-8 pt-[32px]">
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="w-[240px] h-[120px] rounded-[12px] border border-[#2F80ED] bg-gradient-to-br from-[#2F80ED]/60 to-[#2F80ED]/60 relative overflow-hidden">
              <div className="absolute top-3 left-3 w-10 h-10 rounded-[5px] bg-black/30 flex items-center justify-center">
                <img
                  src={card1}
                  alt="icon"
                  className="w-[30px] h-[15px] object-contain"
                />
              </div>
              <div className="absolute top-3 left-[60px] flex flex-col gap-2">
                <p className="text-white text-[14px] font-medium font-[Poppins]">
                  Total Stock
                </p>
                <p className="text-white text-[32px] font-semibold font-[Poppins] leading-tight">
                  {totalProducts}
                </p>
              </div>
            </div>

            <div className="w-[240px] h-[120px] rounded-[12px] bg-white shadow relative overflow-hidden">
              <div className="absolute top-3 left-3 w-10 h-10 rounded-[5px] bg-[#5EAC24]/30 border border-[#5EAC24] box-border flex items-center justify-center">
                <img
                  src={card2}
                  alt="icon"
                  className="w-[24px] h-[24px] object-contain"
                />
              </div>
              <div className="absolute top-3 left-[60px] flex flex-col gap-2">
                <p className="text-[#111827] text-[14px] font-medium font-[Poppins]">
                  Employees
                </p>
                <p className="text-[#111827] text-[32px] font-semibold font-[Poppins] leading-tight">
                  {totalEmployees}
                </p>
              </div>
            </div>

            <div className="w-[240px] h-[120px] rounded-[12px] bg-white shadow relative overflow-hidden">
              <div className="absolute top-3 left-3 w-10 h-10 rounded-[5px] bg-[#EF5350]/30 border border-[#EF5350] box-border flex items-center justify-center">
                <img
                  src={card3}
                  alt="icon"
                  className="w-[24px] h-[24px] object-contain"
                />
              </div>
              <div className="absolute top-3 left-[60px] flex flex-col gap-2">
                <p className="text-[#111827] text-[14px] font-medium font-[Poppins]">
                  Attendance
                </p>
                <p className="text-[#111827] text-[32px] font-semibold font-[Poppins] leading-tight">
                  {attendancePercentage}%
                </p>
              </div>
            </div>

            <div className="w-[240px] h-[120px] rounded-[12px] bg-white shadow relative overflow-hidden">
              <div className="absolute top-3 left-3 w-10 h-10 rounded-[5px] bg-[#283593]/30 border border-[#283593] box-border flex items-center justify-center">
                <img
                  src={card4}
                  alt="icon"
                  className="w-[24px] h-[24px] object-contain"
                />
              </div>
              <div className="absolute top-3 left-[60px] flex flex-col gap-2">
                <p className="text-[#111827] text-[14px] font-medium font-[Poppins]">
                  Invoice
                </p>
                <p className="text-[#111827] text-[32px] font-semibold font-[Poppins] leading-tight">
                  {invoiceCount}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 font-poppins grid grid-cols-[504px_1fr] pl-0 pr-0 gap-[25px]">
            <RecentInvoices
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              showDateFilter={showDateFilter}
              setShowDateFilter={setShowDateFilter}
              tempFromDate={tempFromDate}
              setTempFromDate={setTempFromDate}
              tempToDate={tempToDate}
              setTempToDate={setTempToDate}
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              invoices={invoices}
              filteredInvoices={filteredInvoices}
              setFilteredInvoices={setFilteredInvoices}
              applyDateFilter={applyDateFilter}
              handleExport={handleExport}
            />

            <div className="gap-[41px] rounded-[12px] flex flex-col w-[514px] h-fit mb-[24px] mt-0">
              <TotalRevenueCard
                range={range}
                setRange={setRange}
                totalRevenue={totalRevenue}
                revenueData={revenueData}
              />
              <TopProductsCard topProducts={topProducts} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
