/**
 * @name ReactMarkdown Missing rehypeSanitize
 * @description Flags <ReactMarkdown> without rehypeSanitize
 * @kind problem
 * @id my-react-markdown/query
 */

import javascript

// Temporary "always select" to see if it triggers:
from string s
where s = "test"
select s, "Proving the query runs..."
// import javascript
// from JSXElement e
// where
//   e.getTagName() = "ReactMarkdown" and
//   (
//     not e.hasAttribute("rehypePlugins") or
//     not e.getAttribute("rehypePlugins").getInitializer().toString().matches("%rehypeSanitize%")
//   )
// select e, "ReactMarkdown element must include rehypeSanitize in its rehypePlugins attribute."
