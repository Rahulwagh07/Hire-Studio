// ShowCertificationModal.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addCertification, updateCertification } from '../../../../../services/operations/portfolioAPI'; // Update API calls
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomInput from './CustomInput';
import { formatDate } from '../../../../../utils/FormatDate';
 

export default function ShowCertificationModal({ editCertification, setIsOpen, certification, certificationFields }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (editCertification) {
      certificationFields.forEach((field) => {
        if (field.type === 'date') {
          setValue(field.id, formatDate(certification[field.id]));
        } else {
          setValue(field.id, certification[field.id]);
        }
      });
    }
  }, [editCertification, certification, setValue, certificationFields]);

  const onCancel = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    certificationFields.forEach((field) => {
      formData.append(field.id, data[field.id]);
    });

    if (editCertification) {
      formData.append('certificationId', certification._id);
    }

    try {
      const result = editCertification
        ? await updateCertification(formData, token)
        : await addCertification(formData, token);

      if (result) {
        onCancel();
        navigate('/dashboard/settings');
      }
    } catch (error) {
      console.error('Error submitting certification:', error);
    }
 
  };

  return (
    <div className='custom_container'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='p-8 sm:p-4 sm:py-8 sm:w-[300px] border-brand section_bg box-shadow  space-y-8 rounded-md  w-[500px] mx-auto'
      >
        {certificationFields.map((field) => (
          <CustomInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            error={errors[field.id] && field.validation.error}
          />
        ))}

        <div className='flex justify-end gap-x-8'>
          <button onClick={onCancel} className='text-bule-150'>
            Cancel
          </button>
          <button type='submit' className='bg-blue-150  px-6 py-2 text-white-25 rounded-md'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
