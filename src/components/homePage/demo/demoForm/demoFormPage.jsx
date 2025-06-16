"use client";

import AnimatedButton from "@/components/animatedButton/animatedButton";
import ComingSoonModal from "@/components/modalPopUps/comingSoonModal";
import React, { useState } from "react";

const DemoFormPage = () => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    jobTitle: "",
    phone: "",
    useCase: "",
    referral: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add validation or send to API here
    console.log("Submitted Data:", formData);

    // Show coming soon modal
    setShowModal(true);
  };

  return (
    <>
      <section className="pl-4 p-6 pt-14">
        <form onSubmit={handleSubmit}>
          <div className="pb-5">
            <label htmlFor="email" className="label-styles">Work Email</label>
            <div className="mt-2">
              <input
                required
                id="email"
                name="email"
                type="email"
                className="textbox-styles"
                placeholder="Work Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="pb-5">
              <label htmlFor="firstName" className="label-styles">First Name</label>
              <div className="mt-2">
                <input
                  required
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="textbox-styles"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pb-5">
              <label htmlFor="lastName" className="label-styles">Last Name</label>
              <div className="mt-2">
                <input
                  required
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="textbox-styles"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="pb-5">
              <label htmlFor="companyName" className="label-styles">Company Name</label>
              <div className="mt-2">
                <input
                  required
                  id="companyName"
                  name="companyName"
                  type="text"
                  className="textbox-styles"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pb-5">
              <label htmlFor="jobTitle" className="label-styles">Job Title</label>
              <div className="mt-2">
                <input
                  required
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  className="textbox-styles"
                  placeholder="Job Title"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="pb-5">
            <label htmlFor="phone" className="label-styles">Mobile Number</label>
            <div className="mt-2">
              <input
                required
                id="phone"
                name="phone"
                type="text"
                className="textbox-styles"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <p className="text-slate-500">
            If you're exploring our premium features or paid plans, this demo is
            for you. Please tell us briefly about your use case so we can tailor
            the experience.
          </p>

          <div className="py-5">
            <textarea
              rows={4}
              name="useCase"
              className="textbox-styles"
              placeholder="Describe your use case"
              value={formData.useCase}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="pb-5">
            <label htmlFor="referral" className="label-styles">
              How did you learn about us?
            </label>
            <select
              id="referral"
              name="referral"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.referral}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Google">Google</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Friend">Friend</option>
              <option value="Email">Email</option>
              <option value="Others">Other Medium</option>
            </select>
          </div>

          <div className="text-center py-6">
            <AnimatedButton
              type="submit"
              className="bg-skyBlue cursor-pointer hover:bg-lightBlue hover:text-white text-xl text-darkGreen font-bold py-2 px-6 rounded-lg mt-4"
            >
              Submit
            </AnimatedButton>
          </div>
        </form>
      </section>

      <ComingSoonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default DemoFormPage;
