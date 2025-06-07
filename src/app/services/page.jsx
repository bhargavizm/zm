'use client';

import React, { useEffect, useState } from 'react';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { CardSpotlight } from "@/components/ui/card-spotlight";
const Page = () => {
    const [cards, setCards] = useState([]);
    useEffect(() => {
        import('../data/services.jsx').then((module) => {
            const data = module.default;
            if (Array.isArray(data)) {
                setCards(data);
            } else {
                console.error("services.jsx did not return an array.");
            }
        }).catch(err => {
            console.error("Error loading services.jsx:", err);
        });
    }, []);

    return (
        <div className="min-h-screen px-4 py-12 bg-[#028989] text-white">
            {/* cards going from here... */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[6px] gap-x-2 sm:gap-x-3 lg:gap-x-1 text-[#001a1a] px-1 sm:px-0 overflow-x-auto">
                {cards.map((card, index) => (
                    <CardContainer key={index} className="inter-var min-w-[263px] h-[436px]">
                        <CardBody className="p-3 dark:bg-black dark:border-white/[0.2] rounded-xl h-full flex flex-col justify-between">
                            <CardSpotlight className="bg-[#98e6e6] group hover:bg-[#028989] transition-colors duration-300">
                                <CardItem
                                    translateZ="50"
                                    className="flex items-center text-xl font-bold text-[#001a1a] group-hover:text-white mb-2 transition-colors duration-300"
                                >
                                    <span className="mr-2">
                                        {card.icon}
                                    </span>
                                    <span>{card.serviceName}</span>
                                </CardItem>

                            <div className="flex justify-end">
                                {card.image && (
                                    <CardItem translateZ="80" className="rounded-lg overflow-hidden mb-4 ">
                                        <img
                                            src={card.image}
                                            alt={card.serviceName}
                                            className="w-full h-60 object-cover rounded-lg"
                                        />
                                    </CardItem>
                                )}
                                </div>
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-[#001a1a] group-hover:text-white text-sm mb-4 transition-colors duration-300"
                                >
                                    {card.description}
                                </CardItem>

                                {card.scanner && (
                                    <div className="flex justify-end">
                                        <CardItem
                                            translateZ="30"
                                            as="a"
                                            href={card.scanner}
                                            target="_blank"
                                            className="px-4 py-2 rounded-xl bg-[#008080] text-white text-xs font-bold hover:brightness-110 transition"
                                        >
                                            Get QR →
                                        </CardItem>
                                        <CardItem
                                            translateZ="30"
                                            as="a"
                                            href={card.scanner}
                                            target="_blank"
                                            className="mx-2 px-4 py-2 rounded-xl bg-[#008080] text-white text-xs font-bold hover:brightness-110 transition"
                                        >
                                            User Guide →
                                        </CardItem>
                                    </div>
                                )}
                            </CardSpotlight>
                        </CardBody>
                    </CardContainer>
                ))}
            </div>

        </div>
    );
};

export default Page;
