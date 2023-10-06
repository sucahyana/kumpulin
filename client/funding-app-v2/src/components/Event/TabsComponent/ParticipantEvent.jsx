import React, {useState, useRef} from 'react';
import {FaChevronDown, FaChevronRight, FaCheck, FaTrash, FaEdit} from 'react-icons/fa';
import {OverlayPanel} from 'primereact/overlaypanel';
import {Button} from 'primereact/button';
import {RiUserSettingsLine} from 'react-icons/ri';
import {format} from 'date-fns';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {id} from 'date-fns/locale';
import ApproveModal from './ParticipantModal/ApproveModal.jsx';
import ManageModal from './ParticipantModal/ManageModal.jsx';
import DeleteModal from './ParticipantModal/DeleteModal.jsx';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {GrStatusCriticalSmall, GrStatusGoodSmall} from "react-icons/gr";

const ParticipantEvent = ({eventData}) => {
    const [expandedRows, setExpandedRows] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const participants = eventData.event_participant;
    const [isApproveModalOpen, setApproveModalOpen] = useState(false);
    const [isManageModalOpen, setManageModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const currentUser = useSelector((state) => state.user?.data?.user);
    const isCurrentUserCreator = currentUser && currentUser.id === eventData.id_user;

    const op = useRef(null);

    const getSpeedDialItems = (participant) => {
        let items = [
            {
                label: 'Atur',
                icon: <FaEdit className="mr-4"/>,
                command: () => handleManageClick(participant),
            },
            {
                label: 'Delete',
                icon: <FaTrash className="mr-4 text-pink-500"/>,
                command: () => handleDeleteClick(participant),
            },
        ];

        if (participant && participant.status === 'Ingin ikut Acara') {
            items.unshift({
                label: 'Setujui',
                icon: <FaCheck className="mr-4 text-green-500"/>,
                command: () => handleApproveClick(participant),
            });
        }

        return items;
    };

    const showOverlayPanel = (event, participant) => {
        setSelectedParticipant(participant);
        op.current.toggle(event);
    };

    const handleApproveClick = (participant) => {
        console.log('Approved participant:', participant);
        setApproveModalOpen(true);
        setSelectedParticipant(participant);
        console.log(selectedParticipant.id);
    };

    const handleManageClick = (participant) => {
        console.log('Managed participant:', participant);
        setManageModalOpen(true);
        setSelectedParticipant(participant);
        console.log(selectedParticipant.id);
    };

    const handleDeleteClick = (participant) => {
        console.log('Deleted participant:', participant);
        setDeleteModalOpen(false);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Bergabung':
                return 'bg-green-200 text-green-700 flex text-center rounded px-2 py-1 hover:scale-105 shadow-lg';
            case 'Ingin ikut Acara':
                return 'bg-yellow-200 text-yellow-700 flex text-center rounded px-2 py-1 hover:scale-105 shadow-lg';
            default:
                return 'bg-gray-200 text-gray-700 flex text-center rounded px-2 py-1 hover:scale-105 shadow-lg';
        }
    };
    const mobileStyleStatus = (status) => {
        switch (status) {
            case 'Bergabung':
                return 'text-green-500';
            case 'Ingin ikut Acara':
                return 'text-reed-500';
            default:
                return 'text-gray-500';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatStatus = (status, amount) => {
        let bgColor = '';
        if (status === 'Bergabung' || status === 'Ingin ikut Acara') {
            bgColor = getStatusStyle(status);
            return <span className={bgColor}>{status}</span>;
        } else {
            bgColor = amount > 0 ? 'bg-green-200' : 'bg-red-200';
            return (
                <span
                    className={`${bgColor} text-green-700 flex text-center rounded px-2 py-1 hover:scale-105 shadow-lg`}
                >
          {amount > 0 ? `+${formatCurrency(amount)}` : formatCurrency(amount)}
        </span>
            );
        }
    };

    const rowExpansionTemplate = (participant) => {
        const sortedHistory = [
            ...eventData.event_history.filter((history) => history.id_user === participant.id_user),
        ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        return (
            <div className="rounded-lg shadow-md bg-white p-4">
                <DataTable value={sortedHistory} className="font-poppins text-sm">
                    <Column
                        field="created_at"
                        sortable
                        header="No"
                        body={(rowData, {rowIndex}) => rowIndex + 1}
                        className="p-2 hidden lg:table-cell"
                    ></Column>
                    <Column
                        field="created_at"
                        header="Tanggal"
                        body={(rowData) => format(new Date(rowData.created_at), 'PP', {locale: id})}
                        className="p-2"
                    ></Column>
                    <Column field="description" header="Deskripsi" className="p-2"></Column>
                    <Column
                        field="status"
                        sortable
                        header="Status"
                        body={(rowData) => formatStatus(rowData.status, rowData.status)}
                        className="p-2"
                    ></Column>
                    <Column field="action" header="Keterangan" className="p-2 hidden md:table-cell break-all"></Column>
                </DataTable>
            </div>
        );
    };

    return (
        <div className="w-full rounded-lg bg-white p-0 md:p-8  font-poppins">
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="🔍 Global Search"
                    className="text-sm p-inputtext p-component p-filled rounded border border-gray-300 p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow"
                />
            </div>
            <DataTable
                value={participants}
                expandedRows={expandedRows}
                rowClassName={() => ({'p-datatable-striped': true})}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                globalFilter={globalFilter}
                paginator
                size="small"
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                className="border rounded-lg shadow-md  text-sm font-poppins"
            >
                <Column expander style={{width: '3em'}}></Column>
                <Column
                    field="user.profile_image"
                    header="Gambar"
                    className="hidden md:table-cell"
                    body={(rowData) => (
                        <div className="bg-blue-200 rounded shadow-lg">
                            <Link
                                to={
                                    currentUser && rowData.user.id === currentUser.id
                                        ? '/profile'
                                        : `/profile/${rowData.user.id}`
                                }
                            >
                                <img
                                    className={`rounded hover:scale-105 shadow-lg  `}
                                    src={rowData.user.profile_image}
                                    alt="User Profile"
                                    width="64px"
                                />
                            </Link>
                        </div>
                    )}
                />
                <Column field="user.status"
                        className="table-cell md:hidden"
                        body={(rowData) => (
                            <GrStatusCriticalSmall
                                className={`${mobileStyleStatus(rowData.status)} -mx-4`}
                            />
                        )}
                >
                </Column>
                <Column field="user.name"
                        header="Nama"
                        sortable
                        filterPlaceholder="Search by name"
                >
                </Column>

                <Column
                    field="description"
                    className="hidden md:table-cell"
                    header="Deskripsi"
                    filterPlaceholder="Search by description"
                ></Column>
                <Column
                    field="status"
                    header="Status"
                    body={(rowData) => (
                        <span className={getStatusStyle(rowData.status)}>{rowData.status}</span>
                    )}
                    sortable
                    className="hidden md:table-cell"
                    filterMatchMode="contains"
                    filterPlaceholder="Search by status"
                ></Column>
                <Column
                    field="payment_amount"
                    header="Uang Masuk"
                    body={(rowData) => formatCurrency(rowData.payment_amount)}
                    sortable
                    className=""
                    filterPlaceholder="Search by amount"
                ></Column>
                <Column
                    header="Info"
                    className="hidden lg:table-cell"
                    body={(rowData) => {
                        const percentagePaid = (rowData.payment_amount / eventData.amount_person) * 100;
                        return (
                            <span
                                className="flex text-center rounded px-2 py-1 hover:scale-105 shadow-lg text-blue-700 bg-blue-200 ">
                Sudah bayar {percentagePaid.toFixed()}%
              </span>
                        );
                    }}
                />

                {isCurrentUserCreator && (
                    <Column
                        header="Aksi"
                        pt={{
                            root: {className: 'w-[10px]'},
                        }}
                        body={(rowData) => (
                            <>
                                <Button
                                    icon={<RiUserSettingsLine size={20}/>}
                                    onClick={(e) => showOverlayPanel(e, rowData)}
                                    className="p-button-rounded p-button-text -ml-2"
                                    aria-haspopup
                                    aria-controls="overlay_panel"
                                />
                                <OverlayPanel
                                    ref={op}
                                    id="overlay_panel"
                                    showEvent="focus"
                                    className="shadow-lg shadow-blue-100 p-overlaypanel-left"
                                >
                                    <ul className="p-0">
                                        {getSpeedDialItems(selectedParticipant).map((item, index) => (
                                            <li key={index} className="mb-0">
                                                <Button
                                                    label={item.label}
                                                    icon={item.icon}
                                                    onClick={item.command}
                                                    className="text-sm p-button-text w-full text-left hover:bg-gray-100"
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </OverlayPanel>
                            </>
                        )}
                    ></Column>
                )}
            </DataTable>

            <ApproveModal
                isOpen={isApproveModalOpen}
                participantId={selectedParticipant ? selectedParticipant.id : null}
                eventCode={eventData.code_event}
                onRequestClose={() => setApproveModalOpen(false)}
                onApprove={() => {
                    setApproveModalOpen(false);
                }}
            />

            <ManageModal
                isOpen={isManageModalOpen}
                participantId={selectedParticipant ? selectedParticipant.id : null}
                eventCode={eventData.code_event}
                onRequestClose={() => setManageModalOpen(false)}
                onManage={() => {
                    setManageModalOpen(false);
                }}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                participant={selectedParticipant}
                onRequestClose={() => setDeleteModalOpen(false)}
            />
        </div>
    );
};

export default ParticipantEvent;
