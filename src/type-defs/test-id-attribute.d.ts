import { TestId } from "@/shared/enums/test-id.enum";

declare global {
  namespace React {
    interface HTMLAttributes {
      "data-testid"?: TestId;
    }
  }
}
