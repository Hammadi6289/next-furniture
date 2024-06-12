import Link from "next/link";

const DashboardCard = ({ value, label, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="text-gray-800 text-3xl font-bold mb-2">{value}</div>
      <div className="text-gray-600 text-lg mb-4">{label}</div>
      <Link href={link} className="text-blue-500 hover:underline">
        View {label.toLowerCase()}
      </Link>
    </div>
  );
};

export default DashboardCard;
