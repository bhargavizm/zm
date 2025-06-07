import React from 'react'
import Image from 'next/image'
import { Eye, Rocket, Target, BarChart, Users, Star } from 'lucide-react'

const sections = [
  {
    title: 'Vision',
    icon: <Eye className="w-8 h-8 text-white" />,
    text: `We offer advanced QR code solutions tailored to business needs. Our analytics, integrations,
      and digital strategies empower seamless connections and smarter decisions.`,
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2015&q=80',
  },
  {
    title: 'Mission',
    icon: <Rocket className="w-8 h-8 text-white" />,
    text: `To deliver innovative and intuitive QR solutions that enhance engagement,
      streamline workflows, and drive business growth through technology.`,
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: 'Goals',
    icon: <Target className="w-8 h-8 text-white" />,
    list: [
      'To consistently innovate and create tailored QR code solutions.',
      'To empower businesses of all scales to leverage modern technology.',
      'To remain a trusted digital transformation partner.',
    ],
    image:
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=2070&q=80',
  },
]

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#012828] text-white">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide text-white">ZMQR</h1>
          <nav className="hidden md:flex space-x-8">
            {['Home', 'About Us', 'Services', 'Investors'].map((item) => (
              <a
                key={item}
                href={`/${item.replace(/\s+/g, '').toLowerCase()}`}
                className="hover:text-green-300 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-br from-[#014d4d] to-[#027373]">
        <h2 className="text-5xl font-extrabold mb-4 text-white transition duration-500 hover:scale-105">
          About Us
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-green-100">
          At ZMQR, we're transforming the future of QR technology with seamless service, secure
          storage, and innovative solutions that drive efficiency and engagement.
        </p>
      </section>

      {/* Dynamic Sections */}
      <section className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {sections.map((section, i) => (
          <div
            key={section.title}
            className={`grid md:grid-cols-2 gap-10 items-center ${
              i % 2 !== 0 ? 'md:flex-row-reverse' : ''
            } transition duration-700`}
          >
            {/* Card Section */}
            <div className="bg-white text-black rounded-xl p-8 shadow-xl hover:shadow-2xl transition duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-[#014d4d] p-3 rounded-full mr-4">{section.icon}</div>
                <h3 className="text-3xl font-semibold">{section.title}</h3>
              </div>
              {section.list ? (
                <ul className="space-y-3 text-[#2cbfbf]">
                  {section.list.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <BarChart className="w-5 h-5 mr-2 text-[#027373] mt-1" />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#011212]">{section.text}</p>
              )}
            </div>

            {/* Image */}
            <div className="rounded-lg overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500">
              <Image
                src={section.image}
                alt={`${section.title} illustration`}
                width={700}
                height={450}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 text-black">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2 text-[#014d4d]">
            <Users className="w-8 h-8" /> Our Team
          </h3>
          <p className="text-[#014d4d] max-w-3xl mx-auto">
            A dedicated and passionate team of technologists, designers, and strategists working
            together to revolutionize digital access and QR code-driven efficiency.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-[#015b5b] to-black">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {['Innovation', 'Integrity', 'Excellence'].map((value) => (
            <div
              key={value}
              className="bg-black/80 text-white p-6 rounded-xl text-center shadow-md hover:shadow-lg transition duration-300"
            >
              <Star className="mx-auto text-yellow-300 mb-4" />
              <h4 className="text-xl font-semibold mb-2">{value}</h4>
              <p className="text-black-100">
                We value {value.toLowerCase()} in every aspect of our work, driving our mission
                forward with passion and purpose.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center text-sm text-green-200 py-6">
        &copy; {new Date().getFullYear()} ZMQR Code Services. All rights reserved.
      </footer>
    </div>
  )
}

export default AboutUs
