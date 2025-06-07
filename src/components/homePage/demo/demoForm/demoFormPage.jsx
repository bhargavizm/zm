"use client";

import React from "react";

const DemoFormPage = () => {
  return (
    <>
      <section className="pl-4 p-6 pt-14">
        <form action="">
          <div className="pb-5">
            <label htmlFor="accountId" className="label-styles">
              Work Email
            </label>
            <div className="mt-2">
              <input
                required
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                className="textbox-styles"
                //   value={accountId}
                //   onChange={(e) => setAccountId(e.target.value)}
                placeholder="Work Email"
                //disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="pb-5">
              <label htmlFor="firstName" className="label-styles">
                First Name
              </label>
              <div className="mt-2">
                <input
                  required
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="off"
                  className="textbox-styles"
                  placeholder="First Name"
                />
              </div>
            </div>

            <div className="pb-5">
              <label htmlFor="lastName" className="label-styles">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  required
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="off"
                  className="textbox-styles"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="pb-5">
              <label htmlFor="firstName" className="label-styles">
                Company Name
              </label>
              <div className="mt-2">
                <input
                  required
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="off"
                  className="textbox-styles"
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div className="pb-5">
              <label htmlFor="lastName" className="label-styles">
                Job Title
              </label>
              <div className="mt-2">
                <input
                  required
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="off"
                  className="textbox-styles"
                  placeholder="Job Title"
                />
              </div>
            </div>
          </div>

          <div className="pb-5">
            <label htmlFor="phone" className="label-styles">
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                required
                id="phone"
                name="phone"
                type="text"
                autoComplete="off"
                className="textbox-styles"
                placeholder="Phone"
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
              className="textbox-styles"
              placeholder="Describe your use case"
            ></textarea>
          </div>

          <div className="pb-5">
            <label htmlFor="lastName" className="label-styles">
              How did you learn about us?
            </label>
            <select
              // value={genderFilter}
              // onChange={(e) => setGenderFilter(e.target.value)}
              className="w-full  border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Select </option>
              <option value="Google">Google</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Friend">Friend</option>
              <option value="Email">Email</option>
              <option value="Others">Other Medium</option>
            </select>
          </div>

          <div className="text-center py-6">
            <button className="bg-skyBlue cursor-pointer hover:bg-lightBlue hover:text-white text-xl text-darkGreen font-bold py-2 px-6 rounded-lg mt-4">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default DemoFormPage;
