import { useSearchParams } from "@remix-run/react";
import { Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
} from "~/components/ui/drawer";
import MultipleSelector, { Option } from "~/components/ui/multiple-selector";
import { Separator } from "~/components/ui/separator";
import { Slider } from "~/components/ui/slider";

interface ReportFiltersProps {
	outlets: string[];
	states: Option[];
	amounts: number[];
}
interface FilterItemsProps {
	minAmountNeeded: number;
	maxAmountNeeded: number;
	amountRangeSelected: number[];
	setAmountRangeSelected: React.Dispatch<React.SetStateAction<number[]>>;
	outletChoices: string[];
	setOutletChoices: React.Dispatch<React.SetStateAction<string[]>>;
}

type Props = ReportFiltersProps & FilterItemsProps;

const FilterItems: React.FC<Props> = ({
	outlets,
	states,
	amounts,
	minAmountNeeded,
	maxAmountNeeded,
	amountRangeSelected,
	setAmountRangeSelected,
	outletChoices,
	setOutletChoices,
}) => {
	const handleCheckboxClick = (outlet: string) => {
		if (outletChoices.includes(outlet)) {
			setOutletChoices(outletChoices.filter((o) => o !== outlet));
			return;
		}
		setOutletChoices([...outletChoices, outlet]);
	};

	return (
		<div className="p-6">
			<h2 className="px-6 font-medium">Amount needed to complete funding</h2>
			<div className="px-6 pt-4 pb-8">
				<Slider
					defaultValue={[amountRangeSelected[0], amountRangeSelected[1]]}
					min={minAmountNeeded}
					max={maxAmountNeeded}
					step={4}
					minStepsBetweenThumbs={18}
					onValueChange={(e) => setAmountRangeSelected([e[0], e[1]])}
				/>
			</div>
			<Separator className="bg-vd-blue-500 my-10" />
			<div className="px-6">
				<h2 className="font-medium pb-2 md:pb-4">State impacted</h2>
				<MultipleSelector
					defaultOptions={states}
					placeholder="Choose states"
					hidePlaceholderWhenSelected
					emptyIndicator={
						<p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
							no results found.
						</p>
					}
				/>
			</div>
			<Separator className="bg-vd-blue-500 my-10" />
			<div className="px-6">
				<h2 className="font-medium pb-2 md:pb-4">Story from media outlet</h2>
				{outlets.map((outlet: string) => (
					<div key={outlet} className="flex items-center gap-2 pb-2">
						<Checkbox
							className="h-6 w-6 rounded-md border-vd-blue-500 data-[state=checked]:bg-vd-blue-500 data-[state=checked]:text-vd-beige-100"
							onClick={() => handleCheckboxClick(outlet)}
						/>
						<p className="text-sm">{outlet}</p>
					</div>
				))}
			</div>
		</div>
	);
};

const ReportsFilters: React.FC<ReportFiltersProps> = ({
	outlets,
	states,
	amounts,
}) => {
	const minAmountNeeded = Math.min(...amounts);
	const maxAmountNeeded = Math.max(...amounts);
	const [searchParams, setSearchParams] = useSearchParams();
	const [amountRangeSelected, setAmountRangeSelected] = useState([
		minAmountNeeded,
		maxAmountNeeded,
	]);
	const [outletChoices, setOutletChoices] = useState<string[]>([]);

	const handleApplyFilters = () => {
		if (outletChoices) {
			if (searchParams.has("outlet")) {
				searchParams.delete("outlet");
			}
			for (let i = 0; i < outletChoices.length; i++) {
				searchParams.append("outlet", outletChoices[i]);
			}
		}
		searchParams.delete("min");
		searchParams.delete("max");
		searchParams.append("min", String(amountRangeSelected[0]));
		searchParams.append("max", String(amountRangeSelected[1]));
		setSearchParams(searchParams, {
			preventScrollReset: true,
		});
	};

	return (
		<div>
			<div className="md:hidden">
				<Drawer>
					<DrawerTrigger
						className="flex gap-3 h-10 w-full rounded-md border-input justify-between items-center bg-vd-beige-100 border border-vd-blue-500 px-3 py-2"
						onClick={() => {
							setAmountRangeSelected([minAmountNeeded, maxAmountNeeded]);
							setOutletChoices([]);
						}}
					>
						<p className="text-sm font-medium text-vd-blue-500">Filter</p>
						<Filter color="#4B778F" size={18} />
					</DrawerTrigger>
					<DrawerContent className="">
						<FilterItems
							outlets={outlets}
							states={states}
							amounts={amounts}
							minAmountNeeded={minAmountNeeded}
							maxAmountNeeded={maxAmountNeeded}
							amountRangeSelected={amountRangeSelected}
							setAmountRangeSelected={setAmountRangeSelected}
							outletChoices={outletChoices}
							setOutletChoices={setOutletChoices}
						/>
						<DrawerFooter className="flex-row justify-center gap-2 pb-8">
							<DrawerClose>
								<Button
									className="text-xs w-36 h-7"
									size={"sm"}
									onClick={() => handleApplyFilters()}
								>
									Apply
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
			<div className="hidden md:flex">
				<Dialog>
					<DialogTrigger
						className="flex gap-3 h-10 w-full rounded-md border-input justify-between items-center bg-vd-beige-100 border border-vd-blue-500 px-3 py-2"
						onClick={() => {
							setAmountRangeSelected([minAmountNeeded, maxAmountNeeded]);
							setOutletChoices([]);
						}}
					>
						<p className="text-sm font-medium text-vd-blue-500">Filter</p>
						<Filter color="#4B778F" size={18} />
					</DialogTrigger>
					<DialogContent className="bg-vd-beige-200">
						<FilterItems
							outlets={outlets}
							states={states}
							amounts={amounts}
							minAmountNeeded={minAmountNeeded}
							maxAmountNeeded={maxAmountNeeded}
							amountRangeSelected={amountRangeSelected}
							setAmountRangeSelected={setAmountRangeSelected}
							outletChoices={outletChoices}
							setOutletChoices={setOutletChoices}
						/>
						<DialogFooter className="justify-end gap-2 pb-4">
							<DialogClose asChild>
								<Button
									className="text-xs w-36 h-7"
									size={"sm"}
									onClick={() => handleApplyFilters()}
								>
									Apply
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};

export default ReportsFilters;
