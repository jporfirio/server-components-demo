/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState} from 'react';
import {Form, useTransition, redirect} from 'remix';
import {create, update, destroy} from './notes.server';

import NotePreview from './NotePreview';

export async function action({request, params}) {
  let data = Object.fromEntries(await request.formData());

  if (data._action === 'create') {
    let note = await create(data);
    return redirect(`/${note.id}`);
  }

  if (data._action === 'update') {
    await update(params.id, data);
    return redirect(`/${params.id}`);
  }

  if (data._action === 'delete') {
    await destroy(params.id);
    return redirect('/');
  }

  throw new Error('Unexpected action');
}

export default function NoteEditor({noteId, initialTitle, initialBody}) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const transition = useTransition();
  const isNavigating = transition.state === 'loading';

  const isSaving =
    transition.state === 'submitting' &&
    transition.submission.formData.get('_action') === 'create';
  const isDeleting =
    transition.state === 'submitting' &&
    transition.submission?.formData.get('_action') === 'delete';

  const isDraft = noteId === null;
  return (
    <Form method="post" className="note-editor">
      <div
        className="note-editor-form"
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          name="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          id="note-body-input"
          name="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </div>
      <div className="note-editor-preview">
        <div className="note-editor-menu" role="menubar">
          <button
            className="note-editor-done"
            disabled={isSaving || isNavigating}
            name="_action"
            value={isDraft ? 'create' : 'update'}>
            <img
              src="/checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            Done
          </button>
          {!isDraft && (
            <button
              className="note-editor-delete"
              name="_action"
              value="delete"
              disabled={isDeleting || isNavigating}>
              <img
                src="/cross.svg"
                width="10px"
                height="10px"
                alt=""
                role="presentation"
              />
              Delete
            </button>
          )}
        </div>
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview title={title} body={body} />
      </div>
    </Form>
  );
}
