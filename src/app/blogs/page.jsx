import React from 'react'
import Image from 'next/image';

const Page = () => {
    return (
        <div className='flex flex-col items-center justify-start min-h-screen bg-gray-100 select-none'>
            {/* Top Bar */}
            <div className="top-bar flex flex-col sm:flex-row justify-between items-center w-full px-4 py-2 gap-2">
                <button className="bg-mainGreen border rounded-sm p-1 cursor-pointer">Trending Now</button>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="text-gray-400 border rounded-sm border-gray-400 p-1 focus:outline-none"
                    />
                    <button className="bg-mainGreen border rounded-sm p-1 ml-2 cursor-pointer">Search</button>
                </div>
            </div>

            {/* Main Content */}
            <div className='main-content flex flex-col lg:flex-row w-full mt-4 px-4 gap-6'>
                {/* Left Part */}
                <div className="left-part lg:w-1/2 w-full my-3 flex flex-col items-center justify-center">
                    <div className="transition-transform duration-300 transform hover:scale-105 w-full">
                        <Image
                            src="/logo with frame.png"
                            alt="Blogs"
                            width={500}
                            height={500}
                            className="w-full h-auto rounded-lg border-2 border-[#001a1a] shadow-lg"
                        />
                    </div>
                    <h1 className='text-2xl lg:text-3xl mx-3 my-4 text-[#001a1a] text-center'>
                        15 QR Code Fallacies Unraveled: Setting the Record Straight on Common Misunderstandings!
                    </h1>
                </div>

                {/* Right Part */}
                <div className="right-part lg:w-1/2 w-full flex flex-col gap-4 mx-3 my-3">
                    {["Card One", "Card Two", "Card Three"].map((title, index) => (
                        <div
                            key={index}
                            className="flex items-center border border-gray-300 rounded-md p-3 shadow-md hover:shadow-xl transition-shadow duration-300 hover:bg-[#f0fdfa] group"
                        >
                            <Image
                                src={`/placeholder-${index + 1}.jpg`}
                                alt={title}
                                width={80}
                                height={80}
                                className="rounded-md mr-4 object-cover w-20 h-20 transition-transform duration-300 group-hover:scale-105"
                            />
                            <div>
                                <h2 className="text-lg font-semibold text-[#001a1a]">{title}</h2>
                                <p className="text-sm text-gray-600">Short description about the card content goes here.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Follow-Up Section */}
            <div className="follow-up flex flex-col lg:flex-row w-full px-4 gap-6 mt-8">
                {/* Left Part */}
                <div className="left-part lg:w-2/3 w-full">
                    <h1 className="bg-[#001a1a] p-3 w-auto rounded text-white mb-4 text-center lg:text-left">
                        TUTORIALS - HOW, WHAT AND WHY
                    </h1>

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Left-part-1: Big Image */}
                        <div className="left-part-1 md:w-1/2 w-full">
                            <img
                                src="/tutorial-main.png"
                                alt="Tutorial"
                                className="w-full h-auto rounded-lg border-2 border-[#001a1a] shadow-lg transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Right-part-1: 4 Cards */}
                        <div className="right-part-1 md:w-1/2 w-full flex flex-col gap-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center border rounded-md p-2 shadow hover:scale-105 transition-transform duration-300"
                                >
                                    <img
                                        src={`/thumb-${item}.png`}
                                        alt={`Thumb ${item}`}
                                        className="w-16 h-16 rounded mr-4 object-cover"
                                    />
                                    <div>
                                        <h2 className="text-base font-semibold text-[#001a1a]">
                                            Card Title {item}
                                        </h2>
                                        <p className="text-sm text-gray-600">Short description here.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Part */}
                <div className="right-part lg:w-1/3 w-full">
                    <h1 className="bg-[#001a1a] p-2 w-auto rounded text-white mb-4 text-center lg:text-left">
                        Most Popular
                    </h1>

                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="flex items-center border rounded-md p-2 shadow hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={`/popular-${item}.png`}
                                    alt={`Popular ${item}`}
                                    className="w-16 h-16 rounded mr-4 object-cover"
                                />
                                <div>
                                    <h2 className="text-base font-semibold text-[#001a1a]">
                                        Popular Title {item}
                                    </h2>
                                    <p className="text-sm text-gray-600">Trending post snippet...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* follow-up two */}
            <div className="p-6 bg-gray-50 text-[#001a1a] space-y-10">

                {/* Follow-Up Two Section */}
                <div className="follow-up-two grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left-Part-2 */}
                    <div className="left-part-2 space-y-6">
                        <div className="up-part grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2].map(item => (
                                <div key={item} className="p-4 border rounded shadow hover:scale-105 transition-transform duration-300 bg-white">
                                    <h2 className="font-bold text-lg">Card {item}</h2>
                                    <p className="text-sm text-gray-600">Side-by-side top card content.</p>
                                </div>
                            ))}
                        </div>

                        <div className="down-part grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map(item => (
                                <div key={item} className="p-4 border rounded shadow hover:scale-105 transition-transform duration-300 bg-white">
                                    <h2 className="font-bold text-lg">Card {item}</h2>
                                    <p className="text-sm text-gray-600">Grid content row-wise.</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right-Part-2 */}
                    <div className="right-part-2 space-y-4">
                        <h1 className="text-xl font-semibold">Interesting Reads</h1>
                        {[1, 2, 3].map(item => (
                            <div key={item} className="p-4 border rounded shadow hover:scale-105 transition-transform duration-300 bg-white">
                                <h2 className="font-bold">Read {item}</h2>
                                <p className="text-sm text-gray-600">Some fascinating article insight.</p>
                            </div>
                        ))}
                    </div>

                    {/* NFC Section */}
                    <div className="nfc space-y-6">
                        <div className="top grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[1, 2, 3].map(item => (
                                <div key={item} className="p-4 border rounded shadow hover:scale-105 transition-transform duration-300 bg-white">
                                    <h2 className="font-bold">NFC Top {item}</h2>
                                    <p className="text-sm text-gray-600">Card snippet.</p>
                                </div>
                            ))}
                        </div>

                        <div className="down grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[4, 5].map(item => (
                                <div key={item} className="p-4 border rounded shadow hover:scale-105 transition-transform duration-300 bg-white">
                                    <h2 className="font-bold">NFC Bottom {item}</h2>
                                    <p className="text-sm text-gray-600">Card snippet.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="tips bg-[#001a1a] text-white p-6 rounded-lg shadow-lg space-y-6">
                    <h1 className="text-2xl font-bold">Tips and Tutorials</h1>
                    <div className="cards grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[1, 2, 3].map(item => (
                            <div key={item} className="card-1 p-4 bg-white text-[#001a1a] rounded shadow hover:scale-105 transition-transform duration-300">
                                <h2 className="font-semibold text-lg">Tip {item}</h2>
                                <p className="text-sm text-gray-600">Helpful advice snippet.</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="buttons flex flex-wrap gap-4 justify-center">
                    {['Business Cases', 'Ultimate Guides', 'Tutorials', 'Marketing Tips'].map((label, i) => (
                        <button
                            key={i}
                            className="bg-mainGreen text-white px-4 py-2 rounded shadow-md hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div >
        </div>
    )
}

export default Page;
