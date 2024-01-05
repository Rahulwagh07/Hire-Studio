// Certification.js
import React, { useEffect, useState } from 'react';
import { deleteCertification, getAllCertifications } from '../../../../../services/operations/portfolioAPI'; 
import { useSelector } from 'react-redux';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ShowCertificationModal from './ShowCertificationModal';
import CertificationFields from '../../../../../data/CertificationFields';  
import { formatDateString } from '../../../../../utils/FormatDate';  


function Certification() {
  const { token } = useSelector((state) => state.auth);
  const [certifications, setCertifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editCertification, setEditCertification] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState([]);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const result = await getAllCertifications(token);
        if (result) {
          setCertifications(result);
        }
      } catch (error) {
        console.error('Error fetching certifications:', error);
      }
    };
    fetchCertifications();
  }, [token]);

  const handleOnAddClick = () => {
    setEditCertification(false);
    setIsOpen(true);
  };

  const handleOnEditClick = (certification) => {
    setEditCertification(true);
    setSelectedCertification(certification);
    setIsOpen(true);
  };

  const handleOnDelete = async (certificationId) => {
    try {
      await deleteCertification(certificationId, token);
      setCertifications((prevCertifications) =>
        prevCertifications.filter((certification) => certification._id !== certificationId)
      );
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
  };

  return (
    <div className='section_bg box-shadow p-6 rounded-md border border-sky-400'>
      {!isOpen && (
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='font-semibold'>Certifications</h3>
            <button onClick={handleOnAddClick} className='text-blue-150 font-semibold'>
              Add Certification
            </button>
          </div>
          {certifications.length > 0 ? (
            <div>
              {certifications.map((certification) => (
                <div key={certification._id} className='mb-4 p-4 border-b border-slate-50 text-pure-greys-500'>
                  <div className='flex gap-4 items-center font-bold text-black'>
                    <p  >{certification.title}</p>
                    <FiEdit2 onClick={() => handleOnEditClick(certification)} className='cursor-pointer hover:text-blue-500 ' />
                    <RiDeleteBin6Line onClick={() => handleOnDelete(certification._id)} className='cursor-pointer hover:text-red-500' />
                  </div>
                  <p>{certification.issuingOrganization}</p>
                  <p>
                    <a href={certification.url} target='_blank' className='text-blue-200'>link</a>
                     | issueDate: {formatDateString(certification.issueDate)} 
                   
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Add Certification details</p>
          )}
        </div>
      )}
      {isOpen && (
        <ShowCertificationModal
          editCertification={editCertification}
          setIsOpen={setIsOpen}
          certification={selectedCertification}
          certificationFields={CertificationFields}
        />
      )}
    </div>
  );
}

export default Certification;
