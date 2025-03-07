const handleSubmit = async (formData) => {
    try {
        await api.post('/sneakers', formData);
        // Refresh list after successful POST
        setRefreshTrigger(prev => !prev);
    } catch (err) {
    }
};
