import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicantProfile } from '../services/operations/profileAPI';
import { useSelector } from 'react-redux';

//Components
import UserProfileCard from '../components/core/ProfilePage/UserProfileCard'; 
import ExperienceProjectCard from '../components/core/ProfilePage/ExperienceProjectCard';
import ResumeCard from '../components/core/ProfilePage/ResumeCard';
import SocialMediaProfiles from '../components/core/ProfilePage/SocialMediaProfiles';

function Profile() {
  const { applicantId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [user, setuser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
   

  useEffect(() => {
    fetchApplicantDetail();
  }, []);

  const fetchApplicantDetail = async () => {
    try {
      const response = await getApplicantProfile(applicantId, token);
      setuser(response.user);
      setPortfolio(response.portfolio);
      console.log(response.user)
      console.log(response.portfolio)
    } catch (error) {
      console.error('Error fetching applicant detail:', error);
       
    }
  };
  

  return (
    <div>
       {
        user === null || portfolio === null ? (
          <div className='flex items-center justify-center'>Loading...</div>
        ) : (
          <div className='flex flex-col gap-6'>
            <UserProfileCard  user={user}/>

            {/* Social Media Profiles */}
            <div className='bg-white shadow-lg p-8'>
              {portfolio.socialMediaProfiles && (
                <SocialMediaProfiles profiles={portfolio.socialMediaProfiles} />
              )}
            </div>
            
            {/* Experiences */}
            <div className='bg-white shadow-lg p-8 flex flex-col gap-2'>
              <h3>Experience</h3>
              <div className=''>
                {portfolio.experiences.map((experience) => (
                  <ExperienceProjectCard key={experience._id} {...experience} />
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className='bg-white shadow-lg p-8 flex flex-col gap-2'>
              <h3>Projects</h3>
              <div className=''>
                {portfolio.projects.map((project) => (
                  <ExperienceProjectCard key={project._id} {...project} />
                ))}
              </div>
            </div>

            {/* Work Samples */}
            <div className='bg-white shadow-lg p-8 flex flex-col gap-2'>
              <h3>Work Samples</h3>
              <div className=''>
              {portfolio.contentSamples.map((workSample) => (
              <ExperienceProjectCard
                  key={workSample._id}  
                  title={workSample.title}
                  description={workSample.description}
                  link={workSample.link}
                />
              ))}
              </div>
            </div>

            {/* Education */}
            <div className='bg-white shadow-lg p-8 flex flex-col gap-2'>
              <h3>Education</h3>
              <div className=''>
                {portfolio.education.map((education) => (
                <ExperienceProjectCard
                    key={education._id}  
                    title={education.degree}
                    fieldOfStudy={education.fieldOfStudy}
                    description={education.institution}
                    startDate={education.startDate}
                    endDate={education.endDate}
                     
                  />
                ))}
              </div>

            </div>

           {/* ResumeSection */}
            <div className='bg-white shadow-lg p-8'>
              {portfolio.resume && (
                <ResumeCard
                  name={portfolio.resume.name}
                  url={portfolio.resume.url}
                />
              )}
            </div>
          </div>
          
        )
       }

    </div>
  );
}

export default Profile;
