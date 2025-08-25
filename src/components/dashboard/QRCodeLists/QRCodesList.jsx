"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFullDetails } from "./fetchUserDetails";
import useServicesContext from "@/components/hooks/useServiceContext";
import LoadingSpinner from "@/components/common/spinner";
import axios from "axios";
import ResetPasswordModal from "@/components/common/resetPasswordModal";
import DeleteServiceModal from "@/components/common/deleteModal";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.toLocaleString("en-US", { year: "numeric" });
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${day} ${month} ${year}, ${time}`;
};

const ITEMS_OPTIONS = [5, 10, 20, 30, 40, 50];

const QRCodesList = () => {
  const { servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
const [modalType, setModalType] = useState(null); // "reset" | "delete"

  const userFullData = useSelector(
    (state) => state?.authentication?.fullUserDetails
  );
  console.log("userFullData", userFullData);
  const dispatch = useDispatch();
  const allEntries = [];

  // Flatten and collect all service entries
  (userFullData?.services || []).forEach((service) => {
    if (service?.count > 0) {
      service.data.forEach((item) => {
        allEntries.push({
          serviceName: service.serviceName,
          ...item,
        });
      });
    }
  });

  const totalEntries = allEntries.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalEntries);
  const paginatedEntries = allEntries.slice(startIdx, endIdx);

  useEffect(() => {
    dispatch(getUserFullDetails(setServicesDataLoading));
  }, [dispatch, setServicesDataLoading]);

  const openResetModal = (data) => {
  setSelectedService({
    userId: data?.user?.id || "",
    userName: data?.user?.name || "",
    serviceName: data?.serviceName || "",
    serviceId: data?._id || "",
  });
  setModalType("reset");
  setIsModalOpen(true);
};

const openDeleteModal = (data) => {
  setSelectedService({
    userId: data?.user?.id || "",
    userName: data?.user?.name || "",
    serviceName: data?.serviceName || "",
    serviceId: data?._id || "",
  });
  setModalType("delete");
  setIsModalOpen(true);
};


  const closeResetModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const getLocationCounts = (scanHistory = []) => {
    const counts = {};

    scanHistory.forEach((scan) => {
      const key = `${scan.city}, ${scan.country}`; // ✅ only city + country
      counts[key] = (counts[key] || 0) + 1;
    });

    return counts;
  };

  return (
    <>
      <div className="p-4">
        {servicesDataLoading ? (
          <LoadingSpinner />
        ) : totalEntries === 0 ? (
          <p className="text-gray-500">No QR entries found.</p>
        ) : (
          <>
            {/* Header + Rows Selector */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {" "}
                Your QR Code Lists
              </h1>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Rows per page:
                </label>
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  {ITEMS_OPTIONS.map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 shadow-sm rounded-lg">
                <thead className="bg-mainGreen text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Service</th>
                    <th className="px-4 py-3 text-left">Subscription</th>
                    <th className="px-4 py-3 text-left">Validity Status</th>
                    <th className="px-4 py-3 text-left">Renewal Date</th>
                    <th className="px-4 py-3 text-left">QR Code</th>
                    <th className="px-4 py-3 text-left">Total Scans</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    {/* <th className="px-4 py-3 text-left">Scan Summary</th> */}

                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {paginatedEntries.map((entry, idx) => {
                    const priceDetails = entry.priceDetails || {};
                    return (
                      <tr key={idx} className="hover:bg-gray-50 transition">
                        {/* Date */}
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatDate(entry.createdAt || new Date())}
                        </td>

                        {/* Service */}
                        <td className="px-4 py-3 capitalize text-mainGreen font-medium">
                          {entry.serviceName}
                        </td>

                        {/* Subscription (Plan + Price) */}
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {priceDetails.plan
                            ? `${priceDetails.plan} (₹ ${priceDetails.price})`
                            : "-"}
                        </td>

                        {/* Validity Status */}
                        <td className="px-4 py-3 text-sm font-medium">
                          {entry.qrCodeDetails.qrCodeStatus || "-"}
                        </td>

                        {/* Renewal Date */}
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {priceDetails.renewalDate
                            ? formatDate(priceDetails.renewalDate)
                            : "-"}
                        </td>

                        {/* QR Code */}
                        <td className="px-4 py-3 text-center">
                          {entry.qrCodeDetails?.qrCodeImage ? (
                            <img
                              src={entry.qrCodeDetails.qrCodeImage}
                              alt="QR Code"
                              className="w-30 h-20 object-center rounded"
                            />
                          ) : (
                            <span className="text-gray-400 italic">
                              No Image
                            </span>
                          )}
                        </td>

                        {/* Total Scans */}
                        <td className="px-4 py-3 text-center text-lg">
                          {entry.qrCodeDetails?.scanCount ? entry.qrCodeDetails?.scanCount : "-"}
                        </td>

                        {/* Location */}
                       <td className="px-4 py-3 w-[160px]">
                          {entry.qrCodeDetails?.scanHistory?.length > 0 ? (
                            <ul className="space-y-1">
                              {entry.qrCodeDetails.scanHistory
                                .slice(-5)
                                .reverse()
                                .map((scan, i) => (
                                  <li
                                    key={scan._id || i}
                                    className="bg-gray-100 px-2 py-1 rounded-md text-gray-700"
                                  >
                                    {scan.city}, {scan.region}, {scan.country}
                                  </li>
                                ))}
                            </ul>
                          ) : (
                            <span className="text-gray-400 italic">
                              No scans yet
                            </span>
                          )}
                        </td>

                        {/* <td className="px-4 py-3 text-sm">
                          {entry.qrCodeDetails?.scanHistory?.length > 0 ? (
                            <ul className="space-y-1">
                              {Object.entries(
                                getLocationCounts(
                                  entry.qrCodeDetails.scanHistory
                                )
                              ).map(([location, count], i) => (
                                <li
                                  key={i}
                                  className="bg-blue-50 px-2 py-1 rounded-md text-blue-700 font-medium"
                                >
                                  {location} → {count} scans
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-gray-400 italic">
                              No scans yet
                            </span>
                          )}
                        </td> */}

                        {/* Actions */}
                       <td className="px-4 py-3 text-sm">
  <button
    onClick={() => openResetModal(entry)}
    className="px-3 py-1 text-mainGreen rounded hover:font-bold"
  >
    Reset Password
  </button>

  <button
    onClick={() => openDeleteModal(entry)}
    className="px-3 py-1 text-red-600 rounded hover:font-bold"
  >
    Delete
  </button>
</td>

                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Info */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {startIdx + 1} to {endIdx} of {totalEntries} entries
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded font-bold ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-mainGreen text-white hover:bg-teal-400"
                }`}
              >
                Prev
              </button>

              <span className="px-3 py-1 text-mainGreen font-semibold border border-mainGreen rounded">
                {currentPage}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded font-bold ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-mainGreen text-white hover:bg-teal-400"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

     {isModalOpen && modalType === "reset" && (
  <ResetPasswordModal
    onClose={() => setIsModalOpen(false)}
    serviceData={selectedService}
    servicesDataLoading={servicesDataLoading}
    setServicesDataLoading={setServicesDataLoading}
  />
)}

{isModalOpen && modalType === "delete" && (
  <DeleteServiceModal
    onClose={() => setIsModalOpen(false)}
    serviceData={selectedService}
    onDeleted={(deletedId) => {
      // optional: remove from UI immediately
    }}
    servicesDataLoading={servicesDataLoading}
    setServicesDataLoading={setServicesDataLoading}
  />
)}


    </>
  );
};

export default QRCodesList;
