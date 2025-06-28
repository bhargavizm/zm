  <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl h-[95vh] relative px-6 py-6 o overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-darkGreen">
              Customize QR Code
            </h2>
            <button
              className="text-xl cursor-pointer font-bold"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              &#10005;
            </button>
          </div>
          <hr className="border-slate-300 mb-2" />

          {/* Modal Tabs */}
          <div className="flex flex-wrap gap-4 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-md rounded-xl cursor-pointer ${
                  activeTab === tab
                    ? "bg-mainGreen text-white font-bold"
                    : "bg-white text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <hr className="border-slate-300 my-2" />

          {/* Modal Body */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-4"> */}

            {/* Tab content */}
            <div className="w-full col-span-6 lg:col-span-7 overflow-y-auto px-4 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActiveComponent />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Preview Panel */}
            <div className="col-span-6 lg:col-span-5 rounded-xl border w-full border-slate-100 shadow-lg  pb-9 mx-auto ">
              <div className="flex justify-center">
                <PreviewPanel />
              </div>
              <div className="pt-9 ">
                <button
                  onClick={handleClick}
                  className="mx-auto  px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]"
                >
                  Download 
                  <FaLongArrowAltDown />
                </button>
              </div>
            </div>
          </div>
        </div>



            