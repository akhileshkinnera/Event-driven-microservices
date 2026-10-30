import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="bg-light min-vh-100 pb-5">
            {/* Modern Top Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5 shadow-sm">
                <div className="container">
                    <span className="navbar-brand fw-bold">⚙️ SystemPortal</span>
                    <div className="d-flex">
                        <button 
                            className="btn btn-outline-light me-3" 
                            onClick={() => navigate('/profile')}
                        >
                            My Profile
                        </button>
                        <button 
                            className="btn btn-danger" 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container">
                {/* Sliding Carousel */}
                <div id="dashboardCarousel" className="carousel carousel-dark slide mb-5 shadow-sm rounded-4 overflow-hidden" data-bs-ride="carousel">
                    <div className="carousel-indicators mb-0">
                        <button type="button" data-bs-target="#dashboardCarousel" data-bs-slide-to="0" className="active" aria-current="true"></button>
                        <button type="button" data-bs-target="#dashboardCarousel" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#dashboardCarousel" data-bs-slide-to="2"></button>
                    </div>
                    
                    <div className="carousel-inner bg-white">
                        {/* Slide 1 */}
                        <div className="carousel-item active py-5 text-center">
                            <div className="container py-4">
                                <h1 className="display-5 fw-bold text-primary mb-3">Microservices Dashboard</h1>
                                <p className="fs-5 text-secondary col-md-8 mx-auto">
                                    Welcome to your event-driven architecture control panel. Manage your user profile securely and monitor asynchronous RabbitMQ events natively integrated with Spring Boot.
                                </p>
                            </div>
                        </div>
                        
                        {/* Slide 2 */}
                        <div className="carousel-item py-5 text-center">
                            <div className="container py-4">
                                <h1 className="display-5 fw-bold text-success mb-3">Transactional Outbox Pattern</h1>
                                <p className="fs-5 text-secondary col-md-8 mx-auto">
                                    Guaranteeing message delivery by tying domain state changes and RabbitMQ event publishing to a single local database transaction.
                                </p>
                            </div>
                        </div>

                        {/* Slide 3 */}
                        <div className="carousel-item py-5 text-center">
                            <div className="container py-4">
                                <h1 className="display-5 fw-bold text-danger mb-3">Resilient Error Handling</h1>
                                <p className="fs-5 text-secondary col-md-8 mx-auto">
                                    Safeguarding the system with Idempotent Consumers to prevent duplicate processing and Dead Letter Queues (DLQ) for broken messages.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <button className="carousel-control-prev" type="button" data-bs-target="#dashboardCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#dashboardCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* Interactive Feature Cards */}
                <div className="row g-4 justify-content-center">
                    {/* Profile Card */}
                    <div className="col-md-6">
                        <div 
                            className="card h-100 border-0 shadow-sm rounded-4" 
                            style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                            onClick={() => navigate('/profile')}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.classList.replace('shadow-sm', 'shadow');
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.classList.replace('shadow', 'shadow-sm');
                            }}
                        >
                            <div className="card-body p-5 text-center">
                                <div className="display-4 mb-3">👤</div>
                                <h4 className="card-title fw-bold text-dark">My Profile</h4>
                                <p className="card-text text-muted mt-3">
                                    Update your personal information. Saving changes will trigger a Transactional Outbox event to RabbitMQ.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}