import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios-config';

const CampaignsPage = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        // Fetch campaign data from the backend API
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/campaign`)
            .then((response) => {
                console.log('response.data.data', response.data.data)
                setCampaigns(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <>
            {
                campaigns.length === 0 && <div className='h-screen w-screen flex justify-center items-center'>Loading...</div>
            }
            {
                campaigns.length !== 0 && <div className="p-4 max-w-[1500px] mx-auto mt-5">
                    <h1 className="text-3xl font-bold mb-10">Campaigns</h1>
                    <div className="grid grid-cols-1 md:gap-24 gap-10 sm:grid-cols-2 lg:grid-cols-3">

                        {campaigns.length !== 0 && campaigns.map((campaign) => (
                            <Link to={`/campaign/${campaign._id}`} key={campaign._id} >
                                <div className="bg-[whitesmoke] shadow-md w-full rounded p-4 items-center transition-transform transform hover:scale-105">
                                    <div className='w-full md:block flex justify-center'><img src='/logo512.png' alt='tree' className='md:h-auto h-52' />
                                    </div>
                                    <h2 className="text-xl font-semibold mb-2">{campaign.name}</h2>
                                    <p className="text-gray-600 line-clamp-3">{campaign.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default CampaignsPage;
