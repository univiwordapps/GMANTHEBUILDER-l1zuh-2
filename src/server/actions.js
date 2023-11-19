import HttpError from '@wasp/core/HttpError.js'

export const createProject = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Project.create({
    data: {
      name: args.name,
      description: args.description,
      estimate: args.estimate,
      user: { connect: { id: context.user.id } }
    }
  });
}

export const addMaterial = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { name, price, quantity, projectId } = args;

  const project = await context.entities.Project.findUnique({
    where: { id: projectId }
  });
  if (!project) { throw new HttpError(404) };

  if (project.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Material.create({
    data: {
      name,
      price,
      quantity,
      project: { connect: { id: projectId } }
    }
  });
}

export const updateProject = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const project = await context.entities.Project.findUnique({
    where: { id: args.id }
  });
  if (project.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Project.update({
    where: { id: args.id },
    data: { name: args.name, description: args.description, estimate: args.estimate }
  });
}
