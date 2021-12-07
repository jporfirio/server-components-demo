/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import marked from 'marked';
// import sanitizeHtml from 'sanitize-html';

// esbuild doesn't deal with dynamic `require` inside of node modules as easily
// as webpack so this was removed to get the app to work quickly, there are
// workarounds but I didn't have time for this demo.
// const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
//   'img',
//   'h1',
//   'h2',
//   'h3',
// ]);
// const allowedAttributes = Object.assign(
//   {},
//   sanitizeHtml.defaults.allowedAttributes,
//   {
//     img: ['alt', 'src'],
//   }
// );

export default function TextWithMarkdown({text}) {
  return (
    <div
      className="text-with-markdown"
      dangerouslySetInnerHTML={{
        __html: marked(text),
      }}
    />
  );
}
