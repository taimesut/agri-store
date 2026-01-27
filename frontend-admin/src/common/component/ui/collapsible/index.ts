import { Collapsible as Root } from "./collapsible.root";
import { CollapsibleTrigger } from "./collapsible.trigger";
import { CollapsibleContent } from "./collapsible.content";

export const Collapsible = Object.assign(Root, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
});
