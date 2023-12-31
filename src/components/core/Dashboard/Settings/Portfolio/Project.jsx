import React, { useEffect, useState } from 'react';
import { deleteProject, getAllProjects } from '../../../../../services/operations/portfolioAPI';
import { useSelector } from 'react-redux';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from "react-icons/ri"
import ShowProjectModal from "./ShowProjectModal"
import ProjectFields from '../../../../../data/ProjectFields';
import { formatDateString } from '../../../../../utils/FormatDate';

function Project() {
  const { token } = useSelector((state) => state.auth)
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [editProject, setEditProject] = useState(false)
  const [selectedProject, setSelectedProject] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getAllProjects(token);
        if (result) {
          setProjects(result);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnAddClick = () => {
    setEditProject(false);
    setIsOpen(true);
  }

  const handleOnEditClick = (project) => {
    setEditProject(true)
    setSelectedProject(project);
    setIsOpen(true);
  }

  const handleOnDelete = async (projectId) => {
    try {
      await deleteProject(projectId, token);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className='section_bg box-shadow p-6 rounded-md border border-sky-400'>
      {!isOpen && (
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='font-semibold'>Projects</h3>
            <button onClick={handleOnAddClick} className='text-blue-150 font-semibold'>
              Add Project
            </button>
          </div>
          {projects.length > 0 ? (
            <div>
              {projects.map((project) => (
                <div key={project._id} className='mb-4 p-4 border-b border-slate-50 text-pure-greys-500 dark:text-slate-400'>
                  <div className='flex gap-4 items-center font-bold text-black'>
                    <p >
                      {project.title}
                    </p>
                    <FiEdit2 onClick={() => handleOnEditClick(project)} className='cursor-pointer hover:text-blue-500' />
                    <RiDeleteBin6Line onClick={() => handleOnDelete(project._id)} className='cursor-pointer hover:text-red-500' />
                  </div>
                  <p>{project.description}</p>
                  <a href={project.link} target='_blank' rel="noreferrer" className='text-sky-400'>link</a> | {" "} 
                  { formatDateString(project.startDate)} to {formatDateString(project.endDate)}
              
                </div>
              ))}
            </div>
          ) : (
            <p>Add project details</p>
          )}
        </div>
      )}
      {isOpen && (
        <ShowProjectModal
          editProject={editProject}
          setIsOpen={setIsOpen}
          project={selectedProject}
          projectFields={ProjectFields}
        />
      )}
    </div>
  );
}

export default Project;