import { useState, useEffect } from 'react';
import { Service } from '../home/Home';
import AdminServicesForm from './AdminServicesForm';
import apiClient from '../../apiClient/ApiClient';

function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const handleClose = () => {
        setOpen(false);
        setSelectedService(null);
    };

    useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => {
        try {
            const response = await apiClient.get('/services');
            setServices(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteService = async (id: number | undefined) => {
        try {
            await apiClient.delete(`/services/${id}`);
            getServices();
        } catch (err) {
            console.log(err);
        }
    };

    const addService = async (data: Omit<Service, "id">) => {
        try {
            const response = await apiClient.post(`/services`, data);
            setServices([...services, response.data]);
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };

    const updateService = async (data: Service) => {
        try {
            await apiClient.put(`/services/${data.id}`, data);
            getServices();
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };

    const handleOpenAdd = () => {
        setSelectedService(null);
        setOpen(true);
    };

    const handleEdit = (service: Service) => {
        setSelectedService(service);
        setOpen(true);
    };

    return (
        <div className="admin-services bg-light p-4 rounded-4">
            <div className="admin-header d-flex justify-content-between align-items-center mb-5">
                <h2 className='display-5 fw-bold text-gradient'>
                    <i className="bi bi-gear-fill me-3"></i>
                    Service Management
                </h2>
                <button 
                    className="btn btn-primary px-4 py-2 fw-medium d-flex align-items-center"
                    onClick={handleOpenAdd}
                    style={{
                        background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0, 210, 255, 0.25)'
                    }}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Service
                </button>
            </div>

            <AdminServicesForm 
                open={open} 
                onClose={handleClose}
                addService={addService}
                updateService={updateService}
                selectedService={selectedService}
            />

            <div className="services-table mt-4 bg-white p-4 rounded-4 shadow-sm">
                <div className="table-responsive">
                    <table className='table table-hover align-middle'>
                        <thead className='table-light'>
                            <tr>
                                <th className='ps-4'>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th className='text-end pe-4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => (
                                <tr key={service.id} className='hover-highlight'>
                                    <td className='ps-4 fw-semibold'>{service.id}</td>
                                    <td>
                                        <div className='service-image-container'>
                                            <img 
                                                src={service.imgUrl} 
                                                alt={service.name} 
                                                className='service-image'
                                            />
                                        </div>
                                    </td>
                                    <td className='fw-medium'>{service.name}</td>
                                    <td>
                                        <div className='text-truncate' style={{maxWidth: '200px'}}>
                                            {service.description}
                                        </div>
                                    </td>
                                    <td className="actions text-end pe-4">
                                        <button
                                            className="btn btn-sm btn-outline-warning me-2 action-btn"
                                            onClick={() => handleEdit(service)}
                                        >
                                            <i className="bi bi-pencil-square me-1"></i>
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger action-btn"
                                            onClick={() => deleteService(service.id)}
                                        >
                                            <i className="bi bi-trash me-1"></i>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminServices;