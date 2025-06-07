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
        <div className="min-h-screen px-4 py-12 my-10 bg-[#028989] text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 text-[#001a1a] overflow-x-auto">
                {cards.map((card, index) => (
                    <CardContainer
                        key={index}
                        className="inter-var"
                        style={{
                            width: '251.06px',
                            height: '444.6px',
                            perspective: '1000px',
                        }}
                        containerClassName="!py-0 !flex items-start justify-center"
                    >
                        <CardBody
                            className="p-4 dark:bg-black dark:border-white/[0.2] rounded-xl flex flex-col justify-between"
                            style={{ width: '221.06px', height: '444.6px' }}
                        >
                            <CardSpotlight className="bg-[#98e6e6] group hover:bg-[#028989] transition-colors duration-300 flex flex-col h-full rounded-xl p-4">
                                {/* Title and icon */}
                                <CardItem
                                    translateZ={50}
                                    className="flex items-center text-lg font-semibold text-[#001a1a] group-hover:text-white mb-3 transition-colors duration-300"
                                >
                                    <span className="mr-2">{card.icon}</span>
                                    <span>{card.serviceName}</span>
                                </CardItem>

                                {/* Image */}
                                {card.image && (
                                    <CardItem
                                        translateZ={80}
                                        className="rounded-lg overflow-hidden mb-4 flex-shrink-0 w-full"
                                    >
                                        <img
                                            src={card.image}
                                            alt={card.serviceName}
                                            className="w-full h-[180px] object-cover rounded-lg"
                                        />
                                    </CardItem>
                                )}

                                {/* Description */}
                                <CardItem
                                    as="p"
                                    translateZ={60}
                                    className="text-[#001a1a] group-hover:text-white text-xs mb-4 flex-grow overflow-auto"
                                    style={{ lineHeight: 1.2 }}
                                >
                                    {card.description}
                                </CardItem>

                                {/* Action buttons */}
                                {card.scanner && (
                                    <div className="flex justify-end flex-wrap gap-2 mt-auto">
                                        <CardItem
                                            translateZ={30}
                                            as="a"
                                            href={card.scanner}
                                            target="_blank"
                                            className="px-3 py-1.5 rounded-xl bg-[#008080] text-white text-xs font-semibold hover:brightness-110 transition"
                                        >
                                            Get QR →
                                        </CardItem>
                                        <CardItem
                                            translateZ={30}
                                            as="a"
                                            href={card.scanner}
                                            target="_blank"
                                            className="px-3 py-1.5 rounded-xl bg-[#008080] text-white text-xs font-semibold hover:brightness-110 transition"
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
