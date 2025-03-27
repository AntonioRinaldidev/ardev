// components/CVDocument.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CvData } from '@/types/cvData';

// Stili coerenti con il progetto
const styles = StyleSheet.create({
	page: {
		backgroundColor: '#ffffff',
		color: '#111111',
		padding: 30,
		fontSize: 12,
		fontFamily: 'Helvetica',
	},
	section: {
		marginBottom: 12,
	},
	header: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#4f46e5', // colore primario
		marginBottom: 4,
	},
	subheader: {
		fontSize: 16,
		marginBottom: 4,
		color: '#555',
	},
	text: {
		marginBottom: 2,
	},
	bullet: {
		marginLeft: 12,
	},
	subheader_tiltle: {
		fontSize: 18,
		marginBottom: 4,
		marginTop: 4,
		color: '#555',
	},
});

export default function CVDocument({ data }: { data: CvData }) {
	return (
		<Document>
			<Page
				size="A4"
				style={styles.page}>
				<View style={styles.section}>
					<Text style={styles.header}>{data.personal.fullName}</Text>
					<Text style={styles.subheader_tiltle}>{data.personal.title}</Text>
					<Text style={styles.text}>
						📧 {data.personal.email} | 📍 {data.personal.location} | 🔗{' '}
						{data.personal.github} | 💼 {data.personal.linkedin}
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.subheader}>Summary</Text>
					<Text>{data.summary}</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.subheader}>Experience</Text>
					{data.experience.map((exp, i) => (
						<View key={i}>
							<Text style={styles.text}>
								{exp.role} @ {exp.company} ({exp.from} - {exp.to}) –{' '}
								{exp.location}
							</Text>
							<Text style={styles.bullet}>{exp.description}</Text>
						</View>
					))}
				</View>

				<View style={styles.section}>
					<Text style={styles.subheader}>Education</Text>
					{data.education.map((edu, i) => (
						<Text
							key={i}
							style={styles.text}>
							{edu.degree} @ {edu.school} ({edu.from} - {edu.to}) –{' '}
							{edu.location}
						</Text>
					))}
				</View>

				<View style={styles.section}>
					<Text style={styles.subheader}>Skills</Text>
					<Text>{data.skills.join(', ')}</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.subheader}>Languages</Text>
					{data.languages.map((lang, i) => (
						<Text
							key={i}
							style={styles.text}>
							{lang.language} - {lang.level}
						</Text>
					))}
				</View>
			</Page>
		</Document>
	);
}
