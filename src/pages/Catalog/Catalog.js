import React, { useState, useEffect } from 'react';
import { fetchSneakers } from '../../api';
import ReleaseCard from '../../components/ReleaseCard/ReleaseCard';
import Pagination from '../../components/Pagination/Pagination';
import styles from './Catalog.module.css';

const Catalog = () => {
    const [sneakers, setSneakers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCatalog = async () => {
            try {
                setLoading(true);
                const response = await fetchSneakers({
                    page: currentPage,
                    limit: 10
                });

                setSneakers(response.data.sneakers);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error loading catalog:', error);
                setLoading(false);
            }
        };

        loadCatalog();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading sneakers...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Sneaker Catalog</h1>

            <div className={styles.grid}>
                {sneakers.map(sneaker => (
                    <ReleaseCard key={sneaker._id} sneaker={sneaker} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Catalog;