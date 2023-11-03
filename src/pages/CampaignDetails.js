import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from '../axios-config';
import ModalComponent from '../components/Modal';
import Leaderboard from './Leaderboard';

const CampaignDetailsPage = () => {
    const { id } = useParams(); // Get the campaign ID from the URL parameter
    console.log('id', id)
    const userJSON = localStorage.getItem('user');

    const user = JSON.parse(userJSON);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [partnerExists, setpartnerExists] = useState(false);
    const [partnerID, setpartnerID] = useState(false);
    const [campaign, setCampaign] = useState();

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = async (data) => {
        if (partnerExists) {
            await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/partner/${partnerID}`, { progress: data.targetNumber, campaignID: id })
                .then(async (response) => {
                    console.log('response.data.data', response.data.data)
                    // setCampaign(response.data.data);
                    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/campaign/${id}`)
                        .then((response) => {
                            console.log('response.data.data', response.data.data)
                            setCampaign(response.data.data);
                            const alreadyRegistered = response.data.data.registeredPartners.filter(p => p.userID === user.id)
                            if (alreadyRegistered && alreadyRegistered.length > 0) setpartnerExists(true)
                        })
                        .catch((error) => {
                            console.error('Error fetching data:', error);
                        });
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }

        else await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/partner/`, { ...data, userID: user.id, campaignID: id })
            .then(async (response) => {
                console.log('response.data.data', response.data.data)
                // setCampaign(response.data.data);
                await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/campaign/${id}`)
                    .then((response) => {
                        console.log('response.data.data', response.data.data)
                        setCampaign(response.data.data);
                        const alreadyRegistered = response.data.data.registeredPartners.filter(p => p.userID === user.id)
                        if (alreadyRegistered && alreadyRegistered.length > 0) {
                            console.log('alreadyRegistered[0]._id', alreadyRegistered[0]._id);
                            setpartnerExists(true); setpartnerID(alreadyRegistered[0]._id)
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    });
                closeModal();
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        // Make your API call here using the data
        console.log('API call data:', data);
    };


    useEffect(() => {
        // Fetch campaign data from the backend API
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/campaign/${id}`)
            .then((response) => {
                console.log('response.data.data', response.data.data)
                setCampaign(response.data.data);
                const alreadyRegistered = response.data.data.registeredPartners.filter(p => p.userID === user.id)
                if (alreadyRegistered && alreadyRegistered.length > 0) {
                    console.log('alreadyRegistered[0]._id', alreadyRegistered[0]._id);
                    setpartnerExists(true); setpartnerID(alreadyRegistered[0]._id)
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    useEffect(() => {
        // Connect to the Socket.io server
        // const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
        const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
            transports: ["websocket"]
        });

        // Join a room (replace 'your-room-name' with the desired room name)
        socket.emit('join-room', id);

        // Define an event listener for the room-specific events
        socket.on('leaderboardData', (data) => {
            // Handle the received data
            console.log('Received data:', JSON.parse(data));
            setCampaign(JSON.parse(data));
        });

        return () => {
            // Disconnect from the Socket.io server when the component unmounts
            socket.disconnect();
        };
    }, []);
    // Replace these with actual campaign data from your backend
    // const campaign = {
    //     id: 1,
    //     title: 'Campaign 1',
    //     description: 'This is the first campaign description.',
    //     currentProgress: 75,
    //     targetNumber: 100,
    //     startDate: '2023-10-01',
    //     endDate: '2023-10-15',
    // };

    // Calculate the campaign status
    // const currentDate = new Date();
    // const startDate = new Date(campaign.startDate);
    // const endDate = new Date(campaign.endDate);
    // let status = 'Pending';

    // if (currentDate >= startDate && currentDate <= endDate) {
    //     status = 'Ongoing';
    // } else if (currentDate > endDate) {
    //     status = 'Completed';
    // }

    return <>
        {
            !campaign && <div className='h-screen w-screen flex justify-center items-center'>Loading...</div>
        }
        {campaign && <div className="p-4 max-w-[1200px] mx-auto">

            <div className="flex md:justify-start flex-col md:flex-row items-center my-5">
                <div className="w-1/3 p-4">
                    <img
                        src='/logo512.png'
                        alt={campaign.title}
                        className="w-full h-auto"
                    />
                </div>
                <div className="md:w-3/5 w-full p-4">
                    <h1 className="text-3xl font-bold mt-10 mb-10">{campaign.name}</h1>
                    <p className="text-gray-600 mb-4">{campaign.description}</p>
                    <p className=" text-lg mb-2 flex justify-between"><span className='font-bold'>Current Progress: </span>{campaign.currentNumber ?? 0}</p>
                    <p className=" text-lg mb-2 flex justify-between"><span className='font-bold'>Target Number: </span>{campaign.targetNumber}</p>
                    <p className=" text-lg mb-2 flex justify-between"><span className='font-bold'>Start Date: </span>{new Date(campaign.startDate).toDateString()}</p>
                    <p className=" text-lg mb-2 flex justify-between"><span className='font-bold'>End Date: </span>{new Date(campaign.endDate).toDateString()}</p>
                    <p className=' text-lg flex justify-between'><span className='font-bold'>Status: </span>{campaign.status}</p>
                </div>

            </div>
            <div className='flex justify-end md:pr-24'>
                {!partnerExists && <button onClick={openModal} className="text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white px-3 py-2 transition-all duration-200">
                    Register for Campaign
                </button>}
                {
                    partnerExists && <button onClick={openModal} className="text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white px-3 py-2 transition-all duration-200">
                        Save Progress
                    </button>
                }
            </div>
            <Leaderboard key={campaign.registeredPartners} leaderboardData={campaign.registeredPartners} />
            <ModalComponent isOpen={modalIsOpen} closeModal={closeModal} onSubmit={handleSubmit} locations={campaign.locations} isSave={partnerExists} />

        </div>}

    </>;
};

export default CampaignDetailsPage;
