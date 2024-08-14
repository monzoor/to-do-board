import { ReactNode } from "react";

export interface ModalProps {
  headerText: string;
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}
