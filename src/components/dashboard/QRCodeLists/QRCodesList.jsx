"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFullDetails } from "./fetchUserDetails";
import useServicesContext from "@/components/hooks/useServiceContext";
import LoadingSpinner from "@/components/common/spinner";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ITEMS_OPTIONS = [5, 10, 20, 30, 40, 50];

const QRCodesList = () => {
  const dispatch = useDispatch();
  const { servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const userFullData = useSelector(
    (state) => state?.authentication?.fullUserDetails
  );
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
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
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedEntries.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(entry.createdAt || new Date())}
                    </td>
                    <td className="px-4 py-3 capitalize text-mainGreen font-medium">
                      {entry.serviceName}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                                        <td className="px-4 py-3 text-center">
                      {entry.qrCodeDetails?.qrCodeImage ? (
                        <img
                          src={entry.qrCodeDetails.qrCodeImage}
                          alt="QR Code"
                          className="w-20 h-20 object-center  rounded"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* <td className="px-4 py-3 text-gray-800">
                      {entry.name || entry.title || entry.url || "-"}
                    </td> */}
                  </tr>
                ))}
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
  );
};

export default QRCodesList;
