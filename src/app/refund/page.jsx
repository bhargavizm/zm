import React from 'react';

const page = () => {
    return (
        <div className="relative flex flex-col items-center justify-start min-h-screen px-4 py-10 bg-[#008080] overflow-hidden text-white">
            <div className="absolute inset-0 bg-[url('/noise.jpg')] opacity-[0.15] pointer-events-none z-0"></div>
            {/* Simulated Noise via gradients and blend */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl text-center space-y-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-md animate-fade-in tracking-wide">
                    Refund Policy
                </h1>

                <div className="bg-[#87ecec] backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 text-gray-800 border border-[#ccf0ec] animate-fade-in-up space-y-6 text-left">
                    <p className="text-base sm:text-lg leading-relaxed font-medium">
                        Thank you for choosing our services. Please read the details of our refund policy carefully:
                    </p>

                    <ul className="list-disc list-inside ml-4 text-sm sm:text-base text-gray-700">
                        <li>Refunds are not provided for digital services once access is granted.</li>
                        <li>This includes software tools, QR code generators, and learning material.</li>
                        <li>All digital products are considered final sale.</li>
                    </ul>

                    <p className="text-sm sm:text-base text-gray-700">
                        <span className="font-semibold text-[#004d4d]">ZM QR Code Services</span> maintains a strict
                        <span className="text-red-600 font-bold"> no-refund policy</span> after activation.
                    </p>

                    <p className="text-sm sm:text-base text-gray-700">
                        If you encounter issues, please contact our team. We are happy to assist with technical support and billing clarification.
                    </p>

                    <p className="text-sm sm:text-base text-gray-700">
                        For inquiries, visit our{" "}
                        <a
                            href="/contact"
                            className="text-[#004d4d] font-semibold underline hover:text-[#003030] transition"
                        >
                            Contact Us
                        </a>{" "}
                        page.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;
