import { useMemo } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { DynamicCategoryIcon } from "~/components/ui/dynamic-category-icon";
import { Input } from "~/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import type { Report } from "~/types";
import ReportsFilters from "./reports-filters";

interface ReportsHeaderProps {
	reports: Report[];
	amounts: number[];
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({ reports, amounts }) => {
	const uniqueCategories = useMemo(() => {
		return reports
			.map((report: Report, index: number) => report.category)
			.filter(
				(value: string, index: number, self: string[]) =>
					self.indexOf(value) === index,
			);
	}, [reports]);

	const uniqueMediaOutlets = useMemo(() => {
		return reports
			.map((report: Report, index: number) => report.contributors[0])
			.filter(
				(value: string, index: number, self: string[]) =>
					self.indexOf(value) === index,
			);
	}, [reports]);

	const uniqueStates = useMemo(() => {
		return reports
			.map((report: Report, index: number) => report.state)
			.filter(
				(value: string, index: number, self: string[]) =>
					self.indexOf(value) === index,
			);
	}, [reports]);

	return (
		<article className="w-full max-w-screen-xl">
			<h2 className="text-3xl md:text-4xl font-semibold pb-1 pt-6 md:pt-10">
				Reports
			</h2>
			<p className="text-sm">Select a category that resonates with you.</p>
			<div className="flex flex-col xl:flex-row xl:justify-between gap-3 w-full py-4">
				<div className="flex gap-2">
					{uniqueCategories.map((category: string) => (
						<Badge
							key={category}
							className="flex flex-col md:flex-row items-center gap-1 px-3 py-2 bg-vd-beige-100"
						>
							<DynamicCategoryIcon category={category} />
							<p className="text-xs">{category}</p>
						</Badge>
					))}
				</div>

				<div className="flex flex-1 gap-2">
					<Input
						className="h-10 border-vd-blue-500 bg-vd-beige-100 py-2 text-base font-medium placeholder:text-vd-blue-500 ring-offset-white focus-visible:ring-offset-2 focus-visible:ring-vd-blue-500 focus-visible:ring-2"
						type="search"
						placeholder="Search Reports"
					/>
					<Button>Search</Button>
				</div>
				<div className="flex gap-3">
					<div>
						<ReportsFilters
							outlets={uniqueMediaOutlets}
							states={uniqueStates}
							amounts={amounts}
						/>
					</div>
					<div className="w-full min-w-[250px]">
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="amount-needed">Amount Needed</SelectItem>
								<SelectItem value="newest-oldest">Newest to Oldest</SelectItem>
								<SelectItem value="oldest-newest">Oldest to Newest</SelectItem>
								<SelectItem value="most-contributors">
									Most Contributors
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		</article>
	);
};

export default ReportsHeader;
