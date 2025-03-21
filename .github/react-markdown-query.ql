import javascript

/**
 * Flags <ReactMarkdown> elements that:
 * - are missing the rehypePlugins prop
 * - or include rehypePlugins but not rehypeSanitize
 */
from JSXElement rm, JSXAttribute pluginsAttr
where
  rm.getName() = "ReactMarkdown" and
  (
    // rehypePlugins not present at all
    not exists(
      JSXAttribute a |
      rm.getAttribute(a) and
      a.getName() = "rehypePlugins"
    )
    or
    (
      rm.getAttribute(pluginsAttr) and
      pluginsAttr.getName() = "rehypePlugins" and
      not exists(
        pluginsAttr.getInitializer().(Expr).getAChild*().(Expr).toString() = "rehypeSanitize"
      )
    )
  )
select rm, "ReactMarkdown is missing rehypeSanitize in rehypePlugins."
