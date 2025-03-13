import Link from "next/link";
import React from "react";
import "./navbar.css";

function NavBar() {
	return (
		<div className="navbar bg-transparent nav md:sticky  top-0 ">
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
						<li>
							<a>Home</a>
						</li>
						<li>
							<a>Projects</a>
						</li>
						<li>
							<a>Contact</a>
						</li>
					</ul>
				</div>
				<a className="btn btn-ghost text-xl">ARDEV</a>
			</div>
			<div className="navbar-center "></div>

			<div className="navbar-end  lg:flex space-x-4">
				{" "}
				<Link
					className="nav-link"
					href={"#cards"}>
					Home
				</Link>
				<Link
					className="nav-link"
					href={"/"}>
					Projects
				</Link>
				<Link
					className="nav-link"
					href={"/"}>
					Contact
				</Link>
			</div>
		</div>
	);
}

export default NavBar;
