"use client";
import Link from "next/link";
import React from "react";
import "./navbar.css";
import { usePathname } from "next/navigation";

export const NavBar: React.FC = () => {
	const pathname = usePathname();

	return (
		<header className="navbar">
			<div className="navbar-start px-5"></div>{" "}
			<div className="navbar-center">
				<Link
					href="/"
					className="Logo">
					ARDEV
				</Link>
			</div>
			<div className="navbar-end">
				<div className="px-3">
					<Link
						href="/"
						className={`Link ${pathname === "/" ? "active" : ""}`}>
						Home
					</Link>
				</div>
				<div className="px-3">
					<Link
						href="/projects"
						className={`Link ${pathname === "/projects" ? "active" : ""}`}>
						Projects
					</Link>
				</div>
				<div className="px-3">
					<Link
						href="/contact"
						className={`Link ${pathname === "/contact" ? "active" : ""}`}>
						Contact
					</Link>
				</div>
			</div>
		</header>
	);
};
