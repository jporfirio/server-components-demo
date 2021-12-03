import fs from 'fs/promises';
import path from 'path';
import {prisma} from './db.server';

const NOTES_PATH = path.resolve(__dirname, '../notes');

export async function create({body, title}) {
  const result = await prisma.note.create({
    data: {body, title},
  });

  await fs.writeFile(path.resolve(NOTES_PATH, `${result.id}.md`), body, 'utf8');

  return result;
}

export async function update(id, {title, body}) {
  const updatedId = Number(id);
  await prisma.note.update({
    where: {id: updatedId},
    data: {title, body},
  });
  await fs.writeFile(path.resolve(NOTES_PATH, `${updatedId}.md`), body, 'utf8');
}

export async function destroy(id) {
  await prisma.note.delete({
    where: {id: Number(id)},
  });
  await fs.unlink(path.resolve(NOTES_PATH, `${id}.md`));
}

export async function get(id) {
  return prisma.note.findUnique({
    where: {id: Number(id)},
  });
}
