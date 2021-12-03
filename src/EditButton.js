/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Link, useSearchParams} from 'remix';

export default function EditButton({noteId, children}) {
  const [searchParams] = useSearchParams();
  const isDraft = noteId == null;
  let href = isDraft ? '/new' : `/${noteId}/edit`;
  if (searchParams.has('term')) {
    href += `?term=${searchParams.get('term')}`;
  }
  return (
    <Link
      prefetch="intent"
      className={[
        'edit-button',
        isDraft ? 'edit-button--solid' : 'edit-button--outline',
      ].join(' ')}
      to={href}>
      {children}
    </Link>
  );
}
