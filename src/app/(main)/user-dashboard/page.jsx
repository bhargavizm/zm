'use client';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLogOut, FiActivity, FiTrendingUp, FiAward, FiSettings } from 'react-icons/fi';
import { useState } from 'react';

const UserDashboard = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        mobile: "+1 (123) 456-7890",
        profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=60", // Real profile image
        qrScans: 42,
        lastScanLocation: "New York, USA",
        weeklyActivity: [12, 19, 8, 15, 12, 18, 14],
        recentScans: [
            { location: "Central Park", time: "2 hours ago" },
            { location: "Times Square", time: "5 hours ago" },
            { location: "Empire State", time: "1 day ago" }
        ]
    });

    const handleLogout = () => {
        alert("Logging out...");
    };

    return (
        <div className="dashboard-container" style={{ 
            display: 'flex', 
            minHeight: '100vh', 
            backgroundColor: '#f8fafc',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Sidebar */}
            <div style={{
                width: '320px',
                background: 'linear-gradient(180deg, #001a1a 0%, #003333 100%)',
                color: 'white',
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
            }}>
                {/* Profile Section */}
                <div style={{ 
                    textAlign: 'center', 
                    padding: '20px 0',
                    borderBottom: '1px solid rgba(0, 128, 128, 0.3)'
                }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        border: '4px solid #008080',
                        margin: '0 auto 15px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                        <img
                            src={user.profileImage}
                            alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    <h2 style={{ 
                        margin: '10px 0 5px', 
                        color: '#008080',
                        fontSize: '1.5rem',
                        fontWeight: '600'
                    }}>{user.name}</h2>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        margin: '5px 0',
                        justifyContent: 'center'
                    }}>
                        <FiMail style={{ color: '#008080' }} />
                        <span style={{ fontSize: '0.9rem' }}>{user.email}</span>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        margin: '5px 0',
                        justifyContent: 'center'
                    }}>
                        <FiPhone style={{ color: '#008080' }} />
                        <span style={{ fontSize: '0.9rem' }}>{user.mobile}</span>
                    </div>
                </div>

                {/* Stats Section */}
                <div style={{ 
                    background: 'rgba(0, 128, 128, 0.15)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0, 128, 128, 0.3)',
                    backdropFilter: 'blur(5px)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '15px'
                    }}>
                        <h3 style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            fontSize: '1rem',
                            fontWeight: '500'
                        }}>
                            <FiUser style={{ color: '#008080' }} /> QR Scans
                        </h3>
                        <FiActivity style={{ color: '#008080' }} />
                    </div>
                    <p style={{ 
                        fontSize: '2rem', 
                        fontWeight: '700',
                        margin: '5px 0',
                        color: '#008080'
                    }}>{user.qrScans}</p>
                    
                    <div style={{
                        height: '4px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '2px',
                        margin: '10px 0',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '70%',
                            height: '100%',
                            background: '#008080',
                            borderRadius: '2px'
                        }}></div>
                    </div>

                    <h3 style={{ 
                        margin: '15px 0 10px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        fontSize: '1rem',
                        fontWeight: '500'
                    }}>
                        <FiMapPin style={{ color: '#008080' }} /> Last Scan
                    </h3>
                    <p style={{ fontSize: '0.9rem' }}>{user.lastScanLocation}</p>
                </div>

                {/* Navigation */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '10px'
                }}>
                    <button style={{
                        padding: '12px 15px',
                        background: 'transparent',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        ':hover': {
                            background: 'rgba(0, 128, 128, 0.2)'
                        }
                    }}>
                        <FiTrendingUp /> Analytics
                    </button>
                    <button style={{
                        padding: '12px 15px',
                        background: 'transparent',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        ':hover': {
                            background: 'rgba(0, 128, 128, 0.2)'
                        }
                    }}>
                        <FiAward /> Achievements
                    </button>
                    <button style={{
                        padding: '12px 15px',
                        background: 'transparent',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        ':hover': {
                            background: 'rgba(0, 128, 128, 0.2)'
                        }
                    }}>
                        <FiSettings /> Settings
                    </button>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: 'auto',
                        padding: '12px',
                        background: 'rgba(0, 128, 128, 0.2)',
                        color: 'white',
                        border: '1px solid rgba(0, 128, 128, 0.5)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        ':hover': {
                            background: 'rgba(0, 128, 128, 0.3)'
                        }
                    }}
                >
                    <FiLogOut /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ 
                flex: 1, 
                padding: '40px',
                overflowY: 'auto'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}>
                    <h1 style={{ 
                        color: '#001a1a', 
                        margin: 0,
                        fontSize: '2rem',
                        fontWeight: '700'
                    }}>Dashboard Overview</h1>
                    <div style={{
                        padding: '8px 16px',
                        background: '#e6fffa',
                        color: '#008080',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}>
                        Premium Member
                    </div>
                </div>

                {/* Welcome Card */}
                <div style={{
                    background: 'linear-gradient(135deg, #e6fffa 0%, #ffffff 100%)',
                    padding: '25px',
                    borderRadius: '16px',
                    borderLeft: '6px solid #008080',
                    marginBottom: '30px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{ 
                        color: '#008080', 
                        margin: '0 0 10px',
                        fontSize: '1.5rem',
                        fontWeight: '600'
                    }}>Welcome back, {user.name}!</h2>
                    <p style={{
                        color: '#4a5568',
                        margin: 0,
                        lineHeight: '1.6'
                    }}>Here's what's happening with your QR scans today. You've had 3 new scans since yesterday.</p>
                </div>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        borderTop: '4px solid #008080'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h3 style={{
                                color: '#4a5568',
                                margin: '0 0 10px',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}>Total Scans</h3>
                            <FiActivity style={{ color: '#008080' }} />
                        </div>
                        <p style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            margin: '5px 0',
                            color: '#001a1a'
                        }}>{user.qrScans}</p>
                        <p style={{
                            color: '#38a169',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            margin: 0
                        }}>
                            <FiTrendingUp /> 12% from last week
                        </p>
                    </div>

                    <div style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        borderTop: '4px solid #4299e1'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h3 style={{
                                color: '#4a5568',
                                margin: '0 0 10px',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}>Active Users</h3>
                            <FiUser style={{ color: '#4299e1' }} />
                        </div>
                        <p style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            margin: '5px 0',
                            color: '#001a1a'
                        }}>128</p>
                        <p style={{
                            color: '#38a169',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            margin: 0
                        }}>
                            <FiTrendingUp /> 8% from last week
                        </p>
                    </div>

                    <div style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        borderTop: '4px solid #9f7aea'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h3 style={{
                                color: '#4a5568',
                                margin: '0 0 10px',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}>Scan Locations</h3>
                            <FiMapPin style={{ color: '#9f7aea' }} />
                        </div>
                        <p style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            margin: '5px 0',
                            color: '#001a1a'
                        }}>24</p>
                        <p style={{
                            color: '#38a169',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            margin: 0
                        }}>
                            <FiTrendingUp /> 3 new locations
                        </p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{
                    background: 'white',
                    padding: '25px',
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    marginBottom: '30px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <h2 style={{
                            color: '#001a1a',
                            margin: 0,
                            fontSize: '1.25rem',
                            fontWeight: '600'
                        }}>Recent Scans</h2>
                        <button style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#008080',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}>
                            View All
                        </button>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px'
                    }}>
                        {user.recentScans.map((scan, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '15px',
                                borderRadius: '8px',
                                background: '#f8fafc',
                                transition: 'all 0.2s',
                                ':hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                                }
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'rgba(0, 128, 128, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px'
                                }}>
                                    <FiMapPin style={{ color: '#008080' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        margin: '0 0 4px',
                                        fontWeight: '500'
                                    }}>{scan.location}</p>
                                    <p style={{
                                        margin: 0,
                                        color: '#718096',
                                        fontSize: '0.85rem'
                                    }}>{scan.time}</p>
                                </div>
                                <button style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#008080',
                                    cursor: 'pointer',
                                    fontWeight: '500'
                                }}>
                                    Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Chart */}
                <div style={{
                    background: 'white',
                    padding: '25px',
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{
                        color: '#001a1a',
                        margin: '0 0 20px',
                        fontSize: '1.25rem',
                        fontWeight: '600'
                    }}>Weekly Activity</h2>
                    <div style={{
                        height: '200px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '10px'
                    }}>
                        {user.weeklyActivity.map((value, index) => (
                            <div key={index} style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    height: `${value * 8}px`,
                                    width: '30px',
                                    background: 'linear-gradient(to top, #008080, #00b3b3)',
                                    borderRadius: '6px 6px 0 0',
                                    transition: 'height 0.3s ease'
                                }}></div>
                                <span style={{
                                    marginTop: '8px',
                                    fontSize: '0.8rem',
                                    color: '#718096'
                                }}>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;