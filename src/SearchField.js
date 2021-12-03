/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  useTransition,
  useSearchParams,
  useSubmit,
  Form,
  useLocation,
} from 'remix';
import Spinner from './Spinner';

export default function SearchField() {
  const transition = useTransition();
  const submit = useSubmit();
  const [params] = useSearchParams();
  const location = useLocation();

  return (
    <Form action={location.pathname} className="search" role="search" replace>
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder="Search"
        name="term"
        defaultValue={params.get('term') || undefined}
        onChange={(e) => submit(e.currentTarget.form)}
      />
      <Spinner active={transition.state === 'submitting'} />
    </Form>
  );
}
