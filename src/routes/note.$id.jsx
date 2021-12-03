export {default, loader} from '../Note';

export function unstable_shouldReload({params, submission}) {
  return submission && submission.action === `/${params.id}`;
}
