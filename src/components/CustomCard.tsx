'use client';
import React from 'react';
import './customcard.css';
import Image from 'next/image';

interface CardProps {
	title: string;
	image: string;
	imagealt: string;
	p: string;
	link: string;
}

const CustomCard: React.FC<CardProps> = ({
	title,
	image,
	imagealt,
	p,
	link,
}) => {
	const handlePress = () => {
		console.log(`Button Pressed on : ${title}`);
	};

	return (
		<div className='card lg:card-side bg-base-100'>
			<figure className='flex-shrink-0 w-full md:w-1/3'>
				<Image
					src={image}
					alt={imagealt}
					className='object-cover w-full h-full  image'
				/>
			</figure>
			<div className='card-body'>
				<h2 className='card-title '>{title}</h2>
				<p className='flex-1 mt-2'>{p}</p>
				<div className='card-actions justify-end'>
					<a href={link} className='btn btn-primary'>
						Watch
					</a>
				</div>
			</div>
		</div>
	);
};

export default CustomCard;
