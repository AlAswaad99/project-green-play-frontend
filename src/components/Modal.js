import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    //   content: {
    //     width: '300px',
    //     margin: 'auto',
    //   },
};

function ModalComponent({ isOpen, closeModal, onSubmit, locations, isSave }) {
    console.log('locations', locations)
    const [name, setName] = useState('');
    const [loading, setloading] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        const data = {
            targetNumber: Number.parseInt(name),
            locations: [selectedValue],
        };

        await onSubmit(data);
        setloading(false);

        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Modal"
            className="md:w-1/3 w-3/4  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto p-4 bg-white rounded-lg shadow-lg items-center"
        >
            <h2 className="text-2xl font-semibold mb-4">{isSave ? "Enter Progress" : "Enter Target Number"}</h2>
            <input
                type="number"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isSave ? "Your Progress" : "Your Target number"}
                className="w-full p-2 mb-4 border rounded focus:outline-none"
            />

            {!isSave && <><h2 className="text-2xl font-semibold mb-4">Select Location</h2>
                <select
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="w-full p-2 mb-4 border rounded focus:outline-none"
                >
                    {
                        locations.map((location) => {
                            console.log('location', location)
                            return <option key={location} value={location}>{location}</option>

                        })
                    }

                </select></>}

            <div className="flex justify-end">
                <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="bg-gray-900 text-white px-4 py-2 rounded focus:outline-none hover:bg-gray-700"
                >
                    {loading ? isSave ? "Saving..." : "Registering..." : "Confirm"}
                </button>
                <button
                    disabled={loading}
                    onClick={closeModal}
                    className="ml-4 border px-4 py-2 rounded focus:outline-none hover:border-gray-700"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}

export default ModalComponent;
