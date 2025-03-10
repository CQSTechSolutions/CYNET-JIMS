"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const allowedEvents = [
    "innovision",
    "ai-ds",
    "hth",
    "game-xcite",
    "bgrc",
    "gpfc",
    "gtqkd"
];

const Page = () => {
    const router = useRouter();
    const params = useParams();
    const eventname = params.eventname;

    useEffect(() => {
        if (eventname && !allowedEvents.includes(eventname)) {
            router.push('/404');
        }
    }, [eventname, router]);

    if (!eventname) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {allowedEvents.includes(eventname) ? (
                <div className="text-center p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {eventname.replace(/-/g, ' ').split(' ').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                    </h1>
                    <p className="text-lg text-gray-600">
                        Welcome to our event page. More details coming soon!
                    </p>
                </div>
            ) : null}
        </div>
    );
};

export default Page;
