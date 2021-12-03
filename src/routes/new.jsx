import NoteEditor, {action} from '../NoteEditor';

export {action};

export function loader() {
  return null;
}

export default function New() {
  return <NoteEditor noteId={null} initialTitle="Untitled" initialBody="" />;
}
