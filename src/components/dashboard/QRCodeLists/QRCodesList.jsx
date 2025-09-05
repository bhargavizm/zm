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
import EncryptedPricesModalPopUp from "@/components/QRCodeCustomization/previewTab/modalPopUps/encryptedPricesModalPopUp";

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

const downloadQRCode = async (imageUrl, serviceName) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    link.download = `${serviceName.replace(/\s+/g, "_")}_QR_${date}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  } catch (error) {
    console.error("Error downloading QR code:", error);
    alert("Failed to download QR code. Please try again.");
  }
};

const ITEMS_OPTIONS = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60];

const QRCodesList = () => {
  const { servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);
  const [selectedRenewalService, setSelectedRenewalService] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const userFullData = useSelector(
    (state) => state?.authentication?.fullUserDetails
  );
  const dispatch = useDispatch();
  const allEntries = [];

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
    const modalData = {
      userId: service.user?.id || "",
      serviceId: service._id || "",
      serviceName: service.serviceName || "",
      qrImageUrl: service.qrCodeDetails?.qrCodeImage || "",
      priceDetails: service.priceDetails || {},
    };
    if (
      ["pdf", "audios", "videos", "gallery"].includes(
        service.serviceName.toLowerCase()
      )
    ) {
      setModalType("encrypted");
    } else {
      setModalType("secured");
    }
    setSelectedRenewalService(modalData);
    setIsRenewalModalOpen(true);
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
    if (!renewalDate) return true;
    const now = new Date();
    const renewal = new Date(renewalDate);
    return now > renewal;
  };
  return (
    <>
      <div className="p-4">
        {servicesDataLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h1 className="text-2xl font-bold text-mainGreen mb-4">
              Your QR Code Lists
            </h1>

            {/* Filters */}

            <div className="flex flex-col flex-wrap sm:flex-row justify-between items-center mb-6 gap-3">
              {/* Left side text */}
              <div className="text-sm text-gray-600 w-full sm:w-auto text-center sm:text-left">
                Showing {startIdx + 1} to {endIdx} of {totalEntries} entries
              </div>

              {/* Right side filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-center sm:ml-auto w-full sm:w-auto justify-end">
                {/* Search */}
                <div className="relative w-full sm:w-64">
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

                {/* Status filter */}
                <select
                  className="border-mainGreen border-2 rounded px-2 py-2 text-sm cursor-pointer w-full sm:w-auto"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                {/* Rows per page */}
                <div className="flex items-center gap-2 sm:w-auto w-full justify-end">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Rows per page:
                  </label>
                  <select
                    className="border border-mainGreen rounded px-2 py-1 text-sm"
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

            {/* Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedEntries.length > 0 ? (
                paginatedEntries.map((entry, idx) => {
                  const priceDetails = entry.priceDetails || {};
                  return (
                    <div
                      key={idx}
                      className="border border-mainGreen rounded-xl shadow-lg p-4 bg-white flex flex-col gap-3 hover:shadow-lg transition text-sm"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <span className="text-mainGreen text-xl font-bold capitalize">
                          {entry.serviceName}
                        </span>

                        {/* Validity status */}
                        <div className="text-mainGreen text-lg font-bold capitalize">
                          {/* <span className="font-semibold">Status:</span>{" "} */}
                          {entry.qrCodeDetails.qrCodeStatus || "-"}
                        </div>
                      </div>

                      {/* QR */}
                      <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto p-4">
                        {entry.qrCodeDetails?.qrCodeImage ? (
                          <>
                            <img
                              src={entry.qrCodeDetails.qrCodeImage}
                              alt="QR Code"
                              className={`w-40 h-40 sm:w-48 sm:h-48 md:w-50 md:h-50 object-contain rounded-lg cursor-pointer hover:opacity-90 transition 
    ${
      entry.qrCodeDetails?.qrCodeStatus?.toLowerCase() === "active"
        ? ""
        : "blur-md"
    }`}
                              onClick={() => {
                                if (
                                  entry.qrCodeDetails?.qrCodeStatus?.toLowerCase() ===
                                  "active"
                                ) {
                                  setPreviewImage(
                                    entry.qrCodeDetails.qrCodeImage
                                  );
                                }
                              }}
                            />

                            {previewImage && (
                              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md ">
                                <div className="bg-white rounded-xl shadow-xl p-6 max-w-6xl w-full relative flex flex-col items-center">
                                  {/* Close button */}
                                  <button
                                    onClick={() => setPreviewImage(null)}
                                    className="absolute cursor-pointer top-3 right-3 text-gray-700 text-2xl font-bold hover:text-red-500"
                                  >
                                    ❌
                                  </button>

                                  {/* Image */}
                                  <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="max-w-full max-h-[85vh] rounded-lg shadow-lg object-contain"
                                  />
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => handleDownload(entry)}
                              disabled={downloadingId === entry._id}
                              className={`mt-3 px-5 py-2 cursor-pointer rounded-lg text-sm font-semibold shadow-2xs transition-all
          ${downloadingId === entry._id
                                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                  : "bg-mainGreen text-white hover:bg-teal-700"
                                }`}
                            >
                              {downloadingId === entry._id
                                ? "Downloading..."
                                : "Download QR Code"}
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-500 italic text-sm sm:text-base">
                            No Image
                          </span>
                        )}
                      </div>

                      {/* Subscription */}
                      <div className="text-md text-gray-800">
                        <span className="font-semibold">
                          Subscription Plan:
                        </span>{" "}
                        {priceDetails.plan
                          ? `${priceDetails.plan} (₹${priceDetails.price})`
                          : "-"}
                      </div>

                      {/* ✅ Validity days + price */}
                      <div className="text-md text-gray-800">
                        <span className="font-semibold">Validity Days:</span>{" "}
                        {priceDetails.validityDays
                          ? `${priceDetails.validityDays} Days `
                          : "-"}
                      </div>

                      {/* Premium Sticker */}
                      {priceDetails.premiumStickerPlan && (
                        <div className="text-md text-gray-800">
                          <span className="font-semibold">
                            Premium Sticker:
                          </span>{" "}
                          ₹{priceDetails.premiumStickerPlan}
                        </div>
                      )}

                      {/* Total */}
                      <div className="text-md text-gray-800">
                        <span className="font-semibold">Total Amount:</span> ₹
                        {priceDetails.totalAmount ?? 0}
                      </div>

                      <div className="text-md text-gray-800">
                        <span className="font-semibold">Created On: </span>
                        <span className="text-sm text-gray-800">
                          {priceDetails?.startDate
                            ? formatDate(priceDetails.startDate)
                            : "-"}
                        </span>
                      </div>

                      {/* ✅ Always show scan count, default 0 */}
                      <div className="text-md">
                        <span className="font-semibold">Total Scans:</span>{" "}
                        {entry.qrCodeDetails?.scanCount ?? 0}
                      </div>

                      {/* ✅ Show only if scanHistory has data */}
                      {/* {entry.qrCodeDetails?.scanHistory?.length > 0 && ( */}
                      <div>
                        <span className="font-semibold text-md">
                          Locations:
                        </span>
                        <div className="flex flex-col gap-1 mt-1">
                          {entry.qrCodeDetails?.scanHistory?.length > 0 ? (
                            entry.qrCodeDetails.scanHistory
                              .slice(-5)
                              .reverse()
                              .map((scan, i) => (
                                <div
                                  key={scan._id || i}
                                  className="bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-sm"
                                >
                                  {scan.city || scan.region || scan.country
                                    ? `${scan.city ? scan.city + ", " : ""}${scan.region ? scan.region + ", " : ""}${scan.country}`
                                    : scan.lat && scan.lon
                                      ? `📍 Lat: ${scan.lat.toFixed(4)}, Lon: ${scan.lon.toFixed(4)}`
                                      : "Unknown"}
                                </div>
                              ))
                          ) : (
                            <div className="px-2 py-1 rounded-md text-black">- - - - - -</div>
                          )}


                        </div>
                      </div>
                      {/* )} */}

                      {/* Actions */}
                      {/* Actions */}
                      <div className="flex justify-between flex-wrap gap-3 pt-2">
                        <button
                          onClick={() => openResetModal(entry)}
                          className="bg-mainGreen px-4 py-2 rounded-lg text-white text-md font-medium cursor-pointer"
                        >
                          Reset Password
                        </button>

                        {/* Retry Payment if inactive */}
                        {entry.qrCodeDetails?.qrCodeStatus?.toLowerCase() ===
                          "inactive" && (
                          <button
                            onClick={() => openRenewalModal(entry)} // reuse renewal modal for retry
                            className="bg-yellow-500 px-4 py-2 rounded-lg text-white text-md font-medium cursor-pointer"
                          >
                            Retry Payment
                          </button>
                        )}

                        <button
                          onClick={() => openDeleteModal(entry)}
                          className="text-white bg-red-400 px-4 py-2 rounded-lg text-md font-medium cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>

                      {/* Renewal */}
                      {/* Renewal */}
                      {/* {entry.qrCodeDetails?.qrCodeStatus?.toLowerCase() === "expiry" && ( */}
                      {/* Renewal Payment (always visible, disabled unless expiry) */}
                      <div className="flex flex-col gap-2">
                        <span className="text-lg font-semibold">
                          Renewal Date:
                        </span>
                        <span className="text-md text-gray-600">
                          {priceDetails.renewalDate
                            ? formatDate(priceDetails.renewalDate)
                            : "-"}
                        </span>
                        <button
                          onClick={() => openRenewalModal(entry)}

                          disabled={
                            entry.qrCodeDetails?.qrCodeStatus?.toLowerCase() !==
                            "expiry"
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            entry.qrCodeDetails?.qrCodeStatus?.toLowerCase() ===
                            "expiry"
                              ? "bg-mainGreen text-white hover:bg-teal-700 cursor-pointer"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}

                        >
                          Renewal Payment
                        </button>
                      </div>

                      {/* )} */}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                  No QR Codes Found
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded font-bold ${currentPage === 1
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
                className={`px-3 py-1 rounded font-bold ${currentPage === totalPages
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
      {isRenewalModalOpen &&
        selectedRenewalService &&
        modalType === "encrypted" && (
          <EncryptedPricesModalPopUp
            open={isRenewalModalOpen}
            onClose={() => setIsRenewalModalOpen(false)}
            userMeta={selectedRenewalService}
            onConfirm={() => {
              setIsRenewalModalOpen(false);
              setSelectedRenewalService(null);
              dispatch(getUserFullDetails(setServicesDataLoading));
            }}
          />
        )}
      {isRenewalModalOpen &&
        selectedRenewalService &&
        modalType === "secured" && (
          <SecuredPricesModalPopUp
            open={isRenewalModalOpen}
            onClose={() => setIsRenewalModalOpen(false)}
            userMeta={selectedRenewalService}
            onConfirm={() => {
              setIsRenewalModalOpen(false);
              setSelectedRenewalService(null);
              dispatch(getUserFullDetails(setServicesDataLoading));
            }}
          />
        )}
    </>
  );
};

export default QRCodesList;
