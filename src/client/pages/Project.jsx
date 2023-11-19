import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProject from '@wasp/queries/getProject';
import getMaterials from '@wasp/queries/getMaterials';
import updateProject from '@wasp/actions/updateProject';
import addMaterial from '@wasp/actions/addMaterial';

export function Project() {
  const { projectId } = useParams();
  const { data: project, isLoading: projectLoading, error: projectError } = useQuery(getProject, { projectId });
  const { data: materials, isLoading: materialsLoading, error: materialsError } = useQuery(getMaterials, { projectId });
  const updateProjectFn = useAction(updateProject);
  const addMaterialFn = useAction(addMaterial);
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [estimate, setEstimate] = useState(project?.estimate || 0);

  if (projectLoading || materialsLoading) return 'Loading...';
  if (projectError) return 'Error: ' + projectError;
  if (materialsError) return 'Error: ' + materialsError;

  const handleUpdateProject = () => {
    updateProjectFn({ id: projectId, name, description, estimate });
  };

  const handleAddMaterial = () => {
    // Implement logic to add a material to the project
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Project: {project?.name}</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block font-bold">Name:</label>
        <input
          type="text"
          id="name"
          className="border rounded py-2 px-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-bold">Description:</label>
        <textarea
          id="description"
          className="border rounded py-2 px-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="estimate" className="block font-bold">Estimate:</label>
        <input
          type="number"
          id="estimate"
          className="border rounded py-2 px-3"
          value={estimate}
          onChange={(e) => setEstimate(Number(e.target.value))}
        />
      </div>
      <button
        onClick={handleUpdateProject}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Project
      </button>
      <h2 className="text-2xl font-bold mt-8 mb-4">Materials:</h2>
      {/* Implement rendering of materials */}
      <button
        onClick={handleAddMaterial}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Material
      </button>
    </div>
  );
}