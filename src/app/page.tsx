"use client";
import * as React from "react";
import Hero from "@/components/Hero";
import CustomCard from "@/components/CustomCard";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	useEffect(() => {
		// Inizializza Lenis
		const lenis = new Lenis();

		// Aggiungi listener per l'evento di scroll
		lenis.on("scroll", (e) => {
			console.log(e);
		});

		// Aggiorna ScrollTrigger ad ogni evento di scroll
		lenis.on("scroll", ScrollTrigger.update);

		// Aggiungi una funzione al ticker di GSAP per aggiornare Lenis
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		// Disabilita la levigatura dei ritardi del ticker
		gsap.ticker.lagSmoothing(0);

		// Funzione di pulizia per smontare il componente
		return () => {
			gsap.ticker.remove((time) => {
				lenis.raf(time * 1000);
			});
			lenis.destroy(); // Assicurati di distruggere l'istanza di Lenis
		};
	}, []);

	return (
		<>
			<div className="hero-container">
				<Hero />
			</div>
		</>
	);
}
