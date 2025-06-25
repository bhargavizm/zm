

'use client'

import React, { useRef, useState } from 'react'
import useServicesContext from '@/components/hooks/useServiceContext'
import NFCModal from '@/components/modalPopUps/nfcModal'

const Toggle = ({ checked, onChange }) => (
  <label className="inline-flex items-center cursor-pointer ml-2">
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#008080] relative transition-all">
      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5" />
    </div>
  </label>
)

const MenuBookContent = () => {
  const { menuBookFormData, setMenuBookFormData } = useServicesContext()
  const [extraOpenIndex, setExtraOpenIndex] = useState(null)

  
const fileRefs = useRef([]);

  const handleToggleChange = (index) => {
    const updated = [...menuBookFormData.extras]
    updated[index].visible = !updated[index].visible
    setMenuBookFormData({ ...menuBookFormData, extras: updated })
  }

  const handleExtraChange = (index, field, value) => {
    const updated = [...menuBookFormData.extras]
    updated[index][field] = value
    setMenuBookFormData({ ...menuBookFormData, extras: updated })
  }

  const handleMenuChange = (index, field, value) => {
    const updated = [...menuBookFormData.menuItems]
    updated[index][field] = value
    setMenuBookFormData({ ...menuBookFormData, menuItems: updated })
  }

  // const handleFileUpload = (e, index) => {
  //   const file = e.target.files[0]
  //   if (!file) return
  //   const fileURL = URL.createObjectURL(file)
  //   const updated = [...menuBookFormData.menuItems]
  //   updated[index].image = `${fileURL}?t=${Date.now()}`
  //   setMenuBookFormData({ ...menuBookFormData, menuItems: updated })
  // }

  const handleFileUpload = (e, index) => {
  const file = e.target.files[0];
  if (!file) return;

  const fileURL = URL.createObjectURL(file); // ✅ don't modify this
  const updated = [...menuBookFormData.menuItems];
  updated[index].image = fileURL; // ✅ no query string
  setMenuBookFormData({ ...menuBookFormData, menuItems: updated });
};


  const handleVideoUpload = (e, index) => {
    const file = e.target.files[0]
    if (!file) return
    const fileURL = URL.createObjectURL(file)
    const updated = [...menuBookFormData.extras]
    updated[index].value = `${fileURL}?t=${Date.now()}`
    setMenuBookFormData({ ...menuBookFormData, extras: updated })
  }

  return (
    <>
      <div className="text-black font-sans">
        <div className="flex flex-col md:flex-row pt-6 pb-12 gap-4">
          <div className="w-full top-24">
            <div className="bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto space-y-6 scrollbar-hidden">
              <h2 className="text-2xl font-bold text-[#008080]">Create QR Menu</h2>

              <input
                value={menuBookFormData.restaurantName}
                onChange={(e) =>
                  setMenuBookFormData({ ...menuBookFormData, restaurantName: e.target.value })
                }
                placeholder="Name of Business"
                className="w-full border px-4 py-2 rounded"
              />

              {/* Menu Items */}
              <div>
              {menuBookFormData.menuItems.map((item, index) => (
  <div
    key={index}
    className={`mt-4 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-start gap-4`}
  >
    <div className="w-full space-y-2 border p-4 rounded bg-[#f0fdfd] relative">
      <input
        ref={(el) => (fileRefs.current[index] = el)}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileUpload(e, index)}
        className="w-full text-sm text-gray-700
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-[#008080] file:text-white
          hover:file:bg-[#006666] transition duration-200 cursor-pointer"
      />

      {/* Preview + Remove */}
      {item.image && (
        <div className="relative w-24 h-24 mt-3">
          <img
            src={item.image}
            alt={`Menu item ${index}`}
            className="w-full h-full object-cover rounded border shadow-sm"
          />
          <button
            onClick={() => {
              const updated = [...menuBookFormData.menuItems];
              updated[index].image = "";
              setMenuBookFormData({ ...menuBookFormData, menuItems: updated });
              if (fileRefs.current[index]) fileRefs.current[index].value = ""; // clear file input
            }}
            className="absolute top-[-8px] right-[-8px] bg-white text-red-600 rounded-full w-5 h-5 text-xs flex items-center justify-center shadow-md"
            title="Remove"
          >
            ✖
          </button>
        </div>
      )}

      {menuBookFormData.menuItems.length > 1 && (
        <button
          onClick={() => {
            const updated = [...menuBookFormData.menuItems];
            updated.splice(index, 1);
            setMenuBookFormData({ ...menuBookFormData, menuItems: updated });

            // Clean up ref
            fileRefs.current.splice(index, 1);
          }}
          className="absolute top-2 right-2 text-red-600 text-sm"
        >
          ❌
        </button>
      )}
    </div>
  </div>
))}


                <button
                  onClick={() =>
                    setMenuBookFormData((prev) => ({
                      ...prev,
                      menuItems: [
                        ...prev.menuItems,
                        { name: '', description: '', price: '', image: '', visible: true }
                      ]
                    }))
                  }
                  className="mt-2 px-3 py-1 bg-[#004d4d] text-white rounded"
                >
                  Add Image
                </button>
              </div>

              {/* Extra Fields Dropdown */}
              <div className="pt-6 border-t border-gray-300 space-y-3">
                <h3 className="text-xl font-semibold text-[#008080]">Additional Info</h3>
                {menuBookFormData.extras.map((field, i) => (
                  <div key={i} className="border p-3 bg-gray-50 rounded">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setExtraOpenIndex(extraOpenIndex === i ? null : i)}
                    >
                      <span className="text-[#004d4d] font-semibold">{field.label}</span>
                      <Toggle checked={field.visible} onChange={() => handleToggleChange(i)} />
                    </div>
                    {extraOpenIndex === i && (
                      <div className="mt-2">
                        {field.type === 'video' ? (
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleVideoUpload(e, i)}
                            className="w-full"
                          />
                        ) : (
                          <input
                            value={field.value}
                            onChange={(e) => handleExtraChange(i, 'value', e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full border px-3 py-2 mt-2 rounded"
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <NFCModal />

        <div className="text-center my-6">
          <button
            type="submit"
            className="w-full bg-[#008080] hover:bg-[#006666] text-white py-3 rounded-lg font-medium transition-colors shadow-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default MenuBookContent
