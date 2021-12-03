/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import NoteList from './NoteList';
import EditButton from './EditButton';
import SearchField from './SearchField';
import {Scripts, Meta, Links, Outlet, useLoaderData, LiveReload} from 'remix';
import {prisma} from './db.server';
import {excerpts} from './utils.server';
import marked from 'marked';

export async function loader({request}) {
  let url = new URL(request.url);
  let notes = await prisma.note.findMany({
    where: {
      title: {
        contains: url.searchParams.get('term') ?? undefined,
      },
    },
  });
  return notes.map((note) => ({
    ...note,
    summary: excerpts(marked(note.body), {words: 20}),
  }));
}

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="React with Server Components demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React Notes</title>
        <Meta />
        <link rel="stylesheet" href="/style.css" />
        <Links />
      </head>
      <body>
        <App />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function App() {
  let notes = useLoaderData();
  return (
    <div className="main">
      <section className="col sidebar">
        <section className="sidebar-header">
          <img
            className="logo"
            src="logo.svg"
            width="22px"
            height="20px"
            alt=""
            role="presentation"
          />
          <strong>React Notes</strong>
        </section>
        <section className="sidebar-menu" role="menubar">
          <SearchField />
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <NoteList notes={notes} />
        </nav>
      </section>
      <section className="col note-viewer">
        <Outlet />
      </section>
    </div>
  );
}

export function ErrorBoundary({error}) {
  console.error(error);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="React with Server Components demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React Notes</title>
        <Meta />
        <link rel="stylesheet" href="style.css" />
        <Links />
      </head>
      <body>
        <div>
          <h1>Application Error</h1>
          <pre style={{whiteSpace: 'pre-wrap'}}>{error.stack}</pre>
        </div>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
