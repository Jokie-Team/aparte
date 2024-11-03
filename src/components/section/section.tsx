import React from 'react';
import Image from 'next/image';
import { Body, Heading3 } from '../headings/headings';

interface ExhibitionItem {
    title: string;
    description: string;
    artists: string;
    dates: string;
    imageUrl: string;
}

const Section: React.FC<{ exhibitionItem: ExhibitionItem }> = ({ exhibitionItem }) => {
    return (
        <div className="flex flex-col space-y-8">
            <div className="inline-flex h-auto w-fit px-4 py-2.5 rounded-3xl border border-[#2b2b2b]">
                <div className="text-[#2b2b2b] text-base font-extrabold font-['Neue Haas Unica']">
                    ✴ Coleção / Série X
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col space-y-4 w-1/2">
                    <Heading3 className="text-gray-900">{exhibitionItem.title}</Heading3>
                    <Body className="text-gray-600">{exhibitionItem.description}</Body>
                    <div className="border-t border-gray-300 my-6" />
                    <Body className="text-gray-800 font-medium">{exhibitionItem.artists}</Body>
                    <Body className="text-gray-500">{exhibitionItem.dates}</Body>
                    <div className="border-t border-gray-300 my-6" />
                    <div className="flex space-x-8">
                        <a href="#" className="flex items-center text-gray-800 hover:text-black">
                            Sobre os Artistas <span className="ml-2">→</span>
                        </a>
                        <a href="#" className="flex items-center text-gray-800 hover:text-black">
                            Obras da Exposição <span className="ml-2">→</span>
                        </a>
                    </div>
                </div>
                <div className="sm:w-1/3 w-full">
                    <Image
                        src={exhibitionItem.imageUrl}
                        alt={exhibitionItem.title}
                        width={400}
                        height={400}
                        className="rounded object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Section;
