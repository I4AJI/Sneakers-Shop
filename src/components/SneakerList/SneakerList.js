import React, { useEffect, useState } from 'react';
import { fetchSneakers } from '../../api';
import ReleaseCard from '../ReleaseCard/ReleaseCard';
import './SneakerList.css';

const SneakerList = () => {
    const [sneakers, setSneakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10); 

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const response = await fetchSneakers(page, limit);
                setSneakers(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [refreshTrigger, page, limit]);

    const handleRefresh = () => {
        setRefreshTrigger(prev => !prev);
    };

    const renderPagination = () => (
        <div className="pagination">
            <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
            >
                Previous
            </button>
            <span>Page {page}</span>
            <button
                onClick={() => setPage(p => p + 1)}
                disabled={sneakers.length < limit}
            >
                Next
            </button>
            <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
            >
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
            </select>
        </div>
    );

    if (loading) {
        return (
            <div>
                <button onClick={handleRefresh} className="refreshButton">
                    Refresh List
                </button>
                <div className="loading">Loading sneakers...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <button onClick={handleRefresh} className="refreshButton">
                    Refresh List
                </button>
                <div className="error">Error: {error}</div>
            </div>
        );
    }

    return (
        <div>
            <button onClick={handleRefresh} className="refreshButton">
                Refresh List
            </button>
            {renderPagination()}
            <div className="sneakers-grid">
                {sneakers.map((sneaker) => (
                    <ReleaseCard key={sneaker._id} sneaker={sneaker} />
                ))}
            </div>
        </div>
    );
};

export default SneakerList;
