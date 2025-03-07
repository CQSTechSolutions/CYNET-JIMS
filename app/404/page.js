"use client";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
                <p className="mt-4 text-lg text-gray-600">Oops! The page you are looking for does not exist.</p>
                <p className="mt-2 text-gray-500">It might have been removed, or the URL might be incorrect.</p>
                <a href="/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                    Go Back Home
                </a>
            </div>
        </div>
    );
};

export default NotFoundPage; 