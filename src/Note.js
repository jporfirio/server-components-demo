/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {format} from 'date-fns';

import NotePreview from './NotePreview';
import EditButton from './EditButton';
import {prisma} from './db.server';
import {useLoaderData} from 'remix';

export function loader({params}) {
  return prisma.note.findUnique({
    where: {
      id: Number(params.id),
    },
  });
}

export default function Note() {
  let {id, title, body, updatedAt} = useLoaderData();
  updatedAt = new Date(updatedAt);

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            Last updated on {format(updatedAt, "d MMM yyyy 'at' h:mm bb")}
          </small>
          <EditButton noteId={id}>Edit</EditButton>
        </div>
      </div>
      <NotePreview body={body} />
    </div>
  );
}
