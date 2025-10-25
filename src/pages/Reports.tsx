import { ChartPieExpenses } from "@/components/ChartCategory";
import { ChartBarDefault } from "../components/Chart6months";

export default function Reports() {
  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 ">
          <h2 className="text-4xl font-bold text-gray-900 text-white">
            Financial Reports
          </h2>
          <p className="mt-2 text-gray-400 text-lg">
            Analyze your financial performance over time with interactive charts
            and visualizations.
          </p>
        </div>
        {/* Aquí pones tu chart */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <ChartBarDefault />
          <ChartPieExpenses />
        </div>
      </div>
    </main>
  );
}
