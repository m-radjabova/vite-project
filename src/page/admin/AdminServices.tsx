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
        <div className="admin-services">
            <div className="admin-header d-flex justify-content-between align-items-center">
                <h2 className='display-3'>Manage Services</h2>
                <button 
                    className="btn btn-primary"
                    onClick={handleOpenAdd}
                >
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

            <div className="services-table mt-4">
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id}>
                                <td>{service.id}</td>
                                <td>
                                    <img 
                                        src={service.imgUrl} 
                                        alt={service.name} 
                                        style={{
                                            width: '50px', 
                                            height: '50px', 
                                            objectFit: 'cover',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </td>
                                <td>{service.name}</td>
                                <td>{service.description}</td>
                                <td className="actions">
                                    <button
                                        className="btn btn-outline-warning me-2"
                                        onClick={() => handleEdit(service)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteService(service.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminServices;