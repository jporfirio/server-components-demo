import {useLoaderData} from 'remix';
import NoteEditor, {action} from '../NoteEditor';
import {get} from '../notes.server';

export {action};

export function loader({params}) {
  return get(params.id);
}

export default function New() {
  let note = useLoaderData();
  return (
    <NoteEditor
      noteId={note.id}
      initialTitle={note.title}
      initialBody={note.body}
    />
  );
}
