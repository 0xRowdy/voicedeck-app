"use client";
import { ArrowUpRight, Menu, Newspaper, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { externalLinks } from "@/config/site";
import { cn } from "@/lib/utils";
import { WalletProfile } from "./wallet-profile";

const Footer = () => {
	return (
		<footer className="fixed inset-x-0 bottom-0 bg-vd-beige-100 text-center items-center py-2 md:static border-t-[1.5px] border-vd-beige-400">
			<MobileFooter />
			<DesktopFooter />
		</footer>
	);
};

const MobileFooter = () => {
	return (
		<nav
			aria-label="Mobile Footer Navigation"
			className="pb-4 pt-2 px-8 w-full"
		>
			<ul className="flex justify-between items-center gap-1 md:hidden">
				<li>
					<Link
						href="/"
						className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
						passHref
					>
						<div className="flex flex-col jusify-center items-center">
							<Newspaper aria-hidden="true" focusable="false" />
							<span className="text-xs">Reports</span>
						</div>
					</Link>
				</li>
				<li>
					<WalletProfile alignment="center" />
				</li>
				<li>
					<Drawer>
						<DrawerTrigger>
							<div className="flex flex-col justify-center items-center">
								<Menu aria-hidden="true" focusable="false" />
								<span className="text-xs">More</span>
							</div>
						</DrawerTrigger>

						<DrawerContent>
							<DrawerHeader>
								<div className="flex justify-center">
									<Image
										className="h-10 w-10"
										height={20}
										width={20}
										src={"/logo.svg"}
										alt="VoiceDeck Logo"
									/>
								</div>
							</DrawerHeader>
							{externalLinks.map((link) => (
								<a
									href={link.url}
									key={link.title}
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										buttonVariants({ variant: "link" }),
										"justify-between py-6",
									)}
								>
									{link.title}
									<ArrowUpRight
										size={16}
										aria-hidden="true"
										focusable="false"
									/>
								</a>
							))}

							<DrawerFooter>
								<DrawerClose>
									<div className="flex flex-col justify-center items-center w-full">
										<X aria-hidden="true" focusable="false" />
										<span className="text-xs">Close</span>
									</div>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</li>
			</ul>
		</nav>
	);
};

const DesktopFooter = () => {
	return (
		<div className="hidden md:flex md:container h-32 items-center justify-between">
			<div className="flex flex-col">
				<Link href={"/reports"} passHref className="flex items-center gap-2">
					<Image
						className="h-8 w-8"
						height={8}
						width={8}
						src={"/logo.svg"}
						alt="VoiceDeck Logo"
					/>
					<h3 className="text-2xl font-bold tracking-tight">VoiceDeck</h3>
				</Link>
				<p className="text-base font-medium pt-2">
					An open source funding platform for collective impact
				</p>
			</div>
			<ul className="flex space-x-2">
				{externalLinks.map(({ url, title }) => (
					<li key={title}>
						<a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								buttonVariants({ variant: "link" }),
								"text-lg flex justify-between items-center group",
							)}
							aria-label={`Open ${title} in a new tab`}
						>
							{title}
							<span className="sr-only">(opens in a new tab)</span>
							<ArrowUpRight
								size={18}
								className="ml-1 opacity-70 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-transform duration-300 ease-in-out"
								aria-hidden="true"
							/>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export { Footer };
