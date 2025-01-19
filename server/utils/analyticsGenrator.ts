import { Document, Model } from "mongoose";

interface MonthData {
  month: string;
  count: number;
  startDate: Date;
  endDate: Date;
}

export async function generateLast12MonthsData<T extends Document>(
  model: Model<T>
): Promise<MonthData[]> {
  const last12Months: MonthData[] = [];
  const currentDate = new Date();

  for (let i = 11; i >= 0; i--) {
    const startDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() - i, 1));
    const endDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0));
    endDate.setUTCHours(23, 59, 59, 999); // Ensure it captures the entire month

    last12Months.push({
      month: startDate.toLocaleDateString("default", { month: "short", year: "numeric" }),
      count: 0,
      startDate,
      endDate
    });
  }

  // Fetch counts in parallel
  const counts = await Promise.all(
    last12Months.map(({ startDate, endDate }) =>
      model.countDocuments({ createdAt: { $gte: startDate, $lt: endDate } })
    )
  );

  last12Months.forEach((entry, index) => (entry.count = counts[index]));

  return last12Months;
}
