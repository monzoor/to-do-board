"use client";

import { Modal } from "@todo/components";
import { useModal } from "@todo/hooks/use-modal";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { selectUser } from "@todo/libs/redux/slices/user/selector/get-user";
import { CreateCategory } from "../create-category/create-category";
import { CreateTicket } from "../create-ticket/create-ticket";

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
        <button
          className="mb-1 mr-1 rounded bg-blue-500 px-6 py-3 text-xs font-bold capitalize text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
          type="button"
          onClick={openCategoryModal}
        >
          Create Category
        </button>
        <button
          className="mb-1 mr-1 rounded bg-blue-500 px-6 py-3 text-xs font-bold capitalize text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
          type="button"
          onClick={openTicketModal}
        >
          Create Ticket
        </button>
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
