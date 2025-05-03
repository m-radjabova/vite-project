import { FieldValues, useForm } from "react-hook-form";
import { FiBook, FiCalendar, FiHome, FiUsers, FiHash, FiFileText, FiSend, FiArrowLeft } from "react-icons/fi";
import apiClient from "../../apiClient/ApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useContextPro from "../../hooks/useContextPro";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const announcementSchema = z.object({
  theme: z.string().min(1, "Theme is required"),
  subjectName: z.string().min(1, "Subject name is required"),
  groupName: z.string().min(1, "Group name is required"),
  groupNumber: z.string().min(1, "Group number is required"),
  para: z.string().min(1, "Period is required"),
  scheduleDate: z.string().min(1, "Date is required"),
  address: z.string().min(1, "Address is required"),
  announcementText: z.string().min(1, "Application text is required"),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

function ArizaBildirgiForm() {
  const { state: { user } } = useContextPro();
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } ,
    reset
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema)
  });

  const onSubmit = (data: FieldValues) => {
    const formData = {
      ...data,
      completed: false,
      createdAt: new Date().toISOString(), 
      scheduleDate: data.scheduleDate,
      teacherId: user?.id 
    };
    apiClient.post("/announcement", formData)
      .then(response => {
        console.log(response.data);
        toast.success("Announcement submitted successfully",);
        navigate("/teacher/bildirgi");
        reset();
      })
      .catch(error => {
        toast.error("Failed to submit announcement", error);
      });
  };
  
  const today = new Date();
  const todayStr = today.toISOString().split('T')[2];

  return (
    <div>
      <div className="p-4 pb-0 mb-3 d-flex justify-content-end">
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0"
          style={{
              color: '#3a7bd5',
              fontWeight: '500',
              transition: 'all 0.3s ease'  
          }}
            >
              <div style={{
                width: '100px',
                height: '36px',
                background: 'rgba(58, 123, 213, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                gap: '8px',
                transition: 'all 0.3s ease'
              
            }}>
                <FiArrowLeft size={18} style={{ color: '#3a7bd5' }} />
              <span  style={{ 
                  fontSize: '0.95rem',
                  position: 'relative'    
            }}>
              Back
            </span>
            </div>
        </button>
      </div>
      <div className="card border-0" style={{
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden'
      }}>
        <div className="card-header p-4" style={{
          background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
          color: 'white'
        }}>
          <h2 className="mb-0 d-flex align-items-center" style={{ fontWeight: '600' }}>
            <FiFileText className="me-3" size={24} />
            Bildirgini To'ldirish
          </h2>
        </div>
        
        <div className="card-body p-4" style={{ backgroundColor: '#f8fafc' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-4 mb-4">
              {/* Mavzu */}
              <div className="col-md-6">
                <label htmlFor="theme" className="form-label d-flex align-items-center" style={{
                  color: '#3a7bd5',
                  fontWeight: '500'
                }}>
                  <FiBook className="me-2" />
                  Theme
                </label>
                <div className="input-group" style={{ borderRadius: '10px' }}>
                  <span className="input-group-text bg-white border-end-0">
                    <FiBook color="#64748b" />
                  </span>
                  <input 
                    type="text" 
                    className={`form-control border-start-0 ${errors.theme ? 'is-invalid' : ''}`} 
                    style={{
                      borderColor: errors.theme ? '#dc3545' : '#e2e8f0',
                      borderRadius: '0 10px 10px 0',
                      transition: 'all 0.3s ease'
                    }}
                    id="theme" 
                    {...register("theme")}
                  />
                </div>
                {errors.theme && (
                  <div className="text-danger mt-1">{errors.theme.message}</div>
                )}
              </div>
              
              {/* Fan nomi */}
              <div className="col-md-6">
                <label htmlFor="subjectName" className="form-label d-flex align-items-center" style={{
                  color: '#3a7bd5',
                  fontWeight: '500'
                }}>
                  <FiBook className="me-2" />
                  Subject Name
                </label>
                <div className="input-group" style={{ borderRadius: '10px' }}>
                  <span className="input-group-text bg-white border-end-0">
                    <FiBook color="#64748b" />
                  </span>
                  <input 
                    type="text" 
                    className={`form-control border-start-0 ${errors.subjectName ? 'is-invalid' : ''}`} 
                    style={{
                      borderColor: errors.subjectName ? '#dc3545' : '#e2e8f0',
                      borderRadius: '0 10px 10px 0',
                      transition: 'all 0.3s ease'
                    }}
                    id="subjectName" 
                    {...register("subjectName")}
                  />
                </div>
                {errors.subjectName && (
                  <div className="text-danger mt-1">{errors.subjectName.message}</div>
                )}
              </div>
              
              {/* Guruh nomi */}
              <div className="col-md-4">
                <label htmlFor="groupName" className="form-label d-flex align-items-center" style={{
                  color: '#3a7bd5',
                  fontWeight: '500'
                }}>
                  <FiUsers className="me-2" />
                  Group Name
                </label>
                <div className="input-group" style={{ borderRadius: '10px' }}>
                  <span className="input-group-text bg-white border-end-0">
                    <FiUsers color="#64748b" />
                  </span>
                  <input 
                    type="text" 
                    className={`form-control border-start-0 ${errors.groupName ? 'is-invalid' : ''}`} 
                    style={{
                      borderColor: errors.groupName ? '#dc3545' : '#e2e8f0',
                      borderRadius: '0 10px 10px 0',
                      transition: 'all 0.3s ease'
                    }}
                    id="groupName" 
                    {...register("groupName")}
                  />
                </div>
                {errors.groupName && (
                  <div className="text-danger mt-1">{errors.groupName.message}</div>
                )}
              </div>
              
              {/* Guruh raqami */}
              <div className="col-md-4">
                <label htmlFor="groupNumber" className="form-label d-flex align-items-center" style={{
                  color: '#3a7bd5',
                  fontWeight: '500'
                }}>
                  <FiHash className="me-2" />
                  Group Number
                </label>
                <div className="input-group" style={{ borderRadius: '10px' }}>
                  <span className="input-group-text bg-white border-end-0">
                    <FiHash color="#64748b" />
                  </span>
                  <input 
                    type="text" 
                    className={`form-control border-start-0 ${errors.groupNumber ? 'is-invalid' : ''}`} 
                    style={{
                      borderColor: errors.groupNumber ? '#dc3545' : '#e2e8f0',
                      borderRadius: '0 10px 10px 0',
                      transition: 'all 0.3s ease'
                    }}
                    id="groupNumber" 
                    {...register("groupNumber")}
                  />
                </div>
                {errors.groupNumber && (
                  <div className="text-danger mt-1">{errors.groupNumber.message}</div>
                )}
              </div>
              
              {/* Para */}
              <div className="col-md-4">
                <label htmlFor="para" className="form-label d-flex align-items-center" style={{
                  color: '#3a7bd5',
                  fontWeight: '500'
                }}>
                  <FiHash className="me-2" />
                  Period
                </label>
                <div className="input-group" style={{ borderRadius: '10px' }}>
                  <span className="input-group-text bg-white border-end-0">
                    <FiHash color="#64748b" />
                  </span>
                  <input 
                    type="text" 
                    className={`form-control border-start-0 ${errors.para ? 'is-invalid' : ''}`} 
                    style={{
                      borderColor: errors.para ? '#dc3545' : '#e2e8f0',
                      borderRadius: '0 10px 10px 0',
                      transition: 'all 0.3s ease'
                    }}
                    id="para" 
                    {...register("para")}
                  />
                </div>
                {errors.para && (
                  <div className="text-danger mt-1">{errors.para.message}</div>
                )}
              </div>
            </div>

            <div className="row g-4 mb-4">
              {/* Sana */}
              <div className="col-md-6">
                <label htmlFor="scheduleDate" className="form-label d-flex align-items-center" style={{
                  color: '#3a7bd5',
                  fontWeight: '500'
                }}>
                  <FiCalendar className="me-2" />
                  Date
                </label>
                <div className="input-group" style={{ borderRadius: '10px' }}>
                  <span className="input-group-text bg-white border-end-0">
                    <FiCalendar color="#64748b" />
                  </span>
                  <input 
                    type="date" 
                    min={todayStr}
                    max={todayStr} 
                    className={`form-control border-start-0 ${errors.scheduleDate ? 'is-invalid' : ''}`} 
                    style={{
                      borderColor: errors.scheduleDate ? '#dc3545' : '#e2e8f0',
                      borderRadius: '0 10px 10px 0',
                      transition: 'all 0.3s ease'
                    }}
                    id="scheduleDate" 
                    {...register("scheduleDate")}
                  />
                </div>
                {errors.scheduleDate && (
                  <div className="text-danger mt-1">{errors.scheduleDate.message}</div>
                )}
              </div>
            </div>

            {/* Manzil */}
            <div className="mb-4">
              <label htmlFor="address" className="form-label d-flex align-items-center" style={{
                color: '#3a7bd5',
                fontWeight: '500'
              }}>
                <FiHome className="me-2" />
                Address
              </label>
              <div className="input-group" style={{ borderRadius: '10px' }}>
                <span className="input-group-text bg-white border-end-0">
                  <FiHome color="#64748b" />
                </span>
                <input 
                  type="text" 
                  className={`form-control border-start-0 ${errors.address ? 'is-invalid' : ''}`} 
                  style={{
                    borderColor: errors.address ? '#dc3545' : '#e2e8f0',
                    borderRadius: '0 10px 10px 0',
                    transition: 'all 0.3s ease'
                  }}
                  id="address" 
                  {...register("address")}
                />
              </div>
              {errors.address && (
                <div className="text-danger mt-1">{errors.address.message}</div>
              )}
            </div>

            {/* Ariza matni */}
            <div className="mb-4">
              <label htmlFor="announcementText" className="form-label d-flex align-items-center" style={{
                color: '#3a7bd5',
                fontWeight: '500'
              }}>
                <FiFileText className="me-2" />
                Announcement Text
              </label>
              <div className="input-group" style={{ borderRadius: '10px' }}>
                <span className="input-group-text bg-white border-end-0 align-items-start pt-3">
                  <FiFileText color="#64748b" />
                </span>
                <textarea 
                  rows={4} 
                  className={`form-control border-start-0 ${errors.announcementText ? 'is-invalid' : ''}`} 
                  style={{
                    borderColor: errors.announcementText ? '#dc3545' : '#e2e8f0',
                    borderRadius: '0 10px 10px 0',
                    transition: 'all 0.3s ease',
                    resize: 'none'
                  }}
                  id="announcementText" 
                  {...register("announcementText")}
                />
              </div>
              {errors.announcementText && (
                <div className="text-danger mt-1">{errors.announcementText.message}</div>
              )}
            </div>

            {/* Submit button */}
            <div className="d-flex justify-content-end mt-4">
              <button 
                type="submit" 

                className="btn px-4 py-2 fw-medium d-flex align-items-center" 
                style={{
                  background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(58, 123, 213, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                <FiSend className="me-2" />
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ArizaBildirgiForm;