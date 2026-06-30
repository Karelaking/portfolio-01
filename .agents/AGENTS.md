# Project Customization Rules

## Icons Styling and Animation

To maintain design consistency and premium micro-animations across the site:
1. **Always wrap icons in the `<StrokeDraw>` component**: Whenever you add or modify an SVG icon or Remix Icon (imported from `@remixicon/react`), you MUST wrap it inside the `<StrokeDraw>` component imported from `@/components/stroke-draw`.
   
   Example:
   ```tsx
   import { StrokeDraw } from "@/components/stroke-draw";
   import { RiGithubLine } from "@remixicon/react";

   // Inside components:
   <StrokeDraw>
     <RiGithubLine className="size-4" />
   </StrokeDraw>
   ```

2. **SVG Path compatibility**: Ensure wrapped icons contain paths that can draw themselves. The `<StrokeDraw>` component targets SVG paths (`svg path`) to animate their strokes (`stroke-dasharray` and `stroke-dashoffset`). Avoid complex filled polygon patterns if they cannot support stroke drawings.
