import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProjects from '@wasp/queries/getProjects';
import createProject from '@wasp/actions/createProject';

export function Dashboard() {
  const { data: projects, isLoading, error } = useQuery(getProjects);
  const createProjectFn = useAction(createProject);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateProject = () => {
    createProjectFn({
      name: 'New Project',
      description: 'Project Description',
      estimate: 0
    });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <button
        onClick={handleCreateProject}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Project
      </button>

      <div className='mt-4'>
        {projects.map((project) => (
          <div
            key={project.id}
            className='bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <h2 className='text-xl font-bold'>{project.name}</h2>
            <p className='text-gray-600'>{project.description}</p>
            <p className='text-gray-600'>Estimate: ${project.estimate}</p>
            <Link to={`/project/${project.id}`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2'>Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}