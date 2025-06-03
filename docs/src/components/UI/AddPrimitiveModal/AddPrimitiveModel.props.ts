import { PrimitiveGroup } from "../../../types/primitive";

export interface AddPrimitiveModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (group: PrimitiveGroup) => void;
}
