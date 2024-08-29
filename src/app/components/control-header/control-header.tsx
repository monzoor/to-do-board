"use client";

import { Button, Modal } from "@todo/components";
import { useModal } from "@todo/hooks";
import { CreateCategory } from "../create-category/create-category";
import { CreateTicket } from "../create-ticket/create-ticket";
import { useAppSelector, selectUser } from "@todo/libs";

export const CreateActions = () => {
  const {
    isVisible: isCategoryModalVisible,
    openModal: openCategoryModal,
    closeModal: closeCategoryModal,
  } = useModal();
  const {
    isVisible: isTicketModalVisible,
    openModal: openTicketModal,
    closeModal: closeTicketModal,
  } = useModal();

  const user = useAppSelector(selectUser);

  if (!user?.user?.id) {
    return null;
  }

  return (
    <div className="container mx-auto pl-5 pt-6">
      <div className="mb-2 flex">
        <Button width="w-auto" color="blue" onClick={openCategoryModal}>
          Create Category
        </Button>
        <Button width="w-auto" color="blue" onClick={openTicketModal}>
          Create Ticket
        </Button>
      </div>

      <Modal
        headerText="Create Category"
        isVisible={isCategoryModalVisible}
        onClose={closeCategoryModal}
      >
        <CreateCategory closeCategoryModal={closeCategoryModal} />
      </Modal>

      <Modal
        headerText="Create Ticket"
        isVisible={isTicketModalVisible}
        onClose={closeTicketModal}
      >
        <CreateTicket closeTicketModal={closeTicketModal} />
      </Modal>
    </div>
  );
};
