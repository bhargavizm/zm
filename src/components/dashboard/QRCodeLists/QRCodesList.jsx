"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFullDetails } from "./fetchUserDetails";
import useServicesContext from "@/components/hooks/useServiceContext";
import LoadingSpinner from "@/components/common/spinner";
import { FiSearch } from "react-icons/fi";
import ResetPasswordModal from "@/components/common/resetPasswordModal";
import DeleteServiceModal from "@/components/common/deleteModal";
import SecuredPricesModalPopUp from "@/components/QRCodeCustomization/previewTab/modalPopUps/securedPricesModalPopUp";

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

// Improved function to download QR code image
const downloadQRCode = async (imageUrl, serviceName) => {
  try {
    // Fetch the image as a blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Create a URL for the blob
    const blobUrl = URL.createObjectURL(blob);

    // Create an anchor element
    const link = document.createElement("a");
    link.href = blobUrl;

    // Create a filename using service name and current date
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    link.download = `${serviceName.replace(/\s+/g, "_")}_QR_${date}.png`;

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the blob URL
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  } catch (error) {
    console.error("Error downloading QR code:", error);
    alert("Failed to download QR code. Please try again.");
  }
};

const ITEMS_OPTIONS = [5, 10, 20, 30, 40, 50];

const QRCodesList = () => {
  const { servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [modalType, setModalType] = useState(null); // "reset" | "delete"
  const [downloadingId, setDownloadingId] = useState(null); // Track downloading state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);
  const [selectedRenewalService, setSelectedRenewalService] = useState(null);

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

  const filteredEntries = allEntries.filter((entry) => {
    const matchesSearch = entry.serviceName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter
      ? (entry.qrCodeDetails?.qrCodeStatus || "").toLowerCase() ===
        statusFilter.toLowerCase()
      : true;

    return matchesSearch && matchesStatus;
  });

  const totalEntries = filteredEntries.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalEntries);
  const paginatedEntries = filteredEntries.slice(startIdx, endIdx);

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

  const openRenewalModal = (service) => {
    setSelectedRenewalService({
      userId: service.user?.id || "",
      serviceId: service._id || "",
      serviceName: service.serviceName || "",
      qrImageUrl: service.qrCodeDetails?.qrCodeImage || "",
    });
    setIsRenewalModalOpen(true);
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

  const handleDownload = async (entry) => {
    setDownloadingId(entry._id);
    try {
      await downloadQRCode(entry.qrCodeDetails.qrCodeImage, entry.serviceName);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadingId(null);
    }
  };

const isExpired = (renewalDate) => {
  if (!renewalDate) return true; // treat missing date as expired
  const now = new Date();
  const renewal = new Date(renewalDate);
  return now > renewal;
};



  return (
    <>
      <div className="p-4">
        {servicesDataLoading ? (
          <LoadingSpinner />
        ) : totalEntries === 0 ? (
          <p className="text-black text-2xl text-center">
            No QR entries found.
          </p>
        ) : (
          <>
            <h1 className="text-2xl  font-bold text-mainGreen mb-2">
              Your QR Code Lists
            </h1>
            {/* Header + Rows Selector */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
              {/* Pagination Info */}
              <div className="mt-4 text-sm text-gray-600">
                Showing {startIdx + 1} to {endIdx} of {totalEntries} entries
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-center">
                {/* 🔍 Search Bar */}
                <div className="relative w-64">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FiSearch className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by service name..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="border-mainGreen border-2 rounded px-3 py-2 text-sm w-full pl-9 focus:outline-none focus:ring-2 focus:ring-mainGreen"
                  />
                </div>

                <select
                  className="border-mainGreen border-2 rounded px-2 py-2 text-sm cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value=""> Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                {/* Rows per page */}
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
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 shadow-sm rounded-lg">
                <thead className="bg-mainGreen text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Services</th>
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

                        {/* QR Code with Download Button */}
                        <td className="px-4 py-3">
                          {entry.qrCodeDetails?.qrCodeImage ? (
                            <div className="flex flex-col items-center">
                              <img
                                src={entry.qrCodeDetails.qrCodeImage}
                                alt="QR Code"
                                className="w-30 h-20 object-center rounded mb-2 cursor-pointer hover:opacity-80"
                                onClick={() => {
                                  const newWindow = window.open("", "_blank");
                                  newWindow.document.write(`
            <html>
              <head><title>QR Code</title></head>
              <body style="margin:0;display:flex;align-items:center;justify-content:center;background:#000;">
                <img src="${entry.qrCodeDetails.qrCodeImage}" style="max-width:100%;max-height:100vh;"/>
              </body>
            </html>
          `);
                                }}
                              />
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">
                              No Image
                            </span>
                          )}
                        </td>

                        {/* Total Scans */}
                        <td className="px-4 py-3 text-center text-lg">
                          {entry.qrCodeDetails?.scanCount
                            ? entry.qrCodeDetails?.scanCount
                            : "-"}
                        </td>

                        {/* Location */}
                        <td className="px-4 py-3 w-[200px]">
                          {entry.qrCodeDetails?.scanHistory?.length > 0 ? (
                            <div className="flex flex-col gap-1">
                              {entry.qrCodeDetails.scanHistory
                                .slice(-5)
                                .reverse()
                                .map((scan, i) => (
                                  <div
                                    key={scan._id || i}
                                    className="bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-sm break-words"
                                  >
                                    {scan.city
                                      ? `${scan.city}, ${scan.region}, ${scan.country}`
                                      : scan.country}
                                  </div>
                                ))}
                            </div>
                          ) : (
                              "-"
                           
                          )}
                        </td>

                        {/* Actions */}
                       <td className=" py-3 grid grid-cols-2 gap-2 text-md">
                        <button onClick={() => handleDownload(entry)} disabled={downloadingId === entry._id} className="px-2 py-1 text-mainGreen rounded text-md hover:underline hover:font-bold cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed">
                          {downloadingId === entry._id ? "Downloading..." : "Download QR Code"}
                        </button>

                        <button onClick={() => openResetModal(entry)} className="px-3 py-1 text-mainGreen cursor-pointer rounded hover:font-bold hover:underline">Reset Password</button>

                        <button onClick={() => openDeleteModal(entry)} className="px-3 py-1 text-red-600 cursor-pointer rounded hover:font-bold hover:underline">Delete</button>

                        <button
    onClick={() => openRenewalModal(entry)}
    disabled={!isExpired(priceDetails.renewalDate)}
    className={`px-3 py-1 rounded text-mainGreen font-medium transition ${
      isExpired(priceDetails.renewalDate)
        ? "bg-mainGreen hover:bg-teal-700 cursor-pointer"
        : " cursor-not-allowed"
    }`}
  >
    Renew
  </button>
                      </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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

       {/* 🔹 Renewal Modal */}
      {isRenewalModalOpen && selectedRenewalService && (
        <SecuredPricesModalPopUp
          open={isRenewalModalOpen}
          onClose={() => setIsRenewalModalOpen(false)}
          userMeta={selectedRenewalService}
          onConfirm={() => {
            setIsRenewalModalOpen(false);
            setSelectedRenewalService(null);
            dispatch(getUserFullDetails(setServicesDataLoading)); // Refresh list after renewal
          }}
        />
      )}
    </>
  );
};

export default QRCodesList;
