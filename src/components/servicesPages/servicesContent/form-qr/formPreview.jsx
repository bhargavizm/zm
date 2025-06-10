import React from 'react'

const FormPreview = () => {
  return (
    <>
    <section>
        <h1>FORM PREVIEW</h1>
                    {/* Right Preview Section */}
            {/* <div className="hidden md:flex w-1/3 items-center justify-center relative">
                <div
                    className="fixed mr-0 mt-12 w-[300px] h-[550px] bg-black rounded-[40px] border-[12px] border-gray-900 shadow-2xl"
                    style={{
                        backgroundImage: formData.selectedTemplate
                            ? `url(/templates/template${formData.selectedTemplate}.png)`
                            : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-30"></div>
                    <div className="absolute inset-0 bg-white overflow-y-auto p-4 text-black rounded-[28px] space-y-4">
                        {formImage && (
                            <Image
                                src={formImage}
                                alt="Form Preview"
                                width={280}
                                height={280}
                                className="rounded-md w-full object-cover"
                            />
                        )}
                        <h2 className="text-xl font-bold text-[#008080] mt-10 text-center">{formData.formName}</h2>
                        <p className="text-sm text-gray-700">{formData.formDescription}</p>

                        {formData.formUrl && (
                            <a
                                href={formData.formUrl}
                                target="_blank"
                                className="text-teal-600 underline block"
                            >
                                🔗 Form Link
                            </a>
                        )}
                        {formData.videoUrl && (
                            <a
                                href={formData.videoUrl}
                                target="_blank"
                                className="text-teal-600 underline block"
                            >
                                🎥 Video Link
                            </a>
                        )}
                        <p className="text-sm">📧 {formData.contactEmail}</p>
                        <p className="text-sm">📞 {formData.contactPhone}</p>
                    </div>
                </div>
            </div> */}
    </section>
    </>
  )
}

export default FormPreview