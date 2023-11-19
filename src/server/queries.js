import HttpError from '@wasp/core/HttpError.js'

export const getProjects = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Project.findMany({
    where: { userId: context.user.id }
  });
}

export const getProject = async ({ projectId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const project = await context.entities.Project.findUnique({
    where: { id: projectId },
    include: { user: true }
  });

  if (!project) { throw new HttpError(400) }

  if (project.user.id !== context.user.id) { throw new HttpError(400) }

  return project;
}

export const getMaterials = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const project = await context.entities.Project.findUnique({
    where: { id: args.projectId },
    select: { userId: true }
  });

  if (!project) { throw new HttpError(400) };

  if (project.userId !== context.user.id) { throw new HttpError(400) };

  return context.entities.Material.findMany({
    where: { projectId: args.projectId }
  });
}