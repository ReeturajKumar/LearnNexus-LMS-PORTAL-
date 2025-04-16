"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLast12MonthsData = generateLast12MonthsData;
function generateLast12MonthsData(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const last12Months = [];
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
        const counts = yield Promise.all(last12Months.map(({ startDate, endDate }) => model.countDocuments({ createdAt: { $gte: startDate, $lt: endDate } })));
        last12Months.forEach((entry, index) => (entry.count = counts[index]));
        return last12Months;
    });
}
