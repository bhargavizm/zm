'use client';

import React, { useState } from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';
import { FiTrash2, FiPlus } from 'react-icons/fi';

const MedicalAlertContent = () => {
    const {
        dynamicForms,
        updateDynamicForm,
        addTemplateField,
        removeTemplateField,
        setDynamicForms,
        showPassword,
        setShowPassword,
    } = useServicesContext();

    const medicalAlert = dynamicForms.medicalAlert;

    const sections = {
        patientInfo: ['patientName', 'birthDate', 'bloodType'],
        medicalHistory: ['medicalConditions', 'allergies', 'medications', 'additionalNotes'],
        emergencyContact: ['emergencyContact', 'contactPhone'],
        additional: ['familyDoctorName', 'familyDoctorPhone', 'emergencyInstructions', 'insuranceProvider', 'policyNumber'],
    };

    const [deletedFields, setDeletedFields] = useState({
        patientInfo: [],
        medicalHistory: [],
        emergencyContact: [],
        additional: [],
    });

    const handleChange = (section, key, value) => {
        updateDynamicForm('medicalAlert', section, key, value);
    };

    const handleAddField = (section, key) => {
        addTemplateField('medicalAlert', section, key, '');
        setDeletedFields(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item !== key),
        }));
    };

    const handleRemoveField = (section, key) => {
        removeTemplateField('medicalAlert', section, key);
        setDeletedFields(prev => ({
            ...prev,
            [section]: [...prev[section], key],
        }));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setDynamicForms(prev => ({
            ...prev,
            medicalAlert: {
                ...prev.medicalAlert,
                password: value,
            },
        }));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold pb-6 text-[#008080]">Medical Alert QR Code</h1>

            {/* Sections */}
            {Object.entries(sections).map(([section, fields]) => (
                <div key={section} className="border rounded p-4 shadow-sm space-y-4">
                    <h3 className="text-xl font-semibold capitalize text-[#008080]">{section.replace(/([A-Z])/g, ' $1')}</h3>

                    {fields
                        .filter(key => medicalAlert[section]?.[key] !== undefined)
                        .map(key => (
                            <div key={key} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    name={key}
                                    placeholder={key.replace(/([A-Z])/g, ' $1')}
                                    value={medicalAlert[section][key]}
                                    onChange={e => handleChange(section, key, e.target.value)}
                                    className="border p-2 rounded flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveField(section, key)}
                                    className="  hover:bg-red-200"
                                >
                                    <FiTrash2 className='text-red-700'/>
                                </button>
                            </div>
                        ))}

                    {/* Dropdown to Add Deleted Fields */}
                    {deletedFields[section].length > 0 && (
                        <div className="flex items-center space-x-2">
                            <select
                                onChange={(e) => {
                                    const key = e.target.value;
                                    if (key) handleAddField(section, key);
                                    e.target.selectedIndex = 0;
                                }}
                                className="border p-2 rounded"
                            >
                                <option value="">Add field</option>
                                {deletedFields[section].map((field) => (
                                    <option key={field} value={field}>
                                        {field.replace(/([A-Z])/g, ' $1')}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            ))}

            {/* Password */}
            {/* Password field */}
            <div>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password (optional)"
                    value={dynamicForms.medicalAlert?.password || ''}
                    onChange={(e) =>
                        setDynamicForms((prev) => ({
                            ...prev,
                            medicalAlert: {
                                ...prev.medicalAlert,
                                password: e.target.value,
                            },
                        }))
                    }
                    className="border p-2 rounded w-full"
                />

                <label className="flex items-center mt-2 space-x-2 text-sm">
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <span>Show Password</span>
                </label>
            </div>

        </div>
    );
};

export default MedicalAlertContent;
