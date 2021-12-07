import NoteEditor, {action, ErrorBoundary} from '../NoteEditor';

export {action, ErrorBoundary};

export function loader() {
  return null;
}

export default function New() {
  return <NoteEditor noteId={null} initialTitle="Untitled" initialBody="" />;
}
