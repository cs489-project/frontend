import javascript

from JSXElement e
where
  e.getTagName() = "ReactMarkdown" and
  (
    not e.hasAttribute("rehypePlugins") or
    not e.getAttribute("rehypePlugins").getInitializer().toString().matches("%rehypeSanitize%")
  )
select e, "ReactMarkdown element must include rehypeSanitize in its rehypePlugins attribute."
