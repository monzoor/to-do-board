import { TicketProps } from "./type";
import { Modal } from "@todo/components";
import { useModal } from "@todo/hooks";
import { TicketDetails } from "../ticket-details/ticket-details";
import { getDueDateStatus } from "@todo/utils";

export const Ticket: React.FC<TicketProps> = ({
  ticket,
  index,
  onDragStart,
}) => {
  const { status, color } = getDueDateStatus(ticket.dueDate);

  const {
    isVisible: isTicketModalVisible,
    openModal: openTicketModal,
    closeModal: closeTicketModal,
  } = useModal();

  const onTicketClick = () => {
    openTicketModal();
  };

  return (
    <>
      <div
        className="ticket mb-2 cursor-pointer"
        draggable
        onDragStart={(e) => onDragStart(e, index, ticket.category || "")}
        onClick={onTicketClick}
        data-testid="ticket"
      >
        <div className="flex flex-col items-start rounded-md border border-gray-200 bg-white p-4">
          <div className="flex w-full justify-between">
            <div
              className={`flex-shrink-0 rounded-full ${color} px-3 py-1 text-xs`}
            >
              {status}
            </div>
          </div>

          <div className="my-3 line-clamp-2 text-sm font-bold capitalize">
            {ticket.title}
          </div>
          <div className="flex-grow">
            <div className="line-clamp-2 text-xs">{ticket.description}</div>
          </div>
        </div>
      </div>
      <Modal
        headerText="Ticket Details"
        isVisible={isTicketModalVisible}
        onClose={closeTicketModal}
      >
        <TicketDetails ticket={ticket} closeTicketModal={closeTicketModal} />
      </Modal>
    </>
  );
};
